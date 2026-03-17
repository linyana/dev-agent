import { Button, Modal, Input, Form } from 'antd';
import { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { Command } from '@tauri-apps/plugin-shell';
import { useCreateProject } from '@/services';

type IPropsType = {
  refreshData: () => void;
};

type ProjectType = {
  name: string;
  path: string;
  description?: string;
  repo?: string;
};

export const CreateProject = ({ refreshData }: IPropsType) => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm<ProjectType>();
  const [loadingGit, setLoadingGit] = useState(false);

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

  const getGitRepo = async (path: string) => {
    try {
      setLoadingGit(true);

      const cmd = Command.create('git', ['-C', path, 'remote', 'get-url', 'origin']);

      const result = await cmd.execute();
      console.log(result);

      return result.stdout.trim();
    } catch(error) {
      console.log(error)
      return '';
    } finally {
      setLoadingGit(false);
    }
  };

  const handleSelectFolder = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
    });

    if (typeof selected !== 'string') return;

    const name = getFolderName(selected);

    form.setFieldsValue({
      name,
      path: selected,
      description: '',
      repo: '',
    });

    setOpenModal(true);

    const repo = await getGitRepo(selected);

    form.setFieldsValue({
      repo,
    });
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    await fetchData({
      data: values,
    });
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

          <Form.Item label="Git Repo" name="repo">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
