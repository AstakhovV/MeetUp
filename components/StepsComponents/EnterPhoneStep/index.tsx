import React, { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';

import styles from './EnterPhoneStep.module.scss';
import { useStepContext } from '../../../pages';
import { NextComponentType } from 'next';
import StepBlock from "../StepBlock/StepBlock";
import NextStepButton from "../../NextStepButton";

type InputValueState = {
  formattedValue: string;
  value: string;
};

export const EnterPhoneStep: NextComponentType = () => {
  const { onNextStep } = useStepContext();
  const [values, setValues] = useState<InputValueState>(
    {} as InputValueState,
  );

  const nextDisabled =
    !values.formattedValue || values.formattedValue.includes('_');

  return (
    <StepBlock>
      <StepInfo
        icon="/static/phone.png"
        title="Enter your phone #"
        description="We will send you a confirmation code"
      />
      <WhiteBlock>
        <div className={styles.input}>
          <img src="/static/russian-flag.png" alt="flag" width={24} />
          <PatternFormat
            className="field"
            format="+# (###) ###-##-##"
            mask="_"
            placeholder="+7 (999) 333-22-11"
            value={values.value}
            onValueChange={({ formattedValue, value }: InputValueState) =>
              setValues({ formattedValue, value })
            }
          />
        </div>
        <NextStepButton onClickNext={onNextStep} title="Next" disabled={nextDisabled} />
        <p className={styles.policyText}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </WhiteBlock>
    </StepBlock>
  );
};
