import styles from "./Header.module.scss";
import React from "react";
import { User } from "@/models";

export interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className={styles.header}>
      <h2>Hello, {user.name}!</h2>
    </header>
  );
};

export default Header;