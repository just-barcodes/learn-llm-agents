import { GlossaryProvider } from './components/glossary/GlossaryProvider.tsx';
import { Term } from './components/glossary/Term.tsx';

export function App() {
  return (
    <GlossaryProvider>
      <main>
        <h1>What is an AI agent?</h1>
        <p>
          An agent is a <Term term="llm">large language model</Term> plus some software
          around it.
        </p>
      </main>
    </GlossaryProvider>
  );
}
