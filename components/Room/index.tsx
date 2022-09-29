import Link from 'next/link';
import React from 'react';
import { Button } from '../Button';

import styles from './Room.module.scss';

interface RoomProps {
  title: string;
}

export const RoomElement = ({ title }: RoomProps) => (
    <div className={styles.wrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <h2>{title}</h2>
        <div className={styles.actionButtons}>
          <Link href="/rooms">
            <Button color="gray" className={styles.leaveButton}>
              <img width={18} height={18} src="/static/peace.png" alt="Hand black" />
              <span>Leave room</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
