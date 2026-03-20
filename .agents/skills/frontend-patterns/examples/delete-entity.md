# Delete Entity (generic)

```tsx
import { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import { Trash2 } from 'lucide-react';
import { useDeleteEntity } from '@/services';
import { IEntityType } from '@api/core/entities/types';

const { Paragraph, Text } = Typography;

type IPropsType = {
  entity: IEntityType;
  refreshData: () => void;
};

export const DeleteEntity = ({ entity, refreshData }: IPropsType) => {
  const [open, setOpen] = useState(false);

  const { fetchData, loading } = useDeleteEntity(entity.id, {
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
        title="Delete Entity"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleOk}
        okText="Delete"
        okButtonProps={{ danger: true, loading }}
        centered
        destroyOnHidden
      >
        <Paragraph>
          Are you sure you want to delete the entity: <Text strong>{entity.name}</Text>?
        </Paragraph>
      </Modal>
    </>
  );
};
```

