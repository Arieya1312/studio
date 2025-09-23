'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Course, ChecklistItem } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { updateChecklistItem } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import FinishedPopup from './finished-popup';

export default function PreparationChecklist({ course: initialCourse }: { course: Course }) {
  const [course, setCourse] = useState(initialCourse);
  const [isPending, startTransition] = useTransition();
  const [showFinishedPopup, setShowFinishedPopup] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCheckChange = (itemId: number, completed: boolean) => {
    // Create the potential new state for optimistic update, but we will rely on the server response.
    const newChecklist = course.checklist.map((item) =>
      item.id === itemId ? { ...item, completed } : item
    );
    const newCourseState = { ...course, checklist: newChecklist };
    setCourse(newCourseState);

    startTransition(async () => {
      const result = await updateChecklistItem(course.id, itemId, completed);

      if (result.success) {
        // The server action was successful. Now, update the local state with the *definitive* new status
        // that the server has calculated and returned. This is the single source of truth.
        const updatedCourseFromServer = { ...newCourseState, status: result.newStatus as Course['status'] };
        setCourse(updatedCourseFromServer);

        // Router refresh will re-fetch data on other pages, ensuring synchronization.
        router.refresh(); 

        // Only show the popup if the server confirms all items are completed.
        if (result.allCompleted) {
          setShowFinishedPopup(true);
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Fehler',
          description: 'Die Checkliste konnte nicht aktualisiert werden.',
        });
        // Revert UI change on error by restoring the original state.
        setCourse(initialCourse);
      }
    });
  };

  useEffect(() => {
    // This effect handles showing the popup if the component loads and the course is already completed.
    const allCompleted = course.checklist.every(item => item.completed);
    if(allCompleted && course.status === 'completed' && !showFinishedPopup) {
        // We only want to trigger the popup on the transition to completed, not if it's already completed.
        // The main logic in handleCheckChange is better for this.
        // This is a fallback for initial load.
    }
  }, [course.checklist, course.status, showFinishedPopup]);

  return (
    <>
      <div className="space-y-6">
        {course.checklist.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
            <Checkbox
              id={`item-${item.id}`}
              checked={item.completed}
              onCheckedChange={(checked) => handleCheckChange(item.id, !!checked)}
              className="h-6 w-6"
              disabled={isPending}
            />
            <Label
              htmlFor={`item-${item.id}`}
              className={`flex-1 text-lg ${item.completed ? 'line-through text-muted-foreground' : ''}`}
            >
              {item.label}
            </Label>
          </div>
        ))}
        {isPending && <div className="flex justify-center items-center"><Loader2 className="animate-spin text-primary" /></div>}
      </div>
      <FinishedPopup
        isOpen={showFinishedPopup}
        courseName={course.name}
        courseDate={course.date}
        onClose={() => {
          setShowFinishedPopup(false);
          router.push('/calendar');
        }}
      />
    </>
  );
}
