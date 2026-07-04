import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, message, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { AppDispatch, RootState } from "../../app/store.ts";
import { fetchDishes } from "../../entities/Dish/DishSlice.ts";
import {
  addToCart,
  clearCart,
  removeFromCart
} from "../../entities/Cart/CartSlice.ts";
import { createOrder } from "../../entities/Order/OrderSlice.ts";
import Spinner from "../../shared/Spinner/Spinner.tsx";

import styles from "./MainPage.module.css";

import { OrderModal } from "../../entities/Order/OrderModal/OrderModal.tsx";

const {Text, Title} = Typography;

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {dishes, isLoading} = useSelector((state: RootState) => state.dishes);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);

  const handleOrderSubmit = async () => {
    const orderData: Record<string, number> = {};
    cartItems.forEach(item => {
      orderData[item.dish.id] = item.quantity;
    });

    try {
      await dispatch(createOrder(orderData)).unwrap();
      message.success("Order placed successfully!");
      dispatch(clearCart());
      setIsModalOpen(false);
    } catch {
      message.error("Failed to place order.");
    }
  };

  if (isLoading && dishes.length === 0) return <Spinner />;

  return (
    <div className={styles.MainPage}>
      <Title level={2}>Dishes</Title>

      <div className={styles.dishesList}>
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className={styles.dishCard}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <Avatar
                shape="square"
                size={100}
                src={dish.image}
              />
            </div>
            <div className={styles.dishInfo}>
              <div className={styles.dishName}>{dish.name}</div>
              <Text type="secondary">{dish.price} KGS</Text>
            </div>
            <Button
              size="large"
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => dispatch(addToCart(dish))}
            />
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className={styles.total}>
          <div className={styles.totalInner}>
            <Text strong style={{fontSize: 16}}>Order total: {subtotal} KGS</Text>
            <Button
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrder={handleOrderSubmit}
        cartItems={cartItems}
        onRemove={(id) => dispatch(removeFromCart(id))}
        subtotal={subtotal}
      />
    </div>
  );
};

export default MainPage;