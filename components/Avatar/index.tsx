import clsx from 'clsx';
import React from 'react';

import styles from './Avatar.module.scss';

interface AvatarProps {
  src: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  width,
  height,
  className,
  isVoice,
}) => (
    <div
      style={{ width, height, backgroundImage: `url(${src})` }}
      className={clsx(
        styles.avatar, { [styles.avatarBorder]: isVoice },
        className,
      )}
    />
  );
