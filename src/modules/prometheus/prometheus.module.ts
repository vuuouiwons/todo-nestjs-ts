import { Module } from '@nestjs/common';
import { ExpressMetricsMiddleware } from './express/express.service';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';

@Module({
  providers: [ExpressMetricsMiddleware],
})
export class PrometheusMetricModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExpressMetricsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
