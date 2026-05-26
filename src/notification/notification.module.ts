import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';

@Module({
    imports: [
        BullModule.registerQueue({ name: 'notification' }),
        BullBoardModule.forFeature({
            name: 'notification',
            adapter: BullMQAdapter,
        })
    ],
})
export class NotificationModule { }
