import { ExecutionContext, createParamDecorator } from '@nestjs/common';
export interface UserInfo {
  id: number;
  userType: string;
  iat: number;
  exp: number;
}
export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
