import { Alert, Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store.ts";
import { useEffect } from "react";
import { deleteDish, fetchDishes } from "../../entities/Dish/DishSlice.ts";
import Spinner from "../../shared/Spinner/Spinner.tsx";
import { DishItem } from "../../entities/Dish/DishItem/DishItem.tsx";

import styles from "./AdminDishesPage.module.css";

const {Title} = Typography;

const AdminDishesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    dishes,
    isLoading,
    error
  } = useSelector((state: RootState) => state.dishes);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    void message.success("Dish deleted successfully!");
    dispatch(deleteDish(id));
  };

  const handleEdit = (id: string) => {
    navigate(AppRoutes.editDish.replace(':id', id));
  };

  if (isLoading && dishes.length === 0) {
    return <Spinner />;
  }

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

      {error &&
        <Alert title={error} type="error" showIcon style={{marginBottom: 16}} />}

      <div className={styles.dishesList}>
        {dishes.map((dish) => (
          <DishItem
            key={dish.id}
            dish={dish}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {!isLoading && dishes.length === 0 && (
        <div className={styles.emptyList}>
          No dishes found. Click "Add new Dish" to create Dish.
        </div>
      )}
    </div>
  );
};

export default AdminDishesPage;