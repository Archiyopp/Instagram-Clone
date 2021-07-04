import React from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/usePhotos";
import Post from "./Post";

export default function Timeline() {
  const { photos } = usePhotos();
  // users photos of the log in user
  // on loading the photos we need react skeleton
  // if we have photos render them
  // if the user doesnt have photos tell them to create them
  return (
    <div className="md:container lg:col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} {...content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
