import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./SuggestedProfile";

export default function Suggestions({ userId, following, userDocId }) {
  const [profiles, setProfiles] = useState([]);

  //go ahead and get the suggested profiles
  // hint: use the firebase service (call using userId)
  // getSuggestedProfiles
  // call the async function ^^^^^ within useEffect
  // store it in state
  // go ahead and redner (wait on the profiles as in 'skeleton')
  useEffect(() => {
    const suggestedProfiles = async () => {
      const suggestedUsers = await getSuggestedProfiles(userId, following);
      setProfiles(suggestedUsers);
    };
    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={5} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center justify-between align-items mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => {
          return (
            <SuggestedProfile
              key={profile.docId}
              username={profile.username}
              userId={userId}
              profileId={profile.userId}
              profileDocId={profile.docId}
              userDocId={userDocId}
            />
          );
        })}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
};
