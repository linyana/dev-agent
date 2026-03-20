import { Button, Modal, Input, Form, ColorPicker, Space } from 'antd';
import { useEffect, useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { desktopDir } from '@tauri-apps/api/path';
import { useCreateProject } from '@/services';

const PRESET_COLORS = [
  '#5F7BD8',
  '#F5222D',
  '#FA8C16',
  '#FADB14',
  '#52C41A',
  '#13C2C2',
  '#1677FF',
  '#722ED1',
  '#EB2F96',
  '#2F54EB',
  '#597EF7',
  '#36CFC9',
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
  const [desktopPath, setDesktopPath] = useState('');
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

  const handleOpenModal = async () => {
    setOpenModal(true);

    const path = await desktopDir();
    form.setFieldsValue({
      name: 'DeskTop',
      path: path,
      description: '',
      color: '#5F7BD8',
    });
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
    });
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await fetchData({ data: values });
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Create Project
      </Button>

      <Modal
        title="Create Project"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
        destroyOnHidden
        centered
      >
        <Form layout="vertical" form={form} initialValues={{ color: '#5F7BD8' }}>
          <Form.Item label="Path">
            <Space.Compact
              style={{
                width: '100%',
              }}
            >
              <Form.Item
                noStyle
                name="path"
                rules={[{ required: true, message: 'Please select folder path' }]}
              >
                <Input />
              </Form.Item>
              <Button onClick={handleSelectFolder}>Select Folder</Button>
            </Space.Compact>
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
            <ColorPicker presets={[{ label: 'Presets', colors: PRESET_COLORS }]} showText />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
