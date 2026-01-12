import { Injectable } from '@nestjs/common';
const promClient = require('prom-client');

@Injectable()
export class AppService {
    handleHealth() {
        return {
            'status': 'OK'
        };
    }

    async handleMetrics() {
        const metrics = await promClient.register.metrics();
        return metrics;
    }
}
