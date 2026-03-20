# Reference examples

Canonical project copies for parity checks and paste baseline.

## Delete Project

```tsx
import { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import { Trash2 } from 'lucide-react';
import { useDeleteProject } from '@/services';
import { IProjectType } from '@api/core/projects/types';

const { Paragraph, Text } = Typography;

type IPropsType = {
  project: IProjectType;
  refreshData: () => void;
};

export const DeleteProject = ({ project, refreshData }: IPropsType) => {
  const [open, setOpen] = useState(false);

  const { fetchData, loading } = useDeleteProject(project.id, {
    success: {
      action: () => {
        refreshData();
        setOpen(false);
      },
    },
  });

  const handleOk = () => {
    fetchData();
  };

  return (
    <>
      <Button
        type="text"
        danger
        icon={<Trash2 size={14} />}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      />

      <Modal
        title="Delete Project"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleOk}
        okText="Delete"
        okButtonProps={{ danger: true, loading }}
        centered
        destroyOnHidden
      >
        <Paragraph>
          Are you sure you want to delete the project: <Text strong>{project.name}</Text>?
        </Paragraph>
      </Modal>
    </>
  );
};
```

## Create Project

```tsx
import { Button, Modal, Input, Form, ColorPicker } from 'antd';
import { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { useCreateProject } from '@/services';

const PRESET_COLORS = [
  '#5F7BD8', '#F5222D', '#FA8C16', '#FADB14',
  '#52C41A', '#13C2C2', '#1677FF', '#722ED1',
  '#EB2F96', '#2F54EB', '#597EF7', '#36CFC9',
];

type IPropsType = {
  refreshData: () => void;
};

type ProjectFormType = {
  name: string;
  path: string;
  description?: string;
  color?: string;
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
      color: '#5F7BD8',
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
        <Form layout="vertical" form={form} initialValues={{ color: '#5F7BD8' }}>
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

          <Form.Item label="Color" name="color" getValueFromEvent={(_, hex) => hex}>
            <ColorPicker
              presets={[{ label: 'Presets', colors: PRESET_COLORS }]}
              showText
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
```
