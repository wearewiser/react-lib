import styles from "./Logo.module.scss";
import React from "react";
/**
 * To use NextJS as dependencies of your package,
 * run
 * npm install --save next@15
 * 
 * WARNING!
 * NextJS components bring in context which should
 * not be compiled into package bundles. In order
 * to include NextJS components, add NextJS to
 * the externals configuration in Webpack. See
 * webpack.config.js for an example.
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