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

export function Reveal({ children, delay = 0, y = 26, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
