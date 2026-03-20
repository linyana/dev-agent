# Create Entity (generic)

```tsx
import { Button, Modal, Input, Form } from 'antd';
import { useState } from 'react';
import { useCreateEntity } from '@/services';

type IPropsType = {
  refreshData: () => void;
};

type EntityFormType = {
  name: string;
  description?: string;
};

export const CreateEntity = ({ refreshData }: IPropsType) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm<EntityFormType>();

  const { fetchData, loading } = useCreateEntity({
    success: {
      message: 'Entity created successfully',
      action: () => {
        refreshData();
        setOpenModal(false);
        form.resetFields();
      },
    },
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await fetchData({ data: values });
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Create Entity
      </Button>

      <Modal
        title="Create Entity"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
        destroyOnHidden
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Optional" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
```

