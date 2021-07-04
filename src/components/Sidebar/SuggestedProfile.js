import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  handleSuggestedProfileFollowers,
  handleLoggedInUserFollowing,
} from "../../services/firebase";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";
export default function SuggestedProfile({
  username,
  profileDocId,
  profileId,
  userId,
  userDocId,
}) {
  async function followUser() {
    setFollowed(true);
    await handleLoggedInUserFollowing(profileId, userDocId, followed);
    await handleSuggestedProfileFollowers(userId, profileDocId, followed);

    // update the following array of my logged in user
    //and the followers of the user who has been followed
  }

  const [followed, setFollowed] = useState(false);
  return !followed ? (
    <div className="flex flex-row items-center align-center justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt=""
          className="rounded-full w-8 flex mr-3"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={followUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userDocId: PropTypes.string.isRequired,
};
