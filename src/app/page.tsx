import { TestimonialGenerator } from '@/components/testimonial-generator';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="flex items-center gap-3 text-3xl font-bold md:text-4xl">
           <div className="bg-primary p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary-foreground"
            >
              <path d="M12.5 22h-1a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z" />
              <path d="M16.5 22h1a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z" />
              <path d="M7.5 22h1a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z" />
              <path d="m12 11.5-1.5-2.4c-.9-.4-1-.4-1.9.1s-1.1 1.4-2.1 2.3c-1.2 1-1.2 1-2.2.5s-1.6-1.8-1.6-2.8c0-2.4 2.2-4.5 4.5-4.5s4.5 2.1 4.5 4.5c0 1-1 2.3-1.6 2.8s-1.3.1-2.2-.5c-1-.5-1.5-1.4-2.1-2.3s-.9-1.4-1.9-.1L6.5 9.5" />
            </svg>
           </div>
          <h1 className="font-headline tracking-tight">TestiAI</h1>
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
