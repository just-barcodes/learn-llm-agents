import { GlossaryProvider } from './components/glossary/GlossaryProvider.tsx';
import { Hero } from './sections/Hero/Hero.tsx';
import { BuildUp } from './sections/BuildUp/BuildUp.tsx';

export function App() {
  return (
    <GlossaryProvider>
      <main>
        <Hero />
        <BuildUp />
      </main>
    </GlossaryProvider>
  );
}
