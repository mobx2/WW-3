// Import CSS module styles scoped to this component
import styles from "./AppLayout.module.css";

// Import child components used in the layout
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";

// Main layout component that arranges Sidebar, Map, and User components
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar /> {/* Sidebar navigation/menu */}
      <Map /> {/* Map display */}
      <User /> {/* User info or profile section */}
    </div>
  );
}

export default AppLayout;
