import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

export interface ScriptureMaterial {
  id: string;
  title: string;
  grade: string;
  description?: string;
  fileUrl?: string;
  category: string;
  type: 'scripture';
}

export interface VoiceIssue {
  id: string;
  title: string;
  month: string;
  year: string;
  subtitle: string;
  description?: string;
  fileUrl?: string;
  category: string;
  type: 'voice';
  isNew?: boolean;
}

export interface PentecostBook {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  languages: string[];
  imageUri?: string;
  fileUrl?: string;
  type: 'pentecost';
}

interface BooksContextType {
  scriptureBooks: ScriptureMaterial[];
  voiceBooks: VoiceIssue[];
  pentecostBooks: PentecostBook[];
  addScriptureBook: (book: Partial<ScriptureMaterial>, file?: any, coverImage?: any) => Promise<void>;
  addVoiceBook: (issue: Partial<VoiceIssue>, file?: any, coverImage?: any) => Promise<void>;
  addPentecostBook: (book: Partial<PentecostBook>, file?: any, coverImage?: any) => Promise<void>;
  deleteBook: (type: 'scripture' | 'voice' | 'pentecost', id: string) => Promise<void>;
  refreshBooks: () => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [scriptureBooks, setScriptureBooks] = useState<ScriptureMaterial[]>([]);
  const [voiceBooks, setVoiceBooks] = useState<VoiceIssue[]>([]);
  const [pentecostBooks, setPentecostBooks] = useState<PentecostBook[]>([]);

  const refreshBooks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      const data = await response.json();
      setScriptureBooks(data.scriptureBooks || []);
      setVoiceBooks(data.voiceBooks || []);
      setPentecostBooks(data.pentecostBooks || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    refreshBooks();
  }, []);

  const addScriptureBook = async (book: Partial<ScriptureMaterial>, file?: any, coverImage?: any) => {
    try {
      const formData = new FormData();
      Object.keys(book).forEach(key => {
        if ((book as any)[key] !== undefined) {
          formData.append(key, (book as any)[key]);
        }
      });
      if (file) formData.append('file', file);
      if (coverImage) formData.append('coverImage', coverImage);

      const response = await fetch(`${API_BASE_URL}/books/scripture`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await refreshBooks();
      }
    } catch (error) {
      console.error("Error adding scripture book:", error);
    }
  };

  const addVoiceBook = async (issue: Partial<VoiceIssue>, file?: any, coverImage?: any) => {
    try {
      const formData = new FormData();
      Object.keys(issue).forEach(key => {
        if ((issue as any)[key] !== undefined) {
          formData.append(key, (issue as any)[key]);
        }
      });
      if (file) formData.append('file', file);
      if (coverImage) formData.append('coverImage', coverImage);

      const response = await fetch(`${API_BASE_URL}/books/voice`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await refreshBooks();
      }
    } catch (error) {
      console.error("Error adding voice issue:", error);
    }
  };

  const addPentecostBook = async (book: Partial<PentecostBook>, file?: any, coverImage?: any) => {
    try {
      const formData = new FormData();
      Object.keys(book).forEach(key => {
        if ((book as any)[key] !== undefined) {
          if (key === 'languages') {
            formData.append(key, JSON.stringify((book as any)[key]));
          } else {
            formData.append(key, (book as any)[key]);
          }
        }
      });
      if (file) formData.append('file', file);
      if (coverImage) formData.append('coverImage', coverImage);

      const response = await fetch(`${API_BASE_URL}/books/pentecost`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await refreshBooks();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload pentecost book');
      }
    } catch (error) {
      console.error("Error adding pentecost book:", error);
      throw error;
    }
  };

  const deleteBook = async (type: 'scripture' | 'voice' | 'pentecost', id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${type}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await refreshBooks();
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <BooksContext.Provider value={{ scriptureBooks, voiceBooks, pentecostBooks, addScriptureBook, addVoiceBook, addPentecostBook, deleteBook, refreshBooks }}>
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
