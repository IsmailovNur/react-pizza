import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";

import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <NavLink
            to={AppRoutes.main}
            className={styles.mainLink}
          >
            React Pizza
          </NavLink>
        </div>
        <nav className={styles.headerRight}>
          <NavLink
            className={styles.headerLink}
            to={AppRoutes.adminDishes}
          >Dishes</NavLink>
          <NavLink
            className={styles.headerLink}
            to={AppRoutes.adminOrders}
          >Orders</NavLink>
        </nav>

      </div>
    </header>
  );
};

export default AppHeader;