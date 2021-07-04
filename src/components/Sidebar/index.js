import React from "react";
import User from "./user";
import Suggestions from "./suggestions";
import { useLoggedInUserContext } from "../../context/loggedInUser";

export default function Sidebar() {
  const { user: { fullName, username, userId, following, docId = "" } = {} } =
    useLoggedInUserContext();

  return (
    <div className="p-4 hidden lg:block">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} userDocId={docId} />
    </div>
  );
}
