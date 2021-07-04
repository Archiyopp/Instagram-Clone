import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

export default function Post({
  username,
  imageSrc,
  caption,
  docId,
  userLikedPhoto,
  likes,
  comments,
  dateCreated,
}) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  // component
  //header, images, actions(like and comment icons), footer, comments
  return (
    <div className="rounded col-span-3 border bg-white border-gray-primary mb-12">
      <Header username={username} />
      <Image src={imageSrc} caption={caption} />
      <Actions
        docId={docId}
        userLikedPhoto={userLikedPhoto}
        totalLikes={likes.length}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username} />
      <Comments
        docId={docId}
        posted={dateCreated}
        comments={comments}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
  userLikedPhoto: PropTypes.bool.isRequired,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  dateCreated: PropTypes.number.isRequired,
};
