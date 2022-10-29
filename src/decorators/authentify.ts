import { verifyToken } from 'src/common/auth.utils';

import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const Authentify = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization
        ? request.headers.authorization.split(' ')[1]
        : null;
      const payload = await verifyToken(token);

      console.log('payload', payload);

      if (!payload) {
        return null;
      }

      return payload;
    } catch (e) {
      console.log('e', e);
      return null;
    }
  },
);
