import React from 'react';
import { Header } from '../../components/Header';
import { Profile } from '../../components/Profile';
import { useRouter } from "next/router";

const defaultPhoto =
  'https://wilcity.com/wp-content/uploads/2021/02/avatar-default.png';

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
        <Profile
          avatarUrl={defaultPhoto}
          fullName="Your Name"
          userName="account"
          about="Test about"
        />
    </>
  );
}
