import { SetMetadata } from '@nestjs/common';

export const SKIP = 'isSkipped';
export const SkipInterceptor = () => SetMetadata(SKIP, true);