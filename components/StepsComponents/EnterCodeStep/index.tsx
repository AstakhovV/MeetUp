import React from 'react';
import { useRouter } from 'next/router';
import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';
import { NextComponentType } from 'next';

import styles from './EnterPhoneStep.module.scss';
import StepBlock from "../StepBlock/StepBlock";
import NextStepButton from "../../NextStepButton";
import { verifyConfirmationCode } from "../../../services/userService";
import { useStepContext } from "../../../pages";

export const EnterCodeStep: NextComponentType = () => {
  const { user } = useStepContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [codes, setCodes] = React.useState(['', '', '', '']);
  const nextDisabled = codes.some((v) => !v);

  const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(target.getAttribute('id'));
    const value = target.value;

    if (Number(value) || !value) {
      setCodes((prev) => {
        const newArr = [...prev];
        newArr[index] = value;

        return newArr;
      });

      if (target.nextSibling) {
        (target.nextSibling as HTMLInputElement).focus();
      }
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await verifyConfirmationCode({ email: user.email, code: codes.join('') });

      if(data.user) {
        await router.push('/rooms');
      }
    } catch (error) {
      console.log('Ошибка при активации аккаунта!');
    } finally {
      setIsLoading(false);
    }
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
                  type="text"
                  pattern="[0-9]*"
                  placeholder="X"
                  onFocus={(e) => e.target.placeholder = ""}
                  onBlur={(e) => e.target.placeholder = "X"}
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
