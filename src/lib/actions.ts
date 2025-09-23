'use server';

import { revalidatePath } from 'next/cache';
import { getCourseById, updateCourse } from './data';
import type { CourseStatus } from './types';

export async function updateChecklistItem(
  courseId: string,
  itemId: number,
  completed: boolean
): Promise<{ success: boolean; allCompleted: boolean; newStatus: CourseStatus; message?: string }> {
  try {
    // Adding a small delay to simulate network latency if needed for testing
    // await new Promise(resolve => setTimeout(resolve, 500));

    const course = await getCourseById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const checklistItem = course.checklist.find((item) => item.id === itemId);
    if (!checklistItem) {
      throw new Error('Checklist item not found');
    }

    checklistItem.completed = completed;

    const completedCount = course.checklist.filter((item) => item.completed).length;
    const totalCount = course.checklist.length;

    let newStatus: CourseStatus;
    if (completedCount === totalCount) {
      newStatus = 'completed';
    } else if (completedCount > 0) {
      newStatus = 'in-progress';
    } else {
      newStatus = 'not-started';
    }
    course.status = newStatus;
    
    await updateCourse(course);

    // Revalidate all paths where course status is visible to ensure synchronization
    // This tells Next.js to re-fetch the data on the next request to these paths.
    revalidatePath('/');
    revalidatePath('/calendar');
    revalidatePath(`/courses/${courseId}`);
    revalidatePath(`/courses/${courseId}/prepare`);

    // Return the new status so the client can update its state reliably
    return {
      success: true,
      allCompleted: completedCount === totalCount,
      newStatus: newStatus,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Failed to update checklist item:', message);
    const course = await getCourseById(courseId);
    return { 
      success: false, 
      allCompleted: false, 
      newStatus: course?.status || 'not-started',
      message: message
    };
  }
}
