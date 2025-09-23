import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export function Header({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      {backHref && (
        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Zurück</span>
          </Link>
        </Button>
      )}
      <h1 className="flex-1 text-xl font-bold font-headline tracking-tight sm:text-2xl">
        {title}
      </h1>
    </header>
  );
}
