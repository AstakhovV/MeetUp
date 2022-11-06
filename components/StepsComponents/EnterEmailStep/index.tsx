import React, { useState } from 'react';
import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';
import { useStepContext } from '../../../pages';
import { NextComponentType } from 'next';
import StepBlock from "../StepBlock/StepBlock";
import NextStepButton from "../../NextStepButton";

import styles from './EnterEmailStep.module.scss';
import { sendConfirmationCode } from "../../../services/userService";

export const EnterEmailStep: NextComponentType = () => {
  const { onNextStep, user } = useStepContext();
  const [email, setEmail] = useState(user.email);
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handleClickNext = async () => {
    sendConfirmationCode(user.email);
    onNextStep();
  };

  return (
    <StepBlock>
      <StepInfo
        icon="/static/gmail.png"
        title="Enter your email"
        description="We will send you a confirmation code"
      />
      <WhiteBlock>
        <input
          onChange={handleChangeEmail}
          value={email}
          className="field"
          placeholder="Enter email"
        />
        <NextStepButton onClickNext={handleClickNext} title="Next" disabled={!email} />
        <p className={styles.policyText}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </WhiteBlock>
    </StepBlock>
  );
};
