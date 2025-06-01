import { CustomException } from '../exception/custom-exception';

export function customExceptionHandler(err: any): CustomException | void {
  if (err?.error && 'status' in err.error && 'error_description' in err.error && 'error_code' in err.error) {
    return err.error as CustomException;
  }

  return;
}
