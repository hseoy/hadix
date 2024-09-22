import { motion } from 'framer-motion';

interface CanvasPageProps {
  children: React.ReactNode;
  dragConstraints: React.RefObject<HTMLDivElement>;
  width: number;
  height: number;
}

export function CanvasPage({
  children,
  dragConstraints,
  width,
  height,
}: CanvasPageProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      className="bg-white rounded-xl"
      style={{
        width: width,
        height: height,
      }}
      whileDrag={{ scale: 1.01, boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}
    >
      {children}
    </motion.div>
  );
}
