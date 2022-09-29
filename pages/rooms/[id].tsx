import React from 'react';
import { Header } from '../../components/Header';
import { BackButton } from "../../components/BackButton/BackButton";
import styles from "./rooms.module.scss";
import { RoomElement } from "../../components/Room";
import Axios from "../../core/axios";
import { Room } from "../../domain/rooms";
import { GetServerSidePropsContext } from "next";

interface Props {
  room: Room;
}

export default function RoomPage({ room }: Props) {
  return (
    <>
      <Header />
      <div className={styles.roomBlock}>
        <BackButton href="/rooms" title="All rooms" />
        <RoomElement title={room.title} />
      </div>
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const { data } = await Axios.get<Room[]>("/rooms.json");
    const room = data.find((room) => room.id === context.query.id);

    return {
      props: {
        room,
      },
    };
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      room: {},
    },
  };
};
