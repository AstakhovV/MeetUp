import React from 'react';
import { Header } from '../../components/Header';
import { Profile } from '../../components/Profile';

const defaultPhoto =
  'https://wilcity.com/wp-content/uploads/2021/02/avatar-default.png';

export default function ProfilePage() {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      <Header />
      <div className="container mt-30">
        <Profile
          avatarUrl={defaultPhoto}
          fullName="Your Name"
          userName="account"
          about="Test about"
        />
      </div>
    </>
  );
}
