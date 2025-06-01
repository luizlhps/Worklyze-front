export interface CustomException {
  status: number;
  error_description: string;
  error_code: string;
  fields_error?: Record<string, string>;
}
