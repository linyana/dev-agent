---
name: frontend-patterns
description: Standardizes React + Ant Design CRUD UI in this repo—delete confirmations (Modal, Typography, Lucide, useDelete*), create flows (Form, Modal, useCreate* with success.message/action). Use when adding or refactoring matching features.
---

# Frontend implementation patterns

## When to use

Stack: React, Ant Design, `@/services` hooks with `success` callbacks, `@api/...` types. Plus **Lucide** for delete triggers.

For verbatim **Delete** and **Create** components, see [examples/delete-entity.md](examples/delete-entity.md) and [examples/create-entity.md](examples/create-entity.md).

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

**Project reference:** [examples/delete-entity.md](examples/delete-entity.md)

---

## Create (form + modal)

### Conventions

- Modal flag: use an `openModal`-like state for modal visibility.
- `Form.useForm<T>()`, `layout="vertical"`, `initialValues` for defaults (only when you truly need them).
- `useCreate*` with `success.message` and `success.action`: `refreshData`, `setOpenModal(false)`, `form.resetFields()`.
- Submit: `await form.validateFields()` then `await fetchData({ data: values })`.
- Modal: `onOk={handleSubmit}`, `confirmLoading={loading}`, `destroyOnHidden` (`onCancel` only closes; reset on success).
- **No folder step:** primary button opens modal only; same Form + submit + hook pattern.

### Naming

| Slice | Pattern |
|-------|---------|
| Component / hook | `Create{Entity}`, `useCreate{Entity}` |
| Form type | `{Entity}FormType` (adjust fields per domain) |
| User strings | Title, button, `success.message` |

**Project reference:** [examples/create-entity.md](examples/create-entity.md)

---

## Extending

New flows (edit, bulk, …): add **Conventions** → **Naming** → **Template** here; move long golden copies to `examples/`.
