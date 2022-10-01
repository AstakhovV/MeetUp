import { WhiteBlock } from '../../WhiteBlock';
import { NextComponentType } from 'next';
import styles from './WelcomeStep.module.scss';
import { useStepContext } from '../../../pages';
import React from 'react';
import NextStepButton from "../../NextStepButton";
import StepBlock from "../StepBlock/StepBlock";

export const WelcomeStep: NextComponentType = () => {
  const { onNextStep } = useStepContext();

  return (
    <StepBlock>
      <WhiteBlock>
        <div className={styles.title}>
          <img
            className={styles.logoImg}
            src="/static/meetUp.svg"
            alt="Celebration"
          />
          <span>Welcome to MeetUp!</span>
        </div>
        <p>
          Meetup is a platform for communication between people. Just create rooms and communicate on the topics you need.
        </p>
        <NextStepButton onClickNext={onNextStep} title="Get your username" />
      </WhiteBlock>
    </StepBlock>
  );
};
