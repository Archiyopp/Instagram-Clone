import { useState, useEffect } from "react";
import { useUserContext } from "../context/user";
import { getUserByUserId, getPhotosFromFollowing } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId },
  } = useUserContext();
  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      // does the user follow  anybody
      if (following.length > 0) {
        followedUserPhotos = await getPhotosFromFollowing(userId, following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [userId]);
  return { photos };
}
