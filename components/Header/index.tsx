import Link from 'next/link';
import React from 'react';
import { Avatar } from '../Avatar';

import styles from './Header.module.scss';

const defaultPhoto =
  'https://wilcity.com/wp-content/uploads/2021/02/avatar-default.png';

export const Header = () => (
    <header className={styles.header}>
        <Link href="/rooms">
          <div
            className={styles.headerLogo}
          >
            <img src="/static/hand-wave.png" alt="Logo" />
            <h4>MeetUp</h4>
          </div>
        </Link>
        <Link href="/profile/1">
          <div className={styles.headerMyProfile}>
            <span >Your Name</span>
            <Avatar
              src={defaultPhoto}
              width="50px"
              height="50px"
            />
          </div>
        </Link>
    </header>
  );
