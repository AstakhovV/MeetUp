import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.scss';

const colors = {
  green: styles.buttonGreen,
  gray: styles.buttonGray,
  blue: styles.buttonBlue,
};

interface ButtonProps extends React.PropsWithChildren {
  disabled?: boolean;
  color?: keyof typeof colors;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  color,
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    type="button"
    className={clsx(className, styles.button, { [colors[color!]]: color })}
    disabled={disabled}
  >
    {children}
  </button>
);
