import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";
import { useUserContext } from "../../context/user";

function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
  },
}) {
  const { user: loggedInUser } = useUserContext();
  const { user } = useUser(loggedInUser?.userId);
  const [isFollingProfile, setIsFollingProfile] = useState(null);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;
  const handleToggleFollow = async () => {
    setIsFollingProfile((isFollingProfile) => !isFollingProfile);
    setFollowerCount({
      followerCount: isFollingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollingProfile,
      profileDocId,
      profileUserId,
      user.docId,
      user.userId
    );
  };
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollingProfile(!!isFollowing);
    };
    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername ? (
          <img
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} profile avatar`}
            className="rounded-full max-h-40 flex w-40"
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        ) : (
          <Skeleton count={1} width={160} height={160} circle={true} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium text-sm font-bold rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
            >
              {isFollingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` `}
                {photosCount === 1 ? `photo` : "photos"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followers.length === 1 ? `follower` : "followers"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    username: PropTypes.string,
    followers: PropTypes.array,
  }).isRequired,
};

export default Header;
