import React from 'react';
import { useRouter } from 'next/router';
import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';
import Axios from '../../../core/axios';
import { NextComponentType } from 'next';

import styles from './EnterPhoneStep.module.scss';
import StepBlock from "../StepBlock/StepBlock";
import NextStepButton from "../../NextStepButton";

export const EnterCodeStep: NextComponentType = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [codes, setCodes] = React.useState(['', '', '', '']);
  const nextDisabled = codes.some((v) => !v);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.getAttribute('id'));
    const value = event.target.value;
    setCodes((prev) => {
      const newArr = [...prev];
      newArr[index] = value;

      return newArr;
    });

    if (event.target.nextSibling) {
      (event.target.nextSibling as HTMLInputElement).focus();
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      //await Axios.get('/todos');
      await router.push('/rooms');
    } catch (error) {
      console.log('Ошибка при активации!');
    }

    setIsLoading(false);
  };

  return (
    <StepBlock>
      {!isLoading ? (
        <>
          <StepInfo
            icon="/static/numbers.png"
            title="Enter your activate code"
          />
          <WhiteBlock className={styles.whiteBlock}>
            <ul className={styles.codeBlock}>
              {codes.map((code, index) => (
                <input
                  className={styles.codeInput}
                  key={index}
                  type="tel"
                  placeholder="X"
                  maxLength={1}
                  id={String(index)}
                  onChange={handleChangeInput}
                  value={code}
                />
              ))}
            </ul>
            <NextStepButton onClickNext={onSubmit} title="Next" disabled={nextDisabled} />
          </WhiteBlock>
        </>
      ) : (
        <div className={styles.loaderBlock}>
          <div className="loader" />
          <h3 >Activation in progress ...</h3>
        </div>
      )}
    </StepBlock>
  );
};
