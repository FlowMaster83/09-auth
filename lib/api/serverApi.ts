import { cookies } from 'next/headers';
import { FetchNotesResponse } from './clientApi';
import { Note, NoteTag } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

// get all notes
export const fetchNotes = async (
  search: string = '',
  page: number = 1,
  perPage: number = 12,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: { search, page, perPage, ...(tag && { tag }) },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// checkSession
type CheckSessionResponse = {
  success: boolean;
};

export const checkSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

// getMe
export const getMe = async () => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
