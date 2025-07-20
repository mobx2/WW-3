import { useNavigate } from "react-router-dom"; // Hook to programmatically navigate pages
import { useAuth } from "../hooks/useAuth"; // Custom hook to get auth state

import Button from "../components/Button"; // Reusable button component
import PageNav from "../components/PageNav"; // Navigation component
import styles from "./Homepage.module.css"; // Scoped CSS module styles

export default function Homepage() {
  const navigate = useNavigate(); // Get navigate function from React Router
  const { isAuthed } = useAuth(); // Get authentication status from context

  // Handle button click: navigate to "app" if logged in, else to "login" page
  function handleClick() {
    if (isAuthed) navigate("app");
    else navigate("/login");
  }

  return (
    <main className={styles.homepage}>
      <PageNav /> {/* Render page navigation */}
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
