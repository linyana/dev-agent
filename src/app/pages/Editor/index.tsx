'use client';

import { Flex } from 'antd';
import { Actions } from './Actions';
import { Properties } from './Properties';

import { ReactFlowProvider } from '@xyflow/react';
import { Flows } from './Flows';
import { DnDProvider } from '@/hooks';
import { Sidebar } from './Sidebar';

export const Editor = () => {
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
            <Properties />
          </DnDProvider>
        </ReactFlowProvider>
      </Flex>
    </div>
  );
};
