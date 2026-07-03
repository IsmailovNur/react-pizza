import { Typography } from "antd";

import styles from "./AdminDishesPage.module.css";

const {Title} = Typography;

const AdminDishesPage = () => {
  return (
    <div className={styles.AdminDishesPage}>
      <Title level={1}>AdminDishesPage</Title>
    </div>
  );
};

export default AdminDishesPage;