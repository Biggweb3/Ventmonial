import { TestimonialGenerator } from '@/components/testimonial-generator';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="flex items-center gap-3 text-3xl font-bold md:text-4xl">
          <h1 className="font-headline tracking-tight">Ventmonial</h1>
        </div>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
          For better response, give full details of your project or service, this helps the VentixlabsAI give you outstanding convincing results.
        </p>
      </header>
      <main className="flex-grow">
        <TestimonialGenerator />
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        Powered by{' '}
        <Link
          href="https://x.com/ventixlabs"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary/80 underline-offset-4 transition-colors hover:text-primary"
        >
          Ventixlabs
        </Link>
      </footer>
    </div>
  );
}
