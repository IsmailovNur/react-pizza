import { type FC } from "react";
import { Button, List, Modal, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { CartItem } from "../../Cart/types.ts";

import { DELIVERY_COST } from "../constants.ts";

import styles from "./OrderModal.module.css";

const {Text} = Typography;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrder: () => void;
  cartItems: CartItem[];
  onRemove: (id: string) => void;
  subtotal: number;
}

export const OrderModal: FC<OrderModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    onOrder,
    cartItems,
    onRemove,
    subtotal
  } = props;

  const total = subtotal + DELIVERY_COST;

  return (
    <Modal
      title="Your order:"
      open={isOpen}
      onCancel={onClose}
      centered
      footer={[
        <div key="modalFooter" className={styles.modalFooter}>
          <Button
            key="cancel"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            key="order"
            type="primary"
            onClick={onOrder}
            disabled={cartItems.length === 0}
          >
            Order
          </Button>
        </div>
      ]}
    >
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onRemove(item.dish.id)}
              />
            ]}
          >
            <List.Item.Meta title={`${item.dish.name} x ${item.quantity}`} />
            <Text strong>{item.dish.price * item.quantity} KGS</Text>
          </List.Item>
        )}
      />
      <div className={styles.totalSum}>
        <div className={styles.sumLine}>
          <Text>Delivery</Text>
          <Text strong>{DELIVERY_COST} KGS</Text>
        </div>
        <div className={styles.sumLine}>
          <Text strong>Total</Text>
          <Text strong>{total} KGS</Text>
        </div>
      </div>
    </Modal>
  );
};