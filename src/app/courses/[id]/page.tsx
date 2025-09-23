import { getCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function StatusBadge({ status }: { status: 'not-started' | 'in-progress' | 'completed' }) {
  const statusMap = {
    'not-started': {
      label: 'Vorbereitung nicht gestartet',
      className: 'bg-chart-1/20 border-2 border-chart-1 text-foreground',
    },
    'in-progress': {
      label: 'Vorbereitung in Arbeit',
      className: 'bg-chart-4/20 border-2 border-chart-4 text-foreground',
    },
    'completed': {
      label: 'Vorbereitung erledigt',
      className: 'bg-chart-2/20 border-2 border-chart-2 text-foreground',
    },
  };

  const { label, className } = statusMap[status];

  return <Badge className={cn('text-sm', className)}>{label}</Badge>;
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={course.name} backHref="/calendar" />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle className="text-3xl font-headline">{course.name}</CardTitle>
                <StatusBadge status={course.status} />
            </div>
            <CardDescription className="text-lg pt-2">
                {course.date} &middot; {course.room}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">
                {course.description}
            </p>
          </CardContent>
          {course.status !== 'completed' && (
            <CardFooter>
                <Button asChild size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
                    <Link href={`/courses/${course.id}/prepare`}>Vorbereiten</Link>
                </Button>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
}
