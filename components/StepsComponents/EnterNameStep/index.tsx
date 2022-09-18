import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';
import React from 'react';
import { useStepContext } from '../../../pages';
import { NextComponentType } from 'next';
import styles from './EnterNameStep.module.scss';
import NextStepButton from "../../NextStepButton";
import StepBlock from "../StepBlock/StepBlock";

export const EnterNameStep: NextComponentType = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const { onNextStep } = useStepContext();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

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
        <NextStepButton onClickNext={onNextStep} title="Next" disabled={!inputValue} />
      </WhiteBlock>
    </StepBlock>
  );
};
