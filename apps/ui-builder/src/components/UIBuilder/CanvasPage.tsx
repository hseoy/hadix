import { motion } from 'framer-motion';

interface CanvasPageProps {
  children: React.ReactNode;
  title?: string;
  dragConstraints: React.RefObject<HTMLDivElement>;
  width: number;
  height: number;
}

export function CanvasPage({
  children,
  title = 'New Page',
  dragConstraints,
  width,
  height,
}: CanvasPageProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      className="relative"
      style={{
        width: width,
        height: height,
      }}
    >
      <span className="text-sm text-gray-500">{title}</span>
      <div className="w-full h-full bg-white rounded-xl">{children}</div>
    </motion.div>
  );
}
