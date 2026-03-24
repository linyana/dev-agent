import { useDnDPosition } from '@/hooks';

interface DragGhostProps {
  type: string | null;
}

export const DragGhost = ({ type }: DragGhostProps) => {
  const { position } = useDnDPosition();

  if (!position) return null;

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100px',
        transform: `translate(${position.x}px, ${position.y - 138}px) translate(-50%, -50%)`,
      }}
    >
      {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
    </div>
  );
};
