import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';
import React, { useState } from 'react';
import { useStepContext } from '../../../pages';
import { NextComponentType } from 'next';
import styles from './EnterNameStep.module.scss';
import NextStepButton from "../../NextStepButton";
import StepBlock from "../StepBlock/StepBlock";

export const EnterNameStep: NextComponentType = () => {
  const { onNextStep, user, handleChangeUser } = useStepContext();
  const [inputValue, setInputValue] = useState<string>(user ? user.fullName : '');

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const handleClickNext = () => {
    handleChangeUser('fullName', inputValue);
    onNextStep();
  };

  return (
    <StepBlock>
      <StepInfo
        icon="/static/man.png"
        title="What’s your full name?"
        description="People use real names on our platform"
      />
      <WhiteBlock className={styles.whiteBlock}>
          <input
            onChange={handleChangeInput}
            value={inputValue}
            className="field"
            placeholder="Enter full name"
          />
        <NextStepButton onClickNext={handleClickNext} title="Next" disabled={!inputValue} />
      </WhiteBlock>
    </StepBlock>
  );
};
