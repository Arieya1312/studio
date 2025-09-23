import { getCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import PreparationChecklist from '@/components/course/preparation-checklist';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function PrepareCoursePage({ params }: { params: { id: string } }) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Vorbereitung" backHref={`/courses/${course.id}`} />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl font-headline">{course.name}</CardTitle>
                <CardDescription className="text-lg pt-1">{course.date}</CardDescription>
            </CardHeader>
            <CardContent>
                <PreparationChecklist course={course} />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
