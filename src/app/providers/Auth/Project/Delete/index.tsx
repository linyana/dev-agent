import { useState } from 'react'
import { Button, Modal, Typography } from 'antd'
import { Trash2 } from 'lucide-react'
import { useDeleteProject } from '@/services'
import { IProjectType } from '@shared'

const { Paragraph, Text } = Typography

type IPropsType = {
  project: IProjectType
  refreshData: () => void
}

export const DeleteProject = ({ project, refreshData }: IPropsType) => {
  const [open, setOpen] = useState(false)

  const { fetchData, loading } = useDeleteProject(project.id, {
    success: {
      action: () => {
        refreshData()
        setOpen(false)
      },
    },
  })

  const handleOk = () => {
    fetchData()
  }

  return (
    <>
      <Button
        type="text"
        danger
        icon={<Trash2 size={14} />}
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
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
          Are you sure you want to delete the project:
          {' '}
          <Text strong>{project.name}</Text>
          ?
        </Paragraph>
      </Modal>
    </>
  )
}