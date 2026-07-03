import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Typography
} from "antd";
import type { FC } from "react";
import { PictureOutlined, SaveOutlined } from "@ant-design/icons";

import styles from './CreateDishPage.module.css';
import type { DishObj } from "../../entities/Dish/types.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store.ts";
import { useNavigate } from "react-router-dom";
import { createDish } from "../../entities/Dish/DishSlice.ts";
import { AppRoutes } from "../../routing/routes.ts";

const {Title} = Typography;

const CreateDishPage: FC = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {isLoading} = useSelector((state: RootState) => state.dishes);

  const imageUrl = Form.useWatch('image', form);

  const onFinish = async (values: DishObj) => {
    await dispatch(createDish(values));
    navigate(AppRoutes.adminDishes);
  };

  return (
    <div className={styles.CreateDishPage}>
      <div className={styles.formTop}>
        <Title level={3} style={{margin: 0}}>
          CreateDishForm
        </Title>
      </div>

      <Card className={styles.formCard}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={true}
        >
          <div className={styles.formRows}>
            <Form.Item
              label="Dish Name"
              name="name"
              rules={[{
                required: true,
                whitespace: true,
                message: 'Please enter valid word',
              }]}
            >
              <Input placeholder="Dish . . ." />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{
                required: true,
                type: 'number',
                min: 1,
                message: 'Please enter valid number'
              }]}
            >
              <InputNumber style={{width: '100%'}} placeholder="Price . . ." />
            </Form.Item>

            <Form.Item
              label="Dish (URL)"
              name="image"
              rules={[{
                required: false,
                whitespace: true,
                message: 'Please paste Dish URL'
              }]}
            >
              <Input placeholder="Enter URL . . ." />
            </Form.Item>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '16px 0'
          }}>
            <Avatar
              shape="square"
              size={120}
              src={imageUrl && imageUrl.trim() !== '' ? imageUrl : undefined}
              icon={<PictureOutlined />}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            style={{width: '100%'}}
            loading={isLoading}
          >
            Create Dish
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateDishPage;