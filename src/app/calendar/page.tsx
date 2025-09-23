import { getCourses } from '@/lib/data';
import CalendarView from '@/components/calendar/calendar-view';
import { Header } from '@/components/header';

export default async function CalendarPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Kalender" backHref="/" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <CalendarView courses={courses} />
      </main>
    </div>
  );
}
