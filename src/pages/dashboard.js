import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/";
import Timeline from "../components/Timeline";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Instasnap";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid lg:grid-cols-3 lg:gap-4 justify-center lg:justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
