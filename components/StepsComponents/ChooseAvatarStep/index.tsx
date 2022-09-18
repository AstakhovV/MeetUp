import React from 'react';
import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';
import { Avatar } from '../../Avatar';
import { useStepContext } from '../../../pages';
import { NextComponentType } from 'next';

import styles from './ChooseAvatarStep.module.scss';
import StepBlock from "../StepBlock/StepBlock";
import NextStepButton from "../../NextStepButton";

const defaultPhoto =
  'https://wilcity.com/wp-content/uploads/2021/02/avatar-default.png';

export const ChooseAvatarStep: NextComponentType = () => {
  const { onNextStep } = useStepContext();
  const [avatarUrl, setAvatarUrl] = React.useState<string>(defaultPhoto);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = (event: Event): void => {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setAvatarUrl(imageUrl);
      }
    }
  };

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <StepBlock>
      <StepInfo
        icon="/static/celebration.png"
        title="Okay, Your Name!"
        description="How’s this photo?"
      />
      <WhiteBlock className={styles.whiteBlock}>
        <Avatar width="120px" height="120px" src={avatarUrl} />
        <label htmlFor="image" className="link">
          Choose a different photo
        </label>
        <input id="image" ref={inputFileRef} type="file" hidden={true} />
        <NextStepButton onClickNext={onNextStep} title="Next" />
      </WhiteBlock>
    </StepBlock>
  );
};
