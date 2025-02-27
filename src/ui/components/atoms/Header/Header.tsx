"use client";
import React from "react";
import { User } from "@/models";

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#f4f4f4" }}>
      <h2>Hello, {user.name}!</h2>
    </header>
  );
};

export default Header;
