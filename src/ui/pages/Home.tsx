"use client";
import React from "react";
import Header from "@/ui/components/atoms/Header/Header";
import { USERS } from "@/data/users";
import { pickUser } from "@/utils/pickUser";

export const Home: React.FC = () => {
  const luckyUser = pickUser(USERS);

  return (
    <div>
      <Header user={luckyUser} />
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple page component.</p>
    </div>
  );
};
