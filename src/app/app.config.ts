import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { PrimeNG, providePrimeNG } from 'primeng/config';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import localePtBr from '@angular/common/locales/pt';
import { routes } from './app.routes';
import { MyPreset } from './theme/theme';
import { authInterceptor } from './_auth/interceptors/auth.interceptor';

registerLocaleData(localePtBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    {
      provide: PrimeNG,
      useFactory: () => {
        const config = new PrimeNG();

        config.setTranslation({
          startsWith: 'Começa com',
          contains: 'Contém',
          notContains: 'Não contém',
          endsWith: 'Termina com',
          equals: 'Igual a',
          notEquals: 'Diferente de',
          noFilter: 'Sem filtro',
          lt: 'Menor que',
          lte: 'Menor ou igual a',
          gt: 'Maior que',
          gte: 'Maior ou igual a',
          is: 'É',
          isNot: 'Não é',
          before: 'Antes',
          after: 'Depois',
          dateIs: 'Data é',
          dateIsNot: 'Data não é',
          dateBefore: 'Data antes de',
          dateAfter: 'Data depois de',
          clear: 'Limpar',
          apply: 'Aplicar',
          matchAll: 'Corresponder a todos',
          matchAny: 'Corresponder a qualquer',
          addRule: 'Adicionar regra',
          removeRule: 'Remover regra',
          accept: 'Aceitar',
          reject: 'Rejeitar',
          choose: 'Escolher',
          upload: 'Enviar',
          cancel: 'Cancelar',
          fileSizeTypes: ['B', 'KB', 'MB', 'GB'],
          dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
          monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          today: 'Hoje',
          dateFormat: 'dd/mm/yy',
          firstDayOfWeek: 0,
          weekHeader: 'Sem',
          weak: 'Fraco',
          medium: 'Médio',
          strong: 'Forte',
          passwordPrompt: 'Digite uma senha',
          emptyMessage: 'Nenhum resultado encontrado',
          emptyFilterMessage: 'Nenhum resultado encontrado',
          pending: 'A processar',
          chooseYear: 'Escolher ano',
          chooseMonth: 'Escolher mês',
          chooseDate: 'Escolher data',
          prevDecade: 'Década anterior',
          nextDecade: 'Próxima década',
          prevYear: 'Ano anterior',
          nextYear: 'Próximo ano',
          prevMonth: 'Mês anterior',
          nextMonth: 'Próximo mês',
          prevHour: 'Hora anterior',
          nextHour: 'Próxima hora',
          prevMinute: 'Minuto anterior',
          nextMinute: 'Próximo minuto',
          prevSecond: 'Segundo anterior',
          nextSecond: 'Próximo segundo',
          am: 'AM',
          pm: 'PM',
          searchMessage: 'Foram encontrados {0} resultados',
          selectionMessage: '{0} itens selecionados',
          emptySelectionMessage: 'Nenhum item selecionado',
          emptySearchMessage: 'Nenhum resultado encontrado',
          aria: {
            trueLabel: 'Verdadeiro',
            falseLabel: 'Falso',
            nullLabel: 'Nenhum selecionado',
            star: '1 estrela',
            stars: '{star} estrelas',
            selectAll: 'Selecionar todos',
            unselectAll: 'Desmarcar todos',
            close: 'Fechar',
            previous: 'Anterior',
            next: 'Próximo',
            navigation: 'Navegação',
            scrollTop: 'Rolar para o topo',
            moveTop: 'Mover para o topo',
            moveUp: 'Mover para cima',
            moveDown: 'Mover para baixo',
            moveBottom: 'Mover para o fim',
          },
        });

        return config;
      },
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
  ],
};
