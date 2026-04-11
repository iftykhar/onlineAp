"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we only run on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && containerRef.current && !quillRef.current) {
      const initQuill = async () => {
        // Dynamically import Quill to avoid SSR errors
        const QuillModule = await import('quill');
        const Quill = QuillModule.default;
        
        if (!containerRef.current) return;

        const quill = new Quill(containerRef.current, {
          theme: 'snow',
          placeholder: placeholder || 'Type your content here...',
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image', 'video'],
              ['clean']
            ],
          },
        });

        quillRef.current = quill;

        // Set initial value
        if (value) {
          quill.root.innerHTML = value;
        }

        // Handle text changes
        quill.on('text-change', () => {
          const content = quill.root.innerHTML;
          // Quill often leaves <p><br></p> when empty
          const normalizedContent = content === '<p><br></p>' ? '' : content;
          onChange(normalizedContent);
        });
      };

      initQuill();
    }
  }, [isClient, placeholder]);

  // Synchronize value from outside
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      // Avoid infinite loop if Quill content is slightly different (e.g. empty paragraph)
      if (value === '' && quillRef.current.root.innerHTML === '<p><br></p>') return;
      
      // Save current selection to prevent cursor jumping
      const selection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = value || '';
      
      // Restore selection if it existed
      if (selection) {
        quillRef.current.setSelection(selection);
      }
    }
  }, [value]);

  if (!isClient) {
    return (
      <div className={`h-48 w-full bg-slate-50 animate-pulse rounded-2xl border border-gray-100 flex items-center justify-center text-slate-400 ${className}`}>
        Loading Editor...
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <style>{`
        .ql-container {
          font-family: inherit !important;
          font-size: 1rem !important;
          border-bottom-left-radius: 1rem !important;
          border-bottom-right-radius: 1rem !important;
          border-color: #e2e8f0 !important;
          min-height: 150px;
          background-color: #ffffff;
        }
        .ql-toolbar {
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
          border-color: #e2e8f0 !important;
          background-color: #f8fafc;
          padding: 8px 12px;
        }
        .ql-editor {
          min-height: 150px;
          color: #334155;
        }
        .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
        }
        .ql-editor:focus {
          outline: none;
        }
        /* Custom pulse effect on focus */
        .react-quill-wrapper:focus-within .ql-container,
        .react-quill-wrapper:focus-within .ql-toolbar {
          border-color: #8b5cf6 !important;
        }
      `}</style>
      <div className="react-quill-wrapper rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:border-purple-200">
        <div ref={containerRef} />
      </div>
    </div>
  );
};

export default RichTextEditor;
