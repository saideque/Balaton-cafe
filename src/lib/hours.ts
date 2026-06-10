import { site } from '@/content/site';

export interface OpenState {
  isOpen: boolean;
  /** "HH:MM" the café opens. */
  opensAt: string;
  /** "HH:MM" the café closes. */
  closesAt: string;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Compute whether the café is open right now in its local time zone.
 * Hours are identical every day (Mon–Sun), so day-of-week is irrelevant.
 */
export function getOpenState(now: Date = new Date()): OpenState {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  const current = hour * 60 + minute;

  const open = toMinutes(site.hours.open);
  const close = toMinutes(site.hours.close);

  return {
    isOpen: current >= open && current < close,
    opensAt: site.hours.open,
    closesAt: site.hours.close,
  };
}
