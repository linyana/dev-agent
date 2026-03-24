'use client';

import { Flex } from 'antd';
import { Actions } from './Actions';
import { Properties } from './Properties';

import {
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  ReactFlowProvider,
} from '@xyflow/react';
import { useMemo, useState, useCallback } from 'react';
import { Flows } from './Flows';
import { DnDProvider } from '@/hooks';
import { Sidebar } from './Sidebar';

type NodeData = {
  label: string;
  description?: string;
  cmd?: string;
  kind?: 'start' | 'cmd' | 'end';
};

export const Editor = () => {
  const initialNodes: Node<NodeData>[] = [
    {
      id: 'start',
      type: 'custom',
      position: { x: 240, y: 80 },
      data: {
        label: 'Start',
        kind: 'start',
      },
    },
    {
      id: 'end',
      type: 'custom',
      position: { x: 240, y: 360 },
      data: {
        label: 'End',
        kind: 'end',
      },
    },
  ];

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <Actions />
      <Flex
        style={{
          height: `calc(100% - 65px)`,
        }}
      >
        <ReactFlowProvider>
          <DnDProvider>
            <Sidebar />
            <Flows />
          </DnDProvider>
        </ReactFlowProvider>
        {/* <Properties selectedNode={selectedNode as any} onChange={updateSelectedNodeData} /> */}
      </Flex>
    </div>
  );
};
