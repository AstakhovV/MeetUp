import styles from './StepInfo.module.scss';
import React from 'react';

interface StepInfoProps {
  title: string;
  description?: string;
  icon: string;
}

export const StepInfo: React.FC<StepInfoProps> = ({
  title,
  description,
  icon,
}) => (
  <div className={styles.block}>
    <img className={styles.img} src={icon} alt="Step picture" />
    <p className={styles.title}>{title}</p>
    {description && <p className={styles.description}>{description}</p>}
  </div>
);
