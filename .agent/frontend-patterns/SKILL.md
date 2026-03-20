---
name: frontend-patterns
description: Standardizes React + Ant Design CRUD UI in this repo—delete confirmations (Modal, Typography, Lucide, useDelete*), create flows (Form, Modal, Tauri directory picker, ColorPicker, useCreate* with success.message/action). Use when adding or refactoring matching features.
---

# Frontend implementation patterns

## When to use

Stack: React, Ant Design, `@/services` hooks with `success` callbacks, `@api/...` types. Plus **Lucide** for delete triggers, **Tauri** `@tauri-apps/plugin-dialog` when creation is folder-first.

For verbatim **Project** components, see [examples.md](examples.md).

---

## Delete (destructive action)

### Conventions

- Modal open state only in `useState`; close in `onCancel` and in `success.action` after mutation.
- `useDelete*(id, { success: { action } })` → `action` calls `refreshData()` and `setOpen(false)`.
- `onOk`/`handleOk` only invokes hook `fetchData()` (no extra side effects there).
- Inside clickable rows/cards: `e.stopPropagation()` on the trigger.
- Modal: `okText="Delete"`, `okButtonProps={{ danger: true, loading }}`, `centered`, `destroyOnHidden`.
- Body: `Typography.Paragraph` + `Text strong` for the entity name; trigger: `Button type="text" danger` + Lucide icon (~14px).

### Naming

| Slice | Pattern |
|-------|---------|
| Component / hook | `Delete{Entity}`, `useDelete{Entity}` |
| Props type | `IPropsType` with `entity: I{Entity}Type`, `refreshData` |
| Copy / title | Replace “Project” / field names consistently |

### Template (`DeleteEntity`)

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

**Project reference:** [examples.md — Delete Project](examples.md#delete-project)

---

## Create (form + modal)

### Conventions

- Modal flag: e.g. `openModal`—do not name state `open` when importing Tauri’s `open()`.
- `Form.useForm<T>()`, `layout="vertical"`, `initialValues` for defaults (e.g. color).
- `useCreate*` with `success.message` and `success.action`: `refreshData`, `setOpenModal(false)`, `form.resetFields()`.
- Submit: `await form.validateFields()` then `await fetchData({ data: values })`.
- Modal: `onOk={handleSubmit}`, `confirmLoading={loading}`, `destroyOnHidden` (`onCancel` only closes; reset on success).
- **Folder-first:** primary action awaits `open({ directory: true, multiple: false })`; if `typeof selected === 'string'`, `setFieldsValue` (basename → name, path, defaults) then open modal. Basename: `path.split(/[\\/]/).pop() || path`.
- **ColorPicker** on color field: `getValueFromEvent={(_, hex) => hex}`; `presets` + `showText`.
- **No folder step:** primary button opens modal only; same Form + submit + hook pattern.

### Naming

| Slice | Pattern |
|-------|---------|
| Component / hook | `Create{Entity}`, `useCreate{Entity}` |
| Form type | `{Entity}FormType` (adjust fields per domain) |
| User strings | Title, button, `success.message` |

### Template (`CreateEntity`, folder-first + color)

```tsx
import { Button, Modal, Input, Form, ColorPicker } from 'antd';
import { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { useCreateEntity } from '@/services';

const PRESET_COLORS = [
  '#5F7BD8', '#F5222D', '#FA8C16', '#FADB14',
  '#52C41A', '#13C2C2', '#1677FF', '#722ED1',
  '#EB2F96', '#2F54EB', '#597EF7', '#36CFC9',
];

type IPropsType = {
  refreshData: () => void;
};

type EntityFormType = {
  name: string;
  path: string;
  description?: string;
  color?: string;
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

  const getFolderName = (path: string) => path.split(/[\\/]/).pop() || path;

  const handleSelectFolder = async () => {
    const selected = await open({ directory: true, multiple: false });
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

**Project reference:** [examples.md — Create Project](examples.md#create-project)

---

## Extending

New flows (edit, bulk, …): add **Conventions** → **Naming** → **Template** here; move long golden copies to [examples.md](examples.md).
