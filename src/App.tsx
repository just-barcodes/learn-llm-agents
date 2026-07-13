import { GlossaryProvider } from './components/glossary/GlossaryProvider.tsx';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle.tsx';
import { Hero } from './sections/Hero/Hero.tsx';
import { BuildUp } from './sections/BuildUp/BuildUp.tsx';

export function App() {
  return (
    <GlossaryProvider>
      <ThemeToggle />
      <main>
        <Hero />
        <BuildUp />
      </main>
    </GlossaryProvider>
  );
}
