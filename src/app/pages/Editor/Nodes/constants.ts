export type NodeKind = 'cmd' | 'create_pr' | string;

export type FieldType = 'input' | 'textarea' | 'select';

export type FieldSpec = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: string }[];
};

import { icons } from 'lucide-react';

export type INodeSchemaType = {
  kind: NodeKind;
  title: string;
  description?: string;
  icon?: keyof typeof icons;
  color?: string;
  bgColor?: string;
  fields: FieldSpec[];
};

export const NODE_SCHEMAS: INodeSchemaType[] = [
  {
    kind: 'cmd',
    title: 'CMD',
    description: 'Run local command',
    icon: 'Terminal',
    color: '#418cf5ff',
    bgColor: '#e6f7ff',
    fields: [
      { key: 'label', label: 'Label', type: 'input', defaultValue: 'CMD' },
      { key: 'cmd', label: 'Command', type: 'input' },
    ],
  },
  {
    kind: 'github',
    title: 'GitHub',
    description: 'GitHub Actions',
    icon: 'Github',
    color: '#ad80ecff',
    bgColor: '#f7e6ff',
    fields: [
      { key: 'label', label: 'Label', type: 'input', defaultValue: 'GitHub' },
      { key: 'repo', label: 'Repo', type: 'input' },
    ],
  },
  {
    kind: 'custom',
    title: 'Custom',
    description: 'User defined logic',
    icon: 'Workflow',
    color: '#929292ff',
    bgColor: '#f5f5f5ff',
    fields: [{ key: 'label', label: 'Label', type: 'input', defaultValue: 'Custom' }],
  },
];

// color: '#13c2c2',
// bgColor: '#e6f7ff',

export const getNodeSchema = (kind: NodeKind) => {
  return NODE_SCHEMAS.find((s) => s.kind === kind);
};
