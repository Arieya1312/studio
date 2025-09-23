import { getCourses } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

function StatusBadge({ status }: { status: 'not-started' | 'in-progress' | 'completed' }) {
  const statusMap = {
    'not-started': {
      label: 'Nicht gestartet',
      className: 'bg-chart-1 text-white hover:bg-chart-1/90',
    },
    'in-progress': {
      label: 'In Arbeit',
      className: 'bg-chart-4 text-black hover:bg-chart-4/90',
    },
    'completed': {
      label: 'Fertig',
      className: 'bg-chart-2 text-white hover:bg-chart-2/90',
    },
  };

  const { label, className } = statusMap[status];

  return <Badge className={cn('text-xs absolute top-4 right-4', className)}>{label}</Badge>;
}

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Übersicht der anstehenden Kurse
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="flex">
              <Card className="w-full flex flex-col transition-shadow duration-300 hover:shadow-xl hover:border-primary/50">
                <CardHeader className="relative pb-4">
                  <CardTitle className="font-headline text-xl mb-2 pr-24">{course.name}</CardTitle>
                  <StatusBadge status={course.status} />
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                    <p className="text-sm text-muted-foreground">{course.date}</p>
                    <p className="text-sm text-muted-foreground">{course.room}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <footer className="py-6 px-4 text-center">
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
          <Link href="/calendar">Zum Kalender</Link>
        </Button>
      </footer>
    </div>
  );
}
