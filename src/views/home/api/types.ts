import { User } from '@contexts';

export interface CreateStreamPayload {
  description: string;
  title: string;
}

export interface UpdateStreamPayload {
  description: string;
  title: string;
}

export interface Stream {
  description: string;
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  createdBy: User;
}
