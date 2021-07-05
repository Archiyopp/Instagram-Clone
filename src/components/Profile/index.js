import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Photos from "./Photos";
import { getUserPhotosByUserId } from "../../services/firebase";

function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    };
    getProfileInfoAndPhotos();
  }, [user]);
  return (
    <div>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
  }),
};

export default UserProfile;
