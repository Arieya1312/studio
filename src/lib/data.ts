import { Course, CourseStatus, CHECKLIST_ITEMS_DATA, ChecklistItem } from './types';
import { format, addDays, getDay, startOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';

// In-memory store for courses
let courses: Course[] = [];

const createInitialChecklist = (): ChecklistItem[] =>
  CHECKLIST_ITEMS_DATA.map(item => ({ ...item, completed: false }));

const generateInitialCourses = () => {
  const today = new Date();
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  
  return [
    {
      id: '1',
      name: 'Next.js Grundlagen',
      dateObj: monday,
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
      dateObj: addDays(monday, 1),
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
      dateObj: addDays(monday, 2),
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
      dateObj: addDays(monday, 3),
      date: format(addDays(monday, 3), 'EEEE, dd.MM.yyyy', { locale: de }),
      day: getDay(addDays(monday, 3)),
      room: 'Kleiner Schulungsraum',
      description: 'Lernen Sie, wie man mit Storybook robuste und wiederverwendbare UI-Komponenten für ein Design-System entwickelt.',
      status: 'not-started' as CourseStatus,
      checklist: createInitialChecklist(),
    },
    {
        id: '5',
        name: 'Testing mit Jest & RTL',
        dateObj: addDays(monday, 4),
        date: format(addDays(monday, 4), 'EEEE, dd.MM.yyyy', { locale: de }),
        day: getDay(addDays(monday, 4)),
        room: 'Grosser Schulungsraum',
        description: 'Einführung in das Testen von React-Anwendungen mit Jest und der React Testing Library.',
        status: 'not-started' as CourseStatus,
        checklist: createInitialChecklist(),
    },
    {
        id: '6',
        name: 'Tailwind CSS Workshop',
        dateObj: addDays(monday, 7), // Next week
        date: format(addDays(monday, 7), 'EEEE, dd.MM.yyyy', { locale: de }),
        day: getDay(addDays(monday, 7)),
        room: 'Kleiner Schulungsraum',
        description: 'Ein praktischer Workshop zu den Grundlagen und fortgeschrittenen Konzepten von Tailwind CSS.',
        status: 'in-progress' as CourseStatus,
        checklist: [
            ...CHECKLIST_ITEMS_DATA.slice(0, 1).map(item => ({ ...item, completed: true })),
            ...CHECKLIST_ITEMS_DATA.slice(1).map(item => ({ ...item, completed: false })),
        ],
    },
     {
        id: '7',
        name: 'GraphQL Grundlagen',
        dateObj: addDays(monday, 8), // Next week
        date: format(addDays(monday, 8), 'EEEE, dd.MM.yyyy', { locale: de }),
        day: getDay(addDays(monday, 8)),
        room: 'Grosser Schulungsraum',
        description: 'Lernen Sie die Grundlagen von GraphQL und wie man es in einer modernen Webanwendung einsetzt.',
        status: 'not-started' as CourseStatus,
        checklist: createInitialChecklist(),
    }
  ];
};

if (courses.length === 0) {
  courses = generateInitialCourses();
}

// Simulate API calls
export const getCourses = async (): Promise<Course[]> => {
  // deep copy to avoid mutations affecting the "database"
  return Promise.resolve(JSON.parse(JSON.stringify(courses.map(c => ({...c, dateObj: c.dateObj.toISOString()}))
  )).map((c: any) => ({...c, dateObj: new Date(c.dateObj)})));
};

export const getCourseById = async (id: string): Promise<Course | undefined> => {
  const course = courses.find(course => course.id === id);
  if (!course) return undefined;
  // deep copy to avoid mutations affecting the "database"
  return Promise.resolve(JSON.parse(JSON.stringify({...course, dateObj: course.dateObj.toISOString()}))).then(c => ({...c, dateObj: new Date(c.dateObj)}));
};

export const updateCourse = async (updatedCourse: Course): Promise<Course> => {
  const index = courses.findIndex(course => course.id === updatedCourse.id);
  if (index !== -1) {
    courses[index] = JSON.parse(JSON.stringify({...updatedCourse, dateObj: updatedCourse.dateObj.toISOString()}));
    courses[index].dateObj = new Date(courses[index].dateObj);
    return Promise.resolve(updatedCourse);
  }
  throw new Error('Course not found');
};
