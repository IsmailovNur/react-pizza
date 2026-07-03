import { Button, Card, Form, Input, InputNumber, Typography } from "antd";
import type { FC } from "react";
import { SaveOutlined } from "@ant-design/icons";

import styles from './CreateDishPage.module.css';

const {Title} = Typography;

const createDishPage: FC = () => {
  return (
    <div className={styles.CreateDishPage}>
      <div className={styles.formTop}>
        <Title level={3} style={{margin: 0}}>
          CreateDishForm
        </Title>
      </div>

      <Card className={styles.formCard}>
        <Form
          layout="vertical"
          onFinish={() => console.log('finish')}
          requiredMark={true}
        >
          <div className={styles.formRows}>
            <Form.Item
              label="Dish Name"
              name="Dish"
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
              name="Price"
              rules={[{
                required: true,
                whitespace: true,
                message: 'Please enter valid number',
              }]}
            >
              <InputNumber style={{width: '100%'}} placeholder="Price . . ." />
            </Form.Item>

            <Form.Item
              label="Dish (URL)"
              name="Dish (URL)"
              rules={[{
                required: false,
                whitespace: true,
                message: 'Please paste Dish URL'
              }]}
            >
              <Input placeholder="Enter URL . . ." />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" icon={
            <SaveOutlined />} style={{width: '100%'}}>
            Create Dish
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default createDishPage;