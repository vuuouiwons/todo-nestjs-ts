import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

@Module({
    imports: [
        BullModule.registerQueue({ name: 'email' }),
        BullBoardModule.forFeature({
            name: 'email',
            adapter: BullMQAdapter,
        })
    ],
})
export class EmailModule { }
