"use client";
import React from "react";
import { Header, Downloader, Hello } from "{{pkg}}/ui/server";
import { USERS } from "{{pkg}}/data";
import { pickUser } from "{{pkg}}/utils";

const Home: React.FC = () => {
  const luckyUser = pickUser(USERS);

  return (
    <div>
      <Header user={luckyUser} />
      <Hello name={luckyUser.name} />
      <Downloader />
    </div>
  );
};

export default Home;