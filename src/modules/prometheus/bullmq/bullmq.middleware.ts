// import { Queue } from 'bullmq';
// const promClient = require('prom-client');

// // import {
// // 	defaultQueue,
// // 	eventViewQueue,
// // 	addFirstFormQueue,
// // 	updateFormQueue,
// // 	updateFlowStepQueue,
// // 	updateIndirectPageQueue,
// // 	updateYesterdayFlowStepQueue,
// // 	updateYesterdayIndirectPageQueue,
// // 	scheduleRenewalSubscription,
// // 	renewalSubscriptionSendInvoiceQueue,
// // 	renewalSubscriptionPaymentQueue,
// // 	gracePeriodSubscriptionQueue,
// // 	backupEventViewQueue,
// // 	backupEventFormQueue,
// // 	sendEmailQueue,
// // 	expiredSubscriptionQueue,
// // } from '../queue/Config';

// /**
//  * BullMQ Prometheus Metrics Utility
//  * Collects and exports Prometheus metrics from all BullMQ queues
//  */
// export class BullMQMetrics {
// 	/**
// 	 * Get all queues that should be monitored
// 	 */

// 	private static queueGauge = new promClient.Gauge({
// 		name: 'bullmq_queue_jobs_total',
// 		help: 'Number of jobs in BullMQ queue by status',
// 		labelNames: ['queue', 'status']
// 	});

// 	private static getAllQueues(): Queue[] {
// 		return [
// 			// defaultQueue,
// 			// eventViewQueue,
// 			// addFirstFormQueue,
// 			// updateFormQueue,
// 			// updateFlowStepQueue,
// 			// updateIndirectPageQueue,
// 			// updateYesterdayFlowStepQueue,
// 			// updateYesterdayIndirectPageQueue,
// 			// scheduleRenewalSubscription,
// 			// renewalSubscriptionSendInvoiceQueue,
// 			// renewalSubscriptionPaymentQueue,
// 			// gracePeriodSubscriptionQueue,
// 			// backupEventViewQueue,
// 			// backupEventFormQueue,
// 			// sendEmailQueue,
// 			// expiredSubscriptionQueue,
// 		];
// 	}

// 	static async updateAllMetricsInRegistry(): Promise<void> {
// 		const queues = this.getAllQueues();

// 		await Promise.all(queues.map(async (queue) => {
// 			try {
// 				// Fetch counts from Redis
// 				const counts = await queue.getJobCounts();

// 				// Update registry values for this specific queue
// 				Object.entries(counts).forEach(([status, count]) => {
// 					this.queueGauge.set({ queue: queue.name, status }, count);
// 				});
// 			} catch (error) {
// 				console.error(`Error updating registry for queue ${queue.name}:`, error);
// 			}
// 		}));
// 	}
// }

// export const bullMQMetricsMiddleware = async (req: any, res: any, next: any) => {
// 	try {
// 		await BullMQMetrics.updateAllMetricsInRegistry();
// 		res.set('Content-Type', promClient.register.contentType);

// 		next();
// 	} catch (error: any) {
// 		console.error('Error in BullMQ metrics middleware:', error);
// 		next();
// 	}
// }