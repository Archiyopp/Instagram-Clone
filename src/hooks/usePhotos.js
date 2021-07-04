import { useState, useEffect } from "react";
import { getPhotosFromFollowing } from "../services/firebase";

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);
  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user follow  anybody
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotosFromFollowing(
          user.userId,
          user.following
        );
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId, user?.following]);
  return { photos };
}
