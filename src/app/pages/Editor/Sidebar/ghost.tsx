import { useDnDPosition } from '@/hooks';
import { NodeCard } from '../Nodes/card';
import { NODE_SCHEMAS } from '../Nodes/constants';

interface DragGhostProps {
  type: string | null;
}

export const DragGhost = ({ type }: DragGhostProps) => {
  const { position } = useDnDPosition();

  const schema = NODE_SCHEMAS.find((s) => s.kind === type);

  if (!position || !schema) return null;

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '200px',
        transform: `translate(${position.x}px, ${position.y - 138}px) translate(-50%, -50%)`,
      }}
    >
      <NodeCard key={schema.kind} schema={schema} />
    </div>
  );
};
