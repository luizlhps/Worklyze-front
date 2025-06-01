import { TypeProviderEnum } from '../../shared/enum/type-provider-enum';

export interface TokenAuth {
  iat: number;
  exp: number;
  sub: string;
  provider: TypeProviderEnum;
}
