import { Button } from 'antd';
import { useCreateProject } from '@/services';
import { open } from '@tauri-apps/plugin-dialog';

type IPropsType = {
  refreshData: () => void;
};

export const CreateProject = ({ refreshData }: IPropsType) => {
  const { fetchData, loading } = useCreateProject({
    success: {
      message: 'Project created successfully',
      action: () => {
        refreshData();
      },
    },
  });

  const handleSelectFolder = async () => {
    const selected = await open({
      directory: true,
    });
    
    if (typeof selected === 'string') {
      fetchData({
        data: {
          name: selected,
        },
      });
    }
  };

  return (
    <>
      <Button onClick={handleSelectFolder} loading={loading} type="primary">
        Create Project
      </Button>
    </>
  );
};
