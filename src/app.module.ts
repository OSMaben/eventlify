import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { EventsModule } from './events/events.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/eventlify',{}),
      AuthModule,
      UsersModule,
      EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



//@UseGuards(JwtAuthGuard) to protect routes