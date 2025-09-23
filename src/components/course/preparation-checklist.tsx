'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { updateChecklistItem } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import FinishedPopup from './finished-popup';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function StatusBadge({ status }: { status: 'not-started' | 'in-progress' | 'completed' }) {
  const statusMap = {
    'not-started': {
      label: 'Nicht gestartet',
      className: 'bg-chart-1/20 border-2 border-chart-1 text-foreground',
    },
    'in-progress': {
      label: 'In Arbeit',
      className: 'bg-chart-4/20 border-2 border-chart-4 text-foreground',
    },
    'completed': {
      label: 'Fertig',
      className: 'bg-chart-2/20 border-2 border-chart-2 text-foreground',
    },
  };

  const { label, className } = statusMap[status];

  return <Badge className={cn('text-xs', className)}>{label}</Badge>;
}


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
    const completedCount = optimisticChecklist.filter((item) => item.completed).length;
    const totalCount = optimisticChecklist.length;
    let optimisticStatus: 'not-started' | 'in-progress' | 'completed';

    if (completedCount === totalCount) {
      optimisticStatus = 'completed';
    } else if (completedCount > 0) {
      optimisticStatus = 'in-progress';
    } else {
      optimisticStatus = 'not-started';
    }

    const optimisticCourseState = { ...course, checklist: optimisticChecklist, status: optimisticStatus };
    setCourse(optimisticCourseState);

    startTransition(async () => {
      try {
        const result = await updateChecklistItem(course.id, itemId, completed);
        router.refresh();

        if (result.success) {
          // The server action was successful. Now, update the local state with the *definitive* new status
          // that the server has calculated and returned. This is the single source of truth.
          setCourse(prevCourse => ({ 
              ...prevCourse, 
              status: result.newStatus, 
              checklist: prevCourse.checklist.map(item => item.id === itemId ? { ...item, completed } : item) 
          }));
          
          // Only show the popup if the server confirms all items are completed.
          if (result.allCompleted) {
            setShowFinishedPopup(true);
          }
        } else {
          throw new Error('Checklist update failed on the server.');
        }
      } catch (error) {
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
      <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-headline">{course.name}</CardTitle>
                  <CardDescription className="text-lg pt-1">{course.date}</CardDescription>
                </div>
                <StatusBadge status={course.status} />
              </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
      </Card>

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
