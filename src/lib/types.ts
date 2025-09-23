export type CourseStatus = 'not-started' | 'in-progress' | 'completed';

export const CHECKLIST_ITEMS_DATA = [
  { id: 1, label: 'Namensschilder' },
  { id: 2, label: 'Schulungsbestätigung' },
  { id: 3, label: 'Anwesenheitsliste' },
  { id: 4, label: 'Reservierung Kantine' },
  { id: 5, label: 'Feedback Formular' },
  { id: 6, label: 'Tische reinigen' },
  { id: 7, label: 'Kaffeemaschine aufbereiten' },
  { id: 8, label: 'Süssigkeiten Ecke auffüllen' },
  { id: 9, label: 'Lüften' },
] as const;

export type ChecklistItem = {
  id: (typeof CHECKLIST_ITEMS_DATA)[number]['id'];
  label: string;
  completed: boolean;
};

export type Course = {
  id: string;
  name: string;
  dateObj: Date;
  date: string; // Using string for simplicity in mock data
  day: number; // Day of the week (0=Sun, 1=Mon, ...)
  room: 'Grosser Schulungsraum' | 'Kleiner Schulungsraum';
  description: string;
  status: CourseStatus;
  checklist: ChecklistItem[];
};
