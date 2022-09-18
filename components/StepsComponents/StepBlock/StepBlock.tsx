import React, { PropsWithChildren } from 'react';
import styles from './StepBlock.module.scss';

const StepBlock = ({ children }: PropsWithChildren) => (
    <div className={styles.block}>
      {children}
    </div>
  );

export default StepBlock;
