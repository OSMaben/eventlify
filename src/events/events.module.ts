import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {EventSchema} from "./events.schema";

@Module({

  imports: [
    MongooseModule.forFeature([{name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
