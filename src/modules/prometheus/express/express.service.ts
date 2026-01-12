import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { expressMetricsMiddleware } from './express.middleware';

@Injectable()
export class ExpressMetricsMiddleware implements NestMiddleware {
    private readonly metricsMiddleware = expressMetricsMiddleware;

    use(req: Request, res: Response, next: NextFunction) {
        this.metricsMiddleware(req, res, next);
    }
}