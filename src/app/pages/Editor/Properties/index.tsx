import { theme } from 'antd';
import { type Node } from '@xyflow/react';

type IPropsType = {
  selectedNode?: Node<NodeData>;
};

type NodeData = {
  label: string;
};

export const Properties = ({ selectedNode }: IPropsType) => {
  const {
    token: { colorBorder },
  } = theme.useToken();
  return (
    <div
      style={{
        borderLeft: `1px solid ${colorBorder}`,
        width: 260,
        height: '100%',
      }}
    >
      {!selectedNode && <div>选择一个节点</div>}

      {selectedNode && (
        <>
          <h3>节点配置</h3>

          <div style={{ marginBottom: 8 }}>名称</div>

          <input
            value={selectedNode.data.label}
            style={{
              width: '100%',
              padding: 6,
              border: '1px solid #ccc',
            }}
          />
        </>
      )}
    </div>
  );
};
