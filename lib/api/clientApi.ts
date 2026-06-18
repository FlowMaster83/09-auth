import type { Note } from '../../types/note';
import type { User } from '@/types/user';
import { nextServer } from './api';

import { NoteTag } from '../../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

// get all notes
export const fetchNotes = async (
  search: string = '',
  page: number = 1,
  perPage: number = 12,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: { search, page, perPage, ...(tag && { tag }) },
  });
  return response.data;
};

// get one note
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

// post
export const createNote = async (data: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', data);
  return response.data;
};

// delete
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

// register
export type RegisterData = {
  email: string;
  password: string;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await nextServer.post<User>('/auth/register', data);
  return response.data;
};

// login
export type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

// logout
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

// checkSession
type CheckSessionResponse = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>('/auth/session');
  return res.data.success;
};

// getMe
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

// updateMe
export type UpdateUserData = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserData) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
