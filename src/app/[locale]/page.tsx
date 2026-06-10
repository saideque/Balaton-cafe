import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Menu } from '@/components/Menu';
import { Gallery } from '@/components/Gallery';
import { Visit } from '@/components/Visit';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Visit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
