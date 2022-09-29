import Link from 'next/link';
import React from 'react';
import styles from "./BackButton.module.scss";

type BackButtonProps = {
  title: string;
  href: string;
};

export const BackButton = ({ title, href }: BackButtonProps) => (
    <Link href={href}>
      <div className={styles.container}>
        <img src="/static/back-arrow.svg" alt="Back" />
        <h3>{title}</h3>
      </div>
    </Link>
  );
