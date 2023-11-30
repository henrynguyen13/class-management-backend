import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from '../common.interface';

export const LoginUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
