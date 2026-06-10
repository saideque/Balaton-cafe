'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';
import { submitContact, subscribeNewsletter } from '@/lib/contact';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

type Status = 'idle' | 'sending' | 'success' | 'error';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const t = useTranslations('contact');

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  const [news, setNews] = useState('');
  const [newsDone, setNewsDone] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t('errName');
    if (!EMAIL_RE.test(form.email)) e.email = t('errEmail');
    if (form.message.trim().length < 2) e.message = t('errMessage');
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    const res = await submitContact(form);
    if (res.ok) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  }

  async function onSubscribe(ev: FormEvent) {
    ev.preventDefault();
    const res = await subscribeNewsletter(news);
    if (res.ok) {
      setNewsDone(true);
      setNews('');
    }
  }

  const field =
    'w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-ink-soft/45 focus:border-ink focus:outline-none transition-colors';

  return (
    <section id="contact" className="u-shell scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <Reveal>
        <SectionLabel index="05">{t('label')}</SectionLabel>
      </Reveal>

      <div className="mt-12 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Intro + newsletter */}
        <div>
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">{t('title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-ink-soft">{t('intro')}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 rounded-[3px] border border-line bg-paper-2/50 p-7">
              <h3 className="font-display text-xl text-ink">{t('newsletterTitle')}</h3>
              <p className="mt-2 text-sm text-ink-soft">{t('newsletterText')}</p>
              {newsDone ? (
                <p className="mt-5 inline-flex items-center gap-2 text-sm text-sage-deep">
                  <Check size={16} strokeWidth={2} /> {t('subscribed')}
                </p>
              ) : (
                <form onSubmit={onSubscribe} className="mt-5 flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={news}
                    onChange={(e) => setNews(e.target.value)}
                    placeholder={t('newsletterPlaceholder')}
                    className="flex-1 border-b border-line bg-transparent py-2 text-sm text-ink placeholder:text-ink-soft/45 focus:border-ink focus:outline-none"
                    aria-label={t('newsletterPlaceholder')}
                  />
                  <button
                    type="submit"
                    aria-label={t('subscribe')}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform hover:-translate-y-0.5"
                  >
                    <ArrowRight size={16} strokeWidth={1.75} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          {status === 'success' ? (
            <div className="flex h-full min-h-[280px] flex-col items-start justify-center rounded-[3px] border border-sage/40 bg-sage/5 p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-paper">
                <Check size={22} strokeWidth={2} />
              </span>
              <p className="mt-6 font-display text-2xl text-ink">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block">
                  <span className="u-label">{t('name')}</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('namePlaceholder')}
                    className={`mt-2 ${field}`}
                  />
                  {errors.name && (
                    <span className="mt-1 block text-xs text-terracotta">{errors.name}</span>
                  )}
                </label>
                <label className="block">
                  <span className="u-label">{t('email')}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t('emailPlaceholder')}
                    className={`mt-2 ${field}`}
                  />
                  {errors.email && (
                    <span className="mt-1 block text-xs text-terracotta">{errors.email}</span>
                  )}
                </label>
              </div>
              <label className="block">
                <span className="u-label">{t('message')}</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t('messagePlaceholder')}
                  className={`mt-2 resize-none ${field}`}
                />
                {errors.message && (
                  <span className="mt-1 block text-xs text-terracotta">{errors.message}</span>
                )}
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === 'sending' ? t('sending') : t('send')}
                  {status !== 'sending' && <ArrowRight size={16} strokeWidth={1.75} />}
                </button>
                {status === 'error' && (
                  <span className="text-sm text-terracotta">{t('error')}</span>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
