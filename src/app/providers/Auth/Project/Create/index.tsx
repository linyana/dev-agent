import { Button, Modal, Input, Form } from 'antd';
import { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { useCreateProject } from '@/services';

type IPropsType = {
  refreshData: () => void;
};

type ProjectFormType = {
  name: string;
  path: string;
  description?: string;
};

export const CreateProject = ({ refreshData }: IPropsType) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm<ProjectFormType>();

  const { fetchData, loading } = useCreateProject({
    success: {
      message: 'Project created successfully',
      action: () => {
        refreshData();
        setOpenModal(false);
        form.resetFields();
      },
    },
  });

  const getFolderName = (path: string) => {
    return path.split(/[\\/]/).pop() || path;
  };

  const handleSelectFolder = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
    });

    if (typeof selected !== 'string') return;

    form.setFieldsValue({
      name: getFolderName(selected),
      path: selected,
      description: '',
    });

    setOpenModal(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await fetchData({ data: values });
  };

  return (
    <>
      <Button type="primary" onClick={handleSelectFolder}>
        Create Project
      </Button>

      <Modal
        title="Create Project"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
        destroyOnHidden
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Path" name="path">
            <Input disabled />
          </Form.Item>

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
