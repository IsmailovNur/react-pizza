import { Typography } from "antd";

import styles from "./AdminOrdersPage.module.css";

const {Title} = Typography;

const AdminOrdersPage = () => {
  return (
    <div className={styles.AdminOrdersPage}>
      <Title level={1}>AdminOrdersPage</Title>
    </div>
  );
};

export default AdminOrdersPage;