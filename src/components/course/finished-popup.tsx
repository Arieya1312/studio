'use client';

import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Check } from 'lucide-react';

interface FinishedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  courseDate: string;
}

export default function FinishedPopup({ isOpen, onClose, courseName, courseDate }: FinishedPopupProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] p-10 flex flex-col items-center justify-center text-center bg-background/95 backdrop-blur-sm">
        <DialogHeader className="sr-only">
          <DialogTitle>Vorbereitung erledigt</DialogTitle>
          <DialogDescription>
            Die Vorbereitung für den Kurs "{courseName}" am {courseDate} wurde erfolgreich abgeschlossen.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <h2 className="text-xl font-bold font-headline">{courseName}</h2>
          <p className="text-muted-foreground">{courseDate}</p>
        </div>
        
        <div className="relative my-6">
          <div className="h-40 w-40 rounded-full bg-success flex items-center justify-center shadow-lg">
            <Check className="h-28 w-28 text-success-foreground" strokeWidth={3} />
          </div>
        </div>

        <h3 className="text-3xl font-bold text-foreground">
          Vorbereitung erledigt
        </h3>
      </DialogContent>
    </Dialog>
  );
}
