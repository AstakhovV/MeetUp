import React from 'react';
import { Button } from "../Button";
import Image from "next/image";
import styles from "./NextStepButton.module.scss";

interface Props {
  onClickNext: () => void;
  title: string;
  disabled?: boolean;
  leftIcon?: JSX.Element;
}

export const NextStepButton = ({ onClickNext, title, disabled, leftIcon }: Props) => (
  <Button onClick={onClickNext} className={styles.button} disabled={disabled}>
    {leftIcon}
    <span>{title}</span>
    <Image
      src="/static/arrow.svg"
      alt="next"
      width={13}
      height={13}
    />
  </Button>
);

export default NextStepButton;
