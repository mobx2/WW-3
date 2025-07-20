// React hooks
import { useEffect, useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Custom hooks
import { useAuth } from "../hooks/useAuth";

// Components
import PageNav from "../components/PageNav";
import Button from "../components/Button";

// Styles
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  // State variables for form inputs
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  // Auth context values and functions
  const { login, isAuthed } = useAuth();

  // Navigation hook from React Router
  const navigate = useNavigate();

  // Handler for login form submit
  function handleLogin(e) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  // Effect to redirect after successful login
  useEffect(() => {
    if (isAuthed) navigate("/app", { replace: true });
  }, [isAuthed, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
