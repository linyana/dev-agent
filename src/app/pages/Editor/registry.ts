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

export type NodeKind = 'start' | 'end' | 'cmd' | string;

export type NodeSchema = {
  kind: NodeKind;
  title: string;
  description?: string;
  icon?: keyof typeof icons;
  draggable?: boolean;
  color?: string;
  fields: FieldSpec[];
};

export const NODE_SCHEMAS: NodeSchema[] = [
  {
    kind: 'start',
    title: 'Start',
    description: 'Flow start',
    icon: 'Play',
    draggable: false,
    color: '#e6fffb',
    fields: [
      { key: 'label', label: 'Label', type: 'input', defaultValue: 'Start' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    kind: 'cmd',
    title: 'CMD',
    description: 'Run a command',
    icon: 'Terminal',
    draggable: true,
    color: '#f0f5ff',
    fields: [
      { key: 'label', label: 'Label', type: 'input', defaultValue: 'CMD' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'cmd', label: 'Command', type: 'input', placeholder: 'e.g. echo hello' },
    ],
  },
  {
    kind: 'end',
    title: 'End',
    description: 'Flow end',
    icon: 'Square',
    draggable: false,
    color: '#fff1f0',
    fields: [
      { key: 'label', label: 'Label', type: 'input', defaultValue: 'End' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
];
