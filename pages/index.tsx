import React, { useState } from 'react';
import { WelcomeStep } from '../components/StepsComponents/WelcomeStep';
import { EnterNameStep } from '../components/StepsComponents/EnterNameStep';
import { GoogleStep } from '../components/StepsComponents/GoogleStep';
import { ChooseAvatarStep } from '../components/StepsComponents/ChooseAvatarStep';
import { EnterEmailStep } from '../components/StepsComponents/EnterEmailStep';
import { EnterCodeStep } from '../components/StepsComponents/EnterCodeStep';
import { NextComponentType } from 'next';
import { createContextHelper, useContextHelper } from "../utils/createContextHelper";
import { UserData } from "../domain/user";

const stepsComponents: NextComponentType[] = [
  WelcomeStep,
  GoogleStep,
  EnterNameStep,
  ChooseAvatarStep,
  EnterEmailStep,
  EnterCodeStep,
];

interface StepContext {
  onNextStep: () => void;
  step: number;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  handleChangeUser: (field: keyof UserData, value: string) => void
}

const StepContext = createContextHelper<StepContext>('StepContext');
export const useStepContext = () => useContextHelper(StepContext);

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [user, setUser] = useState<UserData | null>(null);

  const Step = stepsComponents[step];

  const handleChangeUser = (field: string, value: string) =>
    setUser((prevState) => ({ ...prevState, [field]: value }));

  const onNextStep = () => setStep((prev) => prev + 1);

  return (
    <StepContext.Provider value={{ step, onNextStep, user, setUser, handleChangeUser }}>
      <Step />
    </StepContext.Provider>
  );
}
