import { NavLink, useLocation } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";

import styles from "./AppHeader.module.css";

const AppHeader = () => {
  const location = useLocation();
  const isClientPage = location.pathname === AppRoutes.main;

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
        {!isClientPage && (
          <nav className={styles.headerRight}>
            <NavLink className={styles.headerLink} to={AppRoutes.adminDishes}>
              Dishes
            </NavLink>
            <NavLink className={styles.headerLink} to={AppRoutes.adminOrders}>
              Orders
            </NavLink>
          </nav>
        )}

      </div>
    </header>
  );
};

export default AppHeader;