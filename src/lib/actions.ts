'use server';

import { revalidatePath } from 'next/cache';
import { getCourseById, updateCourse } from './data';
import type { CourseStatus } from './types';

export async function updateChecklistItem(
  courseId: string,
  itemId: number,
  completed: boolean
): Promise<{ success: boolean; allCompleted: boolean; newStatus: CourseStatus }> {
  try {
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
    console.error('Failed to update checklist item:', error);
    // In case of an error, return the original status or a sensible default.
    const course = await getCourseById(courseId);
    return { success: false, allCompleted: false, newStatus: course?.status || 'not-started' };
  }
}
