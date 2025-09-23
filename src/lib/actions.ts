'use server';

import { revalidatePath } from 'next/cache';
import { getCourseById, updateCourse } from './data';
import { CHECKLIST_ITEMS_DATA } from './types';

export async function updateChecklistItem(
  courseId: string,
  itemId: number,
  completed: boolean
): Promise<{ success: boolean; allCompleted: boolean; newStatus: string }> {
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
    const totalCount = CHECKLIST_ITEMS_DATA.length;

    let newStatus = course.status;
    if (completedCount === totalCount) {
      newStatus = 'completed';
    } else if (completedCount > 0) {
      newStatus = 'in-progress';
    } else {
      newStatus = 'not-started';
    }
    course.status = newStatus;
    
    await updateCourse(course);

    revalidatePath('/');
    revalidatePath('/calendar');
    revalidatePath(`/courses/${courseId}`);
    revalidatePath(`/courses/${courseId}/prepare`);

    return {
      success: true,
      allCompleted: completedCount === totalCount,
      newStatus: newStatus,
    };
  } catch (error) {
    console.error('Failed to update checklist item:', error);
    return { success: false, allCompleted: false, newStatus: '' };
  }
}
