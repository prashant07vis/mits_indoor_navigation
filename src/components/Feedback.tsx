import React, { useState } from 'react';
import { Star, MessageSquare, Send, X, ThumbsUp, CheckCircle } from 'lucide-react';
import { feedbackService } from '../services/feedbackService';
import type { FeedbackItem } from '../types/navigation';

interface FeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackCategory = FeedbackItem['category'];

export const Feedback: React.FC<FeedbackProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<FeedbackCategory>('Route Accuracy');
  const [userName, setUserName] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(feedbackService.getFeedback());

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;

    setIsSubmitting(true);
    const result = await feedbackService.submitFeedback({
      rating,
      category,
      name: userName.trim() || 'MITS Student / Visitor',
      message: comments.trim(),
    });
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setFeedbackList(feedbackService.getFeedback());
      setTimeout(() => {
        setIsSubmitted(false);
        setComments('');
        onClose();
      }, 1800);
    }
  };

  const categories: FeedbackCategory[] = [
    'Route Accuracy',
    'Map Issue',
    'Wrong Teacher/Room Information',
    'UI/Design',
    'Other',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-indigo-500 to-amber-400" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">System Feedback & Ratings</h3>
              <p className="text-xs text-slate-400">Help us refine campus navigation algorithms</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-white">Feedback Submitted!</h4>
            <p className="text-xs text-slate-300 mt-1">
              Thank you for helping us improve the MITS Indoor Campus Navigation System.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Rate Route Accuracy & Experience
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-300 ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      category === c
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Name / Roll No */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                Name or Roll No. (Optional)
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Prashant S. / 0901CS221000"
                className="w-full px-3.5 py-2 bg-slate-800 text-sm text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                Comments & Suggestions *
              </label>
              <textarea
                required
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="e.g. Route from Ground foyer to Lab 201 via lift was very accurate..."
                className="w-full px-3.5 py-2 bg-slate-800 text-sm text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        )}

        {/* Recent Feedback Feed */}
        {feedbackList.length > 0 && !isSubmitted && (
          <div className="mt-6 pt-4 border-t border-slate-800">
            <h5 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <ThumbsUp className="w-3 h-3 text-indigo-400" /> Recent Campus Submissions
            </h5>
            <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar pr-1">
              {feedbackList.slice(0, 3).map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold text-white">{item.name}</span>
                    <div className="flex text-amber-400">
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </div>
                  </div>
                  <p className="text-slate-400 mt-1 line-clamp-2 text-[11px]">{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
