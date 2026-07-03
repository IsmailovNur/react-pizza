import { Button, Typography } from "antd";

import styles from "./AdminDishesPage.module.css";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";

const {Title} = Typography;

const AdminDishesPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.AdminDishesPage}>
      <div className={styles.PageTop}>
        <Title level={1}>AdminDishesPage</Title>
        <Button
          onClick={() => navigate(AppRoutes.createDish)}
          type="primary"
          htmlType="button"
        >
          Add new Dish
        </Button>
      </div>
    </div>
  );
};

export default AdminDishesPage;