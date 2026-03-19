import { IProjectType } from '@shared';
import { Card, Flex, Tag, Typography } from 'antd';
import { Edit, Folder, GitBranch, MoreHorizontal, Settings, Star } from 'lucide-react';

const { Meta } = Card;
const { Text } = Typography;

type IPropsType = {
  project: IProjectType;
};

export const ProjectCard = ({ project }: IPropsType) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <div
          style={{
            backgroundColor: 'rgb(95, 123, 216)',
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {project.githubOwner && (
            <Text style={{ color: '#fff', fontSize: 14 }}>
              {project.githubOwner}/{project.githubRepo}
            </Text>
          )}
        </div>
      }
      actions={[
        <Settings key="setting" size={18} style={{ verticalAlign: 'middle' }} />,
        <Edit key="edit" size={18} style={{ verticalAlign: 'middle' }} />,
        <MoreHorizontal key="ellipsis" size={18} style={{ verticalAlign: 'middle' }} />,
      ]}
    >
      <Meta
        avatar={<Folder size={18} style={{ verticalAlign: 'middle' }} />}
        title={project.name}
        description={
          <Flex vertical gap={4}>
            <Text type="secondary" ellipsis style={{ fontSize: 12 }}>
              {project.description || project.githubDesc || project.path}
            </Text>
            <Flex gap={4} wrap>
              {project.githubLang && <Tag>{project.githubLang}</Tag>}
              {project.branch && (
                <Tag icon={<GitBranch size={10} style={{ marginRight: 4 }} />}>
                  {project.branch}
                </Tag>
              )}
              {project.githubStars > 0 && (
                <Tag icon={<Star size={10} style={{ marginRight: 4 }} />}>
                  {project.githubStars}
                </Tag>
              )}
            </Flex>
          </Flex>
        }
      />
    </Card>
  );
};
