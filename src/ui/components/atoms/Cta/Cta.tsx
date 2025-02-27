"use client";

import classNames from "classnames";
import styles from "./Cta.module.scss";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

export interface CtaProps extends PropsWithChildren {
  className?: string;
  variant: "primary" | "secondary" | "icon" | "underline";
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  href?: string;
  newTab?: boolean;
  download?: boolean;
  onClick?: () => void;
  isHidden?: boolean;
}

const Cta: FC<CtaProps> = ({
  className = "",
  variant,
  type,
  ariaLabel,
  href,
  newTab = false,
  download,
  onClick = () => {
    return;
  },
  isHidden,
  children,
}) => {
  const classNamesString = classNames(
    className,
    styles.cta,
    styles[`${variant}`],
    { [styles.hidden]: isHidden }
  );

  return (
    <>
      {href ? (
        <Link
          className={classNamesString}
          type={type}
          aria-label={ariaLabel}
          href={href}
          onClick={() => {
            onClick();
          }}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          download={download}
        >
          {children}
        </Link>
      ) : (
        <button
          className={classNamesString}
          type={type}
          aria-label={ariaLabel}
          onClick={(e) => {
            e.preventDefault();
            if (onClick) {
              onClick();
            }
          }}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Cta;
