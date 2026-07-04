import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Empty, message, Typography } from "antd";
import type { AppDispatch, RootState } from "../../app/store.ts";
import { fetchDishes } from "../../entities/Dish/DishSlice.ts";
import { completeOrder, fetchOrders } from "../../entities/Order/OrderSlice.ts";
import Spinner from "../../shared/Spinner/Spinner.tsx";

import styles from "./AdminOrdersPage.module.css";
import { DELIVERY_COST } from "../../entities/Order/constants.ts";

const {Title, Text} = Typography;

const AdminOrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {dishes} = useSelector((state: RootState) => state.dishes);
  const {orders, isLoading} = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleComplete = async (id: string) => {
    try {
      await dispatch(completeOrder(id)).unwrap();
      message.success("Order completed!");
    } catch {
      message.error("Failed to complete order.");
    }
  };

  if (isLoading) return <Spinner />;

  const orderIds = Object.keys(orders);

  return (
    <div className={styles.AdminOrdersPage}>
      <Title level={2} style={{marginBottom: 24}}>Orders</Title>

      {orderIds.length === 0 ? (
        <Empty description="No active orders" />
      ) : (
        orderIds.map((orderId) => {
          const currentOrderItems = orders[orderId];
          let orderSubtotal = 0;

          const itemsRender = Object.keys(currentOrderItems).map((dishId) => {
            const quantity = currentOrderItems[dishId];
            const foundDish = dishes.find(d => d.id === dishId);

            const name = foundDish ? foundDish.name : "Deleted Dish";
            const currentPrice = foundDish ? foundDish.price * quantity : 0;
            orderSubtotal += currentPrice;

            return (
              <div key={dishId} className={styles.sumLine}>
                <Text>{quantity} x {name}</Text>
                <Text strong>{currentPrice} KGS</Text>
              </div>
            );
          });

          const totalOrderPrice = orderSubtotal + DELIVERY_COST;

          return (
            <div key={orderId} className={styles.orderList} >
              <div className={styles.orderCard}>

                <div style={{flex: 1, marginRight: 40}}>
                  {itemsRender}
                  <div className={styles.deliveryLine}>
                    <Text type="secondary">Delivery</Text>
                    <Text strong>{DELIVERY_COST} KGS</Text>
                  </div>
                </div>

                <div className={styles.totalInfo}>
                  <Text type="secondary">Order total:</Text>
                  <Text strong>{totalOrderPrice} KGS</Text>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleComplete(orderId)}
                    style={{padding: 0}}
                  >
                    Complete order
                  </Button>
                </div>

              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AdminOrdersPage;