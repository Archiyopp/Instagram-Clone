import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.map((userDoc) => ({
    ...userDoc.data(),
    docId: userDoc.id,
  }));
}

// get user from the firestore where userId  === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  let query = firebase.firestore().collection("users");

  if (following.length > 0) {
    query = query.where("userId", "not-in", [...following, userId]);
  } else {
    query = query.where("userId", "!=", userId);
  }
  // get 10 profiles where there are not followed profiles nor my profile
  const result = await query.limit(10).get();

  // return the spread data and their user id
  return result.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));
}

export async function handleLoggedInUserFollowing(
  profileId, //suggested profile id
  loggedUserDocId, // currently logged user id
  isFollowingProfile // is the user following the profile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    })
    .catch((err) => {
      console.log("handleLoggedInUserFollowing", err.message);
    });
}

export async function handleSuggestedProfileFollowers(
  loggedInUserId, // logged in user Id
  profileDocId, // suggested profile document id
  isFollowingProfile //is  the logged in user following the suggested profile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId),
    })
    .catch((e) => {
      console.log("handleSuggestedProfileFollowers", e.message);
    });
}

export async function getPhotosFromFollowing(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // get followed username by userid from photo
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  return photos;
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get(); //karl active user
  const [response = {}] = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));
  return response.docId;
}

export async function toggleFollow(
  isFollowingProfile,
  profileDocId,
  profileId,
  loggedInUserDocId,
  loggedInUserId
) {
  //handle our following using our document id, the profile id, and is our user following the profile
  await handleLoggedInUserFollowing(
    profileId,
    loggedInUserDocId,
    isFollowingProfile
  );
  //handle the followers of the profile we are trying to follow, we pass our logged in user id,
  //the profile document id, and is our user following the profile
  await handleSuggestedProfileFollowers(
    loggedInUserId,
    profileDocId,
    isFollowingProfile
  );
}
