import clsx from 'clsx';
import styles from './WhiteBlock.module.scss';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

export const WhiteBlock = ({ children, className }: Props) => <div className={clsx(styles.block, className)}>{children}</div>;
