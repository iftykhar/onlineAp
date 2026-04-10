"use client"
import React, { useState, useEffect } from 'react'
import { X, Plus, Trash2, CheckCircle2, Circle, Square, Check } from 'lucide-react'
import { useTestCreationStore } from '@/app/store/useTestCreationStore';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

const QuestionModal = ({ isOpen, onClose, initialData }: QuestionModalProps) => {
  const addQuestion = useTestCreationStore((state) => state.addQuestion);
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [type, setType] = useState<'radio' | 'checkbox' | 'text'>(initialData?.type || 'radio');
  const [options, setOptions] = useState<string[]>(initialData?.options || ['', '']);
  
  // Initialize correctAnswer based on type
  const [correctAnswer, setCorrectAnswer] = useState<any>(
    initialData?.correctAnswer || (initialData?.type === 'checkbox' ? [] : null)
  );

  // Reset correct answer if type changes
  useEffect(() => {
    if (!initialData) {
      setCorrectAnswer(type === 'checkbox' ? [] : null);
    }
  }, [type, initialData]);

  if (!isOpen) return null;

  const handleAddOption = () => setOptions([...options, '']);
  
  const handleUpdateOption = (index: number, val: string) => {
    const newOptions = [...options];
    newOptions[index] = val;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 1) {
      const removedVal = options[index];
      setOptions(options.filter((_, i) => i !== index));
      // Clean up correct answers if the removed option was selected
      if (type === 'checkbox') {
        setCorrectAnswer(correctAnswer.filter((a: string) => a !== removedVal));
      } else if (correctAnswer === removedVal) {
        setCorrectAnswer(null);
      }
    }
  };

  const toggleCorrectAnswer = (optionVal: string) => {
    if (optionVal.trim() === '') return; // Don't allow empty options to be "correct"

    if (type === 'radio') {
      setCorrectAnswer(optionVal);
    } else {
      const current = Array.isArray(correctAnswer) ? correctAnswer : [];
      const next = current.includes(optionVal)
        ? current.filter(v => v !== optionVal)
        : [...current, optionVal];
      setCorrectAnswer(next);
    }
  };

  const handleSave = () => {
    if (!title.trim()) return alert("Please enter a question title");
    
    const finalOptions = options.filter(opt => opt.trim() !== '');
    if (type !== 'text' && finalOptions.length < 2) return alert("Please provide at least 2 options");

    const newQuestion = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      title,
      type,
      options: type === 'text' ? [] : finalOptions,
      correctAnswer: type === 'text' ? null : correctAnswer,
    };

    addQuestion(newQuestion);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Question' : 'Add New Question'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Question Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Question Title</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 min-h-[100px] resize-none text-slate-700"
            />
          </div>

          {/* Question Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Question Type</label>
            <div className="flex gap-3">
              {(['radio', 'checkbox', 'text'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-3 px-2 rounded-xl border-2 transition-all capitalize font-bold text-sm ${
                    type === t 
                    ? 'border-[#8b5cf6] bg-purple-50 text-[#8b5cf6]' 
                    : 'border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {t === 'radio' ? 'Single Choice' : t === 'checkbox' ? 'Multiple Choice' : 'Short Answer'}
                </button>
              ))}
            </div>
          </div>

          {/* Options Section */}
          {type !== 'text' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  Options 
                  <span className="text-[10px] text-slate-400 font-normal">(Click icons to mark correct)</span>
                </label>
                <button 
                  onClick={handleAddOption}
                  className="text-[#8b5cf6] text-sm font-bold flex items-center gap-1 hover:bg-purple-50 px-2 py-1 rounded-lg"
                >
                  <Plus className="w-4 h-4" /> Add Option
                </button>
              </div>

              <div className="space-y-3">
                {options.map((opt, index) => {
                  const isCorrect = type === 'checkbox' 
                    ? correctAnswer?.includes(opt) 
                    : correctAnswer === opt && opt !== '';

                  return (
                    <div key={index} className="flex gap-2 group">
                      {/* Mark Correct Toggle */}
                      <button
                        onClick={() => toggleCorrectAnswer(opt)}
                        className={`flex items-center justify-center w-12 rounded-xl border-2 transition-all ${
                          isCorrect 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-100 bg-gray-50 text-gray-300 hover:border-purple-200'
                        }`}
                      >
                        {isCorrect ? <Check className="w-5 h-5" /> : type === 'radio' ? <Circle className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </button>

                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleUpdateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all focus:outline-none ${
                          isCorrect ? 'border-green-100 bg-green-50/30' : 'border-gray-100 focus:ring-2 focus:ring-purple-100'
                        }`}
                      />
                      
                      <button
                        onClick={() => handleRemoveOption(index)}
                        className="p-3 hover:bg-red-50 rounded-xl transition-colors text-red-300 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {type === 'text' && (
            <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
              <p className="text-sm text-slate-400 font-medium">No options needed for short answer questions.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-4 px-4 rounded-2xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-4 px-4 rounded-2xl bg-[#8b5cf6] text-white font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <CheckCircle2 className="w-5 h-5" />
            {initialData ? 'Update Question' : 'Save Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;