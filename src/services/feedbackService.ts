import type { FeedbackItem } from '../types/navigation';

const STORAGE_KEY = 'mits_campus_feedback_v1';

export const feedbackService = {
  /**
   * Retrieves all saved feedback entries from localStorage.
   */
  getFeedback(): FeedbackItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored) as FeedbackItem[];
    } catch (e) {
      console.warn('Failed to load feedback from localStorage:', e);
      return [];
    }
  },

  /**
   * Submits a new feedback item into storage.
   * Readily extensible to POST to a real backend REST API.
   */
  async submitFeedback(
    item: Omit<FeedbackItem, 'id' | 'timestamp'>
  ): Promise<{ success: boolean; data?: FeedbackItem; error?: string }> {
    try {
      const newItem: FeedbackItem = {
        id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: item.name?.trim() || 'Anonymous Campus User',
        email: item.email?.trim() || undefined,
        rating: item.rating,
        category: item.category,
        message: item.message.trim(),
        timestamp: new Date().toISOString(),
      };

      const existing = this.getFeedback();
      existing.unshift(newItem);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      // Simulated network latency for realistic feel
      await new Promise((resolve) => setTimeout(resolve, 350));

      return { success: true, data: newItem };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save feedback.',
      };
    }
  },
};
