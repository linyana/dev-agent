import { Flex } from 'antd';
import { Actions } from './Actions';
import { Nodes } from './Nodes';
import { Settings } from './Settings';
import { Flows } from './Flows';

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
          height: '100%',
        }}
      >
        <Nodes />
        <Flows />
        <Settings />
      </Flex>
    </div>
  );
};
