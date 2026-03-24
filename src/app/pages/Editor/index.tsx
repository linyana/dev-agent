import { Flex } from 'antd';
import { Actions } from './Actions';
import { Nodes } from './Nodes';
import { Properties } from './Properties';
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
          height: `calc(100% - 65px)`,
        }}
      >
        <Nodes />
        <Flows />
        <Properties />
      </Flex>
    </div>
  );
};
