// Import scoped CSS module for styling the message
import styles from "./Message.module.css";

// UI component to display a message with an emoji
function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
