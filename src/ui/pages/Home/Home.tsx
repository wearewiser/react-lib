"use client";
import React from "react";
import { Header, Downloader } from "../../components";
import { USERS } from "../../../data";
import { pickUser } from "../../../utils/pickUser";

const Home: React.FC = () => {
  const luckyUser = pickUser(USERS);

  return (
    <div>
      <Header user={luckyUser} />
      <Downloader />
    </div>
  );
};

export default Home;