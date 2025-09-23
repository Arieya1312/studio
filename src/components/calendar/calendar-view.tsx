
'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { format, addDays, subDays, startOfWeek, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

const rooms = ['Grosser Schulungsraum', 'Kleiner Schulungsraum'];

const statusColors = {
  'not-started': 'bg-chart-1',
  'in-progress': 'bg-chart-4',
  'completed': 'bg-chart-2',
};

export default function CalendarView({ courses }: { courses: Course[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(start, i));

  const handlePrevWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center justify-between gap-4 border-b px-4 h-16 md:px-6">
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Zurück zur Startseite</span>
                </Link>
            </Button>
        </div>
        <div className='flex items-center gap-4'>
            <span className="text-xl font-semibold capitalize font-headline">
              {format(currentDate, 'MMMM yyyy', { locale: de })}
            </span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevWeek}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Vorherige Woche</span>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Nächste Woche</span>
            </Button>
        </div>
        <h1 className="flex-1 text-center text-xl font-bold font-headline tracking-tight sm:text-2xl">
            Kalender
        </h1>
        <div className="w-40"></div>
      </header>
      <div className="flex-1 overflow-auto p-4 sm:p-6">
      <Card className="overflow-hidden shadow-lg min-w-[900px]">
        <div className="grid grid-cols-[12rem,repeat(5,minmax(0,1fr))]">
            {/* Header Row */}
            <div className="p-3 font-bold font-headline bg-muted/50 border-b border-r">Raum</div>
            {weekDays.map((day) => (
            <div key={day.toISOString()} className="p-3 font-bold font-headline text-center bg-muted/50 border-b border-r last:border-r-0">
                <div className='capitalize'>{format(day, 'E', { locale: de })}.</div>
                <div className="text-sm font-normal">{format(day, 'dd.MM', { locale: de })}</div>
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
                            'w-full p-2 rounded-lg shadow-md transition-transform transform group-hover:scale-105 group-hover:shadow-xl',
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
      </div>
    </div>
  );
}
