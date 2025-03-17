"use client";
import styles from "./Logo.module.scss";
import React from "react";
/**
 * To use NextJS as dependencies of your package,
 * run
 * npm install --save next@15
 * 
 * Be sure to add "use client" to the top
 * line of your pages that include Image component.
 */
// import Image from "next/image";

interface LogoProps {
  src: string;
}

const Logo: React.FC<LogoProps> = ({ src }) => {
  return (
    // <Image className={styles.logo} src={src} alt="Hello" height="24" width="77" />
    <img className={styles.logo} src={src} alt="Hello" height="24" width="77" />
  );
};

export default Logo;