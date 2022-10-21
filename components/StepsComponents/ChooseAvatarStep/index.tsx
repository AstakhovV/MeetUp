import React, { useCallback } from 'react';
import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../StepInfo';
import { Avatar } from '../../Avatar';
import { useStepContext } from '../../../pages';
import { NextComponentType } from 'next';

import styles from './ChooseAvatarStep.module.scss';
import StepBlock from "../StepBlock/StepBlock";
import NextStepButton from "../../NextStepButton";
import { uploadFile } from "../../../services/userService";

const defaultPhoto =
  'https://wilcity.com/wp-content/uploads/2021/02/avatar-default.png';

export const ChooseAvatarStep: NextComponentType = () => {
  const { onNextStep, user, handleChangeUser } = useStepContext();
  const [avatarUrl, setAvatarUrl] = React.useState<string>(user.avatarUrl ?? defaultPhoto);
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const handleChangeImage = useCallback(async (event: Event): Promise<void> => {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setAvatarUrl(imageUrl);
        const data = await uploadFile(file);
        input.value = '';
        setAvatarUrl(data.url);
        handleChangeUser('avatarUrl', data.url);
      }
    }
  }, [handleChangeUser]);

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, [handleChangeImage]);

  return (
    <StepBlock>
      <StepInfo
        icon="/static/celebration.png"
        title={`Okay, ${user.fullName}!`}
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
