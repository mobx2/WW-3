// Routing
import { Outlet } from "react-router-dom";

// Styles
import styles from "./Sidebar.module.css";

// UI Components
import AppNav from "./AppNav";
import SidebarFooter from "./SidebarFooter";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <AppNav />

      <Outlet />

      <SidebarFooter />
    </aside>
  );
}

export default Sidebar;
