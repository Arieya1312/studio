'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '@/lib/types';
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
    // Optimistically update the UI for immediate feedback
    const optimisticChecklist = course.checklist.map((item) =>
      item.id === itemId ? { ...item, completed } : item
    );
    const optimisticCourseState = { ...course, checklist: optimisticChecklist };
    setCourse(optimisticCourseState);

    startTransition(async () => {
      const result = await updateChecklistItem(course.id, itemId, completed);

      if (result.success) {
        // The server action was successful. Now, update the local state with the *definitive* new status
        // that the server has calculated and returned. This is the single source of truth.
        setCourse(prevCourse => ({ ...prevCourse, status: result.newStatus }));
        
        // This command tells Next.js to re-fetch data for Server Components.
        // This is the key to ensuring all other parts of the UI (Dashboard, Calendar) get the new state.
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
        {isPending && <div className="flex justify-center items-center pt-4"><Loader2 className="animate-spin text-primary h-6 w-6" /></div>}
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
