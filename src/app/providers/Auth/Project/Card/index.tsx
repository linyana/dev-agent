import { Card, Flex, Typography } from 'antd';
import { Folder } from 'lucide-react';
import { DeleteProject } from '../Delete';
import { IProjectType } from '@api/core/projects/types';
import { useGlobal } from '@/hooks';

const { Meta } = Card;
const { Text } = Typography;

type IPropsType = {
  project: IProjectType;
  onDeleted: () => void;
};

export const ProjectCard = ({ project, onDeleted }: IPropsType) => {
  const {
    actions: { set },
  } = useGlobal();

  return (
    <Card
      style={{ width: 300 }}
      hoverable
      onClick={() => {
        set({
          project: {
            id: project.id,
            name: project.name,
          },
        });
      }}
      cover={
        <div
          style={{
            backgroundColor: project.color || '#5F7BD8',
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></div>
      }
      actions={[<DeleteProject key="delete" project={project} refreshData={onDeleted} />]}
    >
      <Meta
        avatar={<Folder size={18} style={{ verticalAlign: 'middle' }} />}
        title={project.name}
        description={
          <Flex vertical gap={4}>
            <Text type="secondary" ellipsis style={{ fontSize: 12 }}>
              {project.description || project.path}
            </Text>
          </Flex>
        }
      />
    </Card>
  );
};
