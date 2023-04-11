import { AxiosError } from 'axios';
import Pagination from './pagination';

interface HttpResponse<T> {
  status: string;
  data?: T;
  message?: string;
  pagination?: Pagination;
  errors?: string[];
}

interface ApiError {
  status: string;
  message: string;
  errors?: string[];
}

type HttpError = AxiosError<ApiError>;

export type { HttpError, HttpResponse };
