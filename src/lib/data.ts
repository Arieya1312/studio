import { Course, CourseStatus, CHECKLIST_ITEMS_DATA, ChecklistItem } from './types';
import { format, addDays, getDay } from 'date-fns';
import { de } from 'date-fns/locale';

// In-memory store for courses
let courses: Course[] = [];

const createInitialChecklist = (): ChecklistItem[] =>
  CHECKLIST_ITEMS_DATA.map(item => ({ ...item, completed: false }));

const generateInitialCourses = () => {
  const today = new Date();
  const getNextDay = (start: Date, dayOfWeek: number): Date => {
    const date = new Date(start.getTime());
    date.setDate(start.getDate() + (dayOfWeek - start.getDay() + 7) % 7);
    return date;
  }

  const monday = getNextDay(today, 1);
  
  return [
    {
      id: '1',
      name: 'Next.js Grundlagen',
      date: format(monday, 'EEEE, dd.MM.yyyy', { locale: de }),
      day: getDay(monday),
      room: 'Grosser Schulungsraum',
      description: 'Einführung in die Grundlagen von Next.js, einschliesslich serverseitigem Rendering, statischer Seitengenerierung und API-Routen.',
      status: 'not-started' as CourseStatus,
      checklist: createInitialChecklist(),
    },
    {
      id: '2',
      name: 'TypeScript für Fortgeschrittene',
      date: format(addDays(monday, 1), 'EEEE, dd.MM.yyyy', { locale: de }),
      day: getDay(addDays(monday, 1)),
      room: 'Kleiner Schulungsraum',
      description: 'Vertiefung der TypeScript-Kenntnisse mit fortgeschrittenen Typen, Generics und Decorators. Perfekt für erfahrene Entwickler.',
      status: 'in-progress' as CourseStatus,
      checklist: [
        ...CHECKLIST_ITEMS_DATA.slice(0, 3).map(item => ({ ...item, completed: true })),
        ...CHECKLIST_ITEMS_DATA.slice(3).map(item => ({ ...item, completed: false })),
      ],
    },
    {
      id: '3',
      name: 'React State Management',
      date: format(addDays(monday, 2), 'EEEE, dd.MM.yyyy', { locale: de }),
      day: getDay(addDays(monday, 2)),
      room: 'Grosser Schulungsraum',
      description: 'Ein Überblick über verschiedene State-Management-Lösungen in React, von Context API bis hin zu Redux und Zustand.',
      status: 'completed' as CourseStatus,
      checklist: CHECKLIST_ITEMS_DATA.map(item => ({ ...item, completed: true })),
    },
    {
      id: '4',
      name: 'Design-Systeme mit Storybook',
      date: format(addDays(monday, 3), 'EEEE, dd.MM.yyyy', { locale: de }),
      day: getDay(addDays(monday, 3)),
      room: 'Kleiner Schulungsraum',
      description: 'Lernen Sie, wie man mit Storybook robuste und wiederverwendbare UI-Komponenten für ein Design-System entwickelt.',
      status: 'not-started' as CourseStatus,
      checklist: createInitialChecklist(),
    },
  ];
};

if (courses.length === 0) {
  courses = generateInitialCourses();
}

// Simulate API calls
export const getCourses = async (): Promise<Course[]> => {
  return Promise.resolve(courses);
};

export const getCourseById = async (id: string): Promise<Course | undefined> => {
  return Promise.resolve(courses.find(course => course.id === id));
};

export const updateCourse = async (updatedCourse: Course): Promise<Course> => {
  const index = courses.findIndex(course => course.id === updatedCourse.id);
  if (index !== -1) {
    courses[index] = updatedCourse;
    return Promise.resolve(updatedCourse);
  }
  throw new Error('Course not found');
};
