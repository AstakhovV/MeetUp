import { Header } from '../../components/Header';
import { Button } from "../../components/Button";
import styles from "./rooms.module.scss";
import ConversationCard from "../../components/ConversationCard";
import Axios from "../../core/axios";
import Link from "next/link";
import { Room } from "../../domain/rooms";

interface Props {
  rooms: Room[];
}

export default function RoomsPage({ rooms }: Props) {
  return (
    <>
      <Header />
      <div className={styles.roomsBlock}>
        <div className={styles.roomsHeader}>
          <h1>All rooms</h1>
          <Button color="green">+ Create room</Button>
        </div>
        <div className={styles.roomsList}>
          {
            rooms.map((room) => (
              <Link key={room.id} href={`/rooms/${room.id}`}>
                <a>
                  <ConversationCard guests={room.guests}
                                    title={room.title}
                                    avatars={room.avatars}
                                    guestsCount={room.guestsCount}
                                    speakersCount={room.speakersCount}
                  />
                </a>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const { data } = await Axios.get<Room[]>("/rooms.json");

    return {
      props: {
        rooms: data,
      },
    };
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      rooms: [],
    },
  };
};
