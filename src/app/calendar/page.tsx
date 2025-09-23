import { getCourses } from '@/lib/data';
import CalendarView from '@/components/calendar/calendar-view';

export default async function CalendarPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <CalendarView courses={courses} />
      </main>
    </div>
  );
}
