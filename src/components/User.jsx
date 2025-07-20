// Routing
import { useNavigate } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../hooks/useAuth";

// Styles
import styles from "./User.module.css";

// Fake user data (used as a placeholder for real authentication)
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const user = FAKE_USER;

  const { logout } = useAuth();

  const navigate = useNavigate();

  // Handles logout and redirects to home page
  function handleClick() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
