import React, { useState } from 'react';
import { WelcomeStep } from '../components/StepsComponents/WelcomeStep';
import { EnterNameStep } from '../components/StepsComponents/EnterNameStep';
import { GoogleStep } from '../components/StepsComponents/GoogleStep';
import { ChooseAvatarStep } from '../components/StepsComponents/ChooseAvatarStep';
import { EnterPhoneStep } from '../components/StepsComponents/EnterPhoneStep';
import { EnterCodeStep } from '../components/StepsComponents/EnterCodeStep';
import { NextComponentType } from 'next';
import { createContextHelper, useContextHelper } from "../utils/createContextHelper";

const stepsComponents: NextComponentType[] = [
  WelcomeStep,
  GoogleStep,
  EnterNameStep,
  ChooseAvatarStep,
  EnterPhoneStep,
  EnterCodeStep,
];

type StepContext = {
  onNextStep: () => void;
  step: number;
};

const StepContext = createContextHelper<StepContext>('StepContext');
export const useStepContext = () => useContextHelper(StepContext);

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const Step = stepsComponents[step];

  const onNextStep = () => setStep((prev) => prev + 1);

  return (
    <StepContext.Provider value={{ step, onNextStep }}>
      <Step />
    </StepContext.Provider>
  );
}
