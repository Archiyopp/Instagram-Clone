import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/";
import Timeline from "../components/Timeline";
import useUser from "../hooks/useUser";
import { LoggedInUserContext } from "../context/loggedInUser";
import PropTypes from "prop-types";

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = "Instasnap";
  }, []);
  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid lg:grid-cols-3 lg:gap-4 justify-center lg:justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
