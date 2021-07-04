import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { memo } from "react";

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt=""
          className="rounded-full w-16 flex mr-3"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <div className="text-sm">{fullName}</div>
      </div>
    </Link>
  );
User.whyDidYouRender = true;

export default memo(User);
