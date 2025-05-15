import styles from "./Header.module.scss";
import React from "react";
import { User } from "{{pkg}}/models";
import { Logo } from "{{pkg}}/ui/server/atoms/Logo";

export interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className={styles.header}>
      <Logo src="https://wearewiser.com/images/wiser-logo.svg" />
      <h2>Hello, {user.name}!</h2>
    </header>
  );
};

export default Header;