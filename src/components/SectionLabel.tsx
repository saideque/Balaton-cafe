import type { ReactNode } from 'react';

export function SectionLabel({
  index,
  children,
  rule = true,
}: {
  index: string;
  children: ReactNode;
  rule?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-lg italic text-terracotta">{index}</span>
      <span className="u-label">{children}</span>
      {rule && <span className="h-px flex-1 bg-line" />}
    </div>
  );
}
