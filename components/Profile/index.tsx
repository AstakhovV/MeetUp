import React from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';

import styles from './Profile.module.scss';

interface ProfileProps {
  fullName: string;
  userName: string;
  avatarUrl: string;
  about: string;
}

export const Profile = (props: ProfileProps) => {
  const {
    fullName,
    userName,
    avatarUrl,
    about,
  } = props;

  return(
    <div className={styles.profileBlock}>
      <div className={styles.avatarBlock}>
        <Avatar src={avatarUrl} width="100px" height="100px" />
        <h2>{fullName}</h2>
        <h3 className={styles.username}>@{userName}</h3>
      </div>
      <Button className={styles.followButton} color="blue">
        Follow
      </Button>
      <p className={styles.about}>{about}</p>
    </div>
  );
};
