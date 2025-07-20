import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  const navigate = useNavigate();

  const { isAuthed } = useAuth();

  function handleClick() {
    if (isAuthed) navigate("app");
    else navigate("/login");
  }

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Button onClick={handleClick} type="primary">
          Start tracking now
        </Button>
      </section>
    </main>
  );
}
