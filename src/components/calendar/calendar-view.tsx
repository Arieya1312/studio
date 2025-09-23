'use client';

import Link from 'next/link';
import type { Course } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';
import { addDays, format, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';

const rooms = ['Grosser Schulungsraum', 'Kleiner Schulungsraum'];

const statusColors = {
  'not-started': 'bg-chart-1',
  'in-progress': 'bg-chart-4',
  'completed': 'bg-chart-2',
};

export default function CalendarView({ courses }: { courses: Course[] }) {
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="grid grid-cols-[10rem,repeat(7,1fr)] min-w-[900px]">
        {/* Header Row */}
        <div className="p-3 font-bold font-headline bg-muted/50 border-b border-r">Raum</div>
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="p-3 font-bold font-headline text-center bg-muted/50 border-b border-r last:border-r-0">
            <div className='capitalize'>{format(day, 'E', { locale: de })}</div>
            <div className="text-sm font-normal">{format(day, 'dd.MM', { locale: de })}</div>
          </div>
        ))}

        {/* Room Rows */}
        {rooms.map((room, roomIndex) => (
          <div key={room} className="grid grid-cols-subgrid col-span-8">
            <div className={cn(
                "p-3 font-semibold font-headline border-r flex items-center",
                roomIndex === 0 ? "border-b" : ""
              )}>
              {room}
            </div>
            {weekDays.map((day) => {
              const coursesInSlot = courses.filter(
                (c) => c.room === room && isSameDay(c.dateObj, day)
              );
              return (
                <div key={`${room}-${day.toISOString()}`} className={cn(
                  "p-2 min-h-32 border-r last:border-r-0 relative flex flex-col gap-2",
                  roomIndex === 0 ? "border-b" : ""
                  )}>
                  {coursesInSlot.map((course) => (
                    <Link href={`/courses/${course.id}`} key={course.id} className="block group">
                      <div
                        className={cn(
                          'w-full p-2 rounded-lg text-white shadow-md transition-transform transform group-hover:scale-105 group-hover:shadow-xl',
                          statusColors[course.status],
                          course.status === 'in-progress' ? 'text-black' : 'text-white'
                        )}
                      >
                        <p className="font-semibold text-sm truncate">{course.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}
