import { GlossaryProvider } from './components/glossary/GlossaryProvider.tsx';
import { Hero } from './sections/Hero/Hero.tsx';

export function App() {
  return (
    <GlossaryProvider>
      <main>
        <Hero />
      </main>
    </GlossaryProvider>
  );
}
