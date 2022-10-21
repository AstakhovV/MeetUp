import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';
import React, { useEffect } from 'react';
import { useStepContext } from '../../../pages';
import { NextComponentType } from 'next';

import styles from './GoogleStep.module.scss';
import StepBlock from '../StepBlock/StepBlock';
import NextStepButton from "../../NextStepButton";

export const GoogleStep: NextComponentType = () => {
  const { onNextStep, setUser, user: currentUser } = useStepContext();
  const onClickAuth = () =>
    window.open(
      'http://localhost:3001/auth/google',
      'Auth',
      'width=500,height=500,status=yes,toolbar=no,menubar=no,location=no',
    );

  React.useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      const user: string = data;

      if (typeof user === 'string' && user.includes('avatarUrl')) {
        const userObj = JSON.parse(user);
        setUser(userObj);
      }
    });
  }, [currentUser, onNextStep, setUser]);

  useEffect(() => {
    currentUser && onNextStep();
  }, [currentUser, onNextStep]);

  return (
    <StepBlock>
      <StepInfo
        icon="/static/connect.png"
        title="Do you want import info from Google?"
      />
      <WhiteBlock className={styles.whiteBlock}>
        <div className={styles.avatar}>
          <b>YN</b>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 50C0.5 30.5091 3.25846 18.1987 10.7286 10.7286C18.1987 3.25846 30.5091 0.5 50 0.5C69.4909 0.5 81.8014 3.25846 89.2714 10.7286C96.7415 18.1987 99.5 30.5091 99.5 50C99.5 69.4909 96.7415 81.8014 89.2714 89.2714C81.8014 96.7415 69.4909 99.5 50 99.5C30.5091 99.5 18.1987 96.7415 10.7286 89.2714C3.25846 81.8014 0.5 69.4909 0.5 50Z"
              fill="#E0E0E0"
              stroke="#D6D6D6"
            />
          </svg>
        </div>
        <p>Your Name</p>
        <NextStepButton onClickNext={onClickAuth}
                        title="Import from Google"
        />
        <NextStepButton onClickNext={onNextStep} title="Enter my info manually"/>
      </WhiteBlock>
    </StepBlock>
  );
};
