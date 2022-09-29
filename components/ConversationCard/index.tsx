import React from 'react';
import { Avatar } from '../Avatar';

import styles from './ConversationCard.module.scss';

interface ConversationCard {
  title: string;
  guests: string[];
  avatars: string[];
  guestsCount: number;
  speakersCount: number;
}

const ConversationCard = (props: ConversationCard) => {
  const {
    title,
    guests = [],
    avatars = [],
    guestsCount,
    speakersCount,
  } = props;

  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.content}>
        <div className={styles.avatarsBlock}>
          {avatars.map((url) => (
            <Avatar
              key={url}
              width="45px"
              height="45px"
              src={url}
              className={styles.avatars}
            />
          ))}
        </div>
        <div className={styles.info}>
          <ul className={styles.users}>
            {guests.map((name, i) => (
              <li key={name + i}>
                {name} <img src="/static/cloud.png" alt="Cloud" width={14} height={14} />
              </li>
            ))}
          </ul>
          <ul className={styles.details}>
            <li>
              {guestsCount} <img src="/static/user.svg" alt="Users count" width={12} height={12} />
            </li>
            <li>
              {speakersCount}
              <img
                src="/static/message.svg"
                alt="Users count"
                width={12}
                height={12}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
