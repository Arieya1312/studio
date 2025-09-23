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
    const newChecklist = course.checklist.map((item) =>
      item.id === itemId ? { ...item, completed } : item
    );
    const newCourseState = { ...course, checklist: newChecklist };
    setCourse(newCourseState);

    startTransition(async () => {
      const result = await updateChecklistItem(course.id, itemId, completed);
      if (!result.success) {
        toast({
          variant: 'destructive',
          title: 'Fehler',
          description: 'Die Checkliste konnte nicht aktualisiert werden.',
        });
        // Revert UI change on error
        setCourse(course);
      } else {
        const updatedCourse = { ...newCourseState, status: result.newStatus as Course['status'] };
        setCourse(updatedCourse);
        if (result.allCompleted) {
          setShowFinishedPopup(true);
        }
      }
    });
  };

  useEffect(() => {
    const allCompleted = course.checklist.every(item => item.completed);
    if(allCompleted && course.status === 'completed') {
        setShowFinishedPopup(true);
    }
  }, [course.checklist, course.status]);

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
        {isPending && <Loader2 className="animate-spin text-primary" />}
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
