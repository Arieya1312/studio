'use client';

import Link from 'next/link';
import type { Course } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

const rooms = ['Grosser Schulungsraum', 'Kleiner Schulungsraum'];
const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const dayMap = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };

const statusColors = {
  'not-started': 'bg-chart-1',
  'in-progress': 'bg-chart-4',
  'completed': 'bg-chart-2',
};

export default function CalendarView({ courses }: { courses: Course[] }) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="grid grid-cols-[12rem,1fr,1fr,1fr,1fr,1fr] min-w-[800px]">
        {/* Header Row */}
        <div className="p-3 font-bold font-headline bg-muted/50 border-b border-r">Raum</div>
        {days.map((day) => (
          <div key={day} className="p-3 font-bold font-headline text-center bg-muted/50 border-b border-r last:border-r-0">
            {day}
          </div>
        ))}

        {/* Room Rows */}
        {rooms.map((room, roomIndex) => (
          <div key={room} className="grid grid-cols-subgrid col-span-6">
            <div className={cn(
                "p-3 font-semibold font-headline border-r flex items-center",
                roomIndex === 0 ? "border-b" : ""
              )}>
              {room}
            </div>
            {days.map((day, dayIndex) => {
              const coursesInSlot = courses.filter(
                (c) => c.room === room && dayMap[c.day as keyof typeof dayMap] === dayIndex
              );
              return (
                <div key={`${room}-${day}`} className={cn(
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
