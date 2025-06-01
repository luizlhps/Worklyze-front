import { customExceptionHandler } from './custom-exception-handler';

export const genericErrorHandler = (err: any, showError: (error: string) => void) => {
  const customException = customExceptionHandler(err);

  if (customException) {
    if (customException.fields_error) {
      const firstKey = Object.keys(customException.fields_error)[0];
      const mensagem = customException.fields_error[firstKey];

      showError(firstKey.toUpperCase() + ': ' + mensagem);
      return;
    }

    showError(customException.error_description);

    return;
  }

  showError('Ocorreu um erro, tente novamente mais tarde');
};
