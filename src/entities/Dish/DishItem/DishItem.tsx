import { type FC } from 'react';
import { Button, Card, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Dish } from '../types.ts';

import styles from "./DishItem.module.css";

const {Text} = Typography;

interface DishItemProps {
  dish: Dish;
  onDelete: (id: string) => void;
}

export const DishItem: FC<DishItemProps> = (props) => {

  const {dish, onDelete} = props;

  return (
    <Card className={styles.dishCard}>
      <div className={styles.dishContent}>
        <img
          src={dish.image}
          alt={dish.name}
          className={styles.dishImage} />

        <div className={styles.dishInfo}>
          <Text className={styles.dishTitle}>{dish.name}</Text>

          <Text strong className={styles.dishPrice}>{dish.price} KGS</Text>
        </div>

        <div className={styles.actions}>
          <Button
            icon={<EditOutlined />}
            onClick={() => console.log('edit')}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(dish.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};