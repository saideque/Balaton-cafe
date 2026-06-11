'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Seconds of stagger delay. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
}

/**
 * Scroll reveal. The initial state must be identical on server and client
 * (no `useReducedMotion` branch there — that causes a hydration mismatch);
 * reduced motion is honoured via an instant transition instead.
 */
export function Reveal({ children, delay = 0, y = 26, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }
      }
      {...rest}
    >
      {children}
    </motion.div>
  );
}
