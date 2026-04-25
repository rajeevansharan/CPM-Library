import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ScriptureMaterial {
  id: string;
  title: string;
  level: string;
  year: string;
  badge?: string;
  imageUri?: string;
  category: string;
}

export interface VoiceIssue {
  id: string;
  title: string;
  month: string;
  year: string;
  subtitle: string;
  category: string;
  imageUri?: string;
  isNew?: boolean;
}

interface BooksContextType {
  scriptureBooks: ScriptureMaterial[];
  voiceBooks: VoiceIssue[];
  addScriptureBook: (book: Omit<ScriptureMaterial, 'id'>) => void;
  addVoiceBook: (issue: Omit<VoiceIssue, 'id'>) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

// Initial Data from current components
const INITIAL_SCRIPTURE: ScriptureMaterial[] = [
  {
    id: '1',
    title: "Grade 8: Understanding Faith", 
    level: "Intermediate", 
    year: "2024 Curriculum", 
    badge: "MOST DOWNLOADED",
    category: "Grade"
  },
  {
    id: '2',
    title: "Grade 12: Foundations of Truth", 
    level: "Advanced", 
    year: "2024 Curriculum", 
    badge: "NEW", 
    imageUri: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop",
    category: "Grade"
  },
  {
    id: '3',
    title: "Grade 2: The Loving Shepherd", 
    level: "Beginner", 
    year: "2023 Edition", 
    badge: "MOST DOWNLOADED",
    imageUri: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop",
    category: "Grade"
  },
  {
    id: '4',
    title: "Church History & Doctrine", 
    level: "Intermediate", 
    year: "2024 Curriculum", 
    imageUri: "https://images.unsplash.com/photo-1532012197367-e43d0f467e9f?q=80&w=300&auto=format&fit=crop",
    category: "Category"
  }
];

const INITIAL_VOICE: VoiceIssue[] = [
  { 
    id: '1', 
    title: "October 2023", 
    month: "October",
    year: "2023",
    subtitle: "The Power of Stillness", 
    category: "Topic",
    imageUri: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    isNew: true
  },
  { 
    id: '2', 
    title: "September 2023", 
    month: "September",
    year: "2023",
    subtitle: "Walk by Faith", 
    category: "Topic",
    imageUri: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop"
  }
];

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [scriptureBooks, setScriptureBooks] = useState<ScriptureMaterial[]>(INITIAL_SCRIPTURE);
  const [voiceBooks, setVoiceBooks] = useState<VoiceIssue[]>(INITIAL_VOICE);

  const addScriptureBook = (book: Omit<ScriptureMaterial, 'id'>) => {
    const newBook = { ...book, id: Math.random().toString(36).substr(2, 9) };
    setScriptureBooks(prev => [newBook, ...prev]);
  };

  const addVoiceBook = (issue: Omit<VoiceIssue, 'id'>) => {
    const newIssue = { ...issue, id: Math.random().toString(36).substr(2, 9) };
    setVoiceBooks(prev => [newIssue, ...prev]);
  };

  return (
    <BooksContext.Provider value={{ scriptureBooks, voiceBooks, addScriptureBook, addVoiceBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};
