import styles from "./Logo.module.scss";
import React from "react";
/**
 * To use NextJS as dependencies of your package,
 * run
 * npm install --save next@15
 * 
 * Be sure to add "use client" to the top
 * line of your pages that include Image component.
 * 
 * WARNING!
 * Including dependencies that require browser
 * context to render will pollute the main bundle
 * so it will require that "use client" be used
 * for all pages importing package components,
 * or package components that run in a server
 * context will need to be imported from a directory
 * level that does not contain client context.
 */
// import Image from "next/image";

export interface LogoProps {
  src: string;
}

const Logo: React.FC<LogoProps> = ({ src }) => {
  return (
    // <Image className={styles.logo} src={src} alt="Hello" height="24" width="77" />
    <img className={styles.logo} src={src} alt="Hello" height="24" width="77" />
  );
};

export default Logo;