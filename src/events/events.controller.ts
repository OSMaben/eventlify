import { Controller, Get, Post, Body, Param, Delete, Patch,UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {JwtAuthGuard} from "../Guards/jwt-auth.guard";
import {JwtValidator} from "../Middlewares/jwt.validator";
import {CreateUserDto} from "../users/dto/create-user.dto";



@Controller('events')
@UseGuards(JwtAuthGuard, JwtValidator)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, JwtValidator)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, JwtValidator)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }





  @Post(':id/participants')
  @UseGuards(JwtAuthGuard, JwtValidator)
  addParticipant(@Param('id') eventId: string, @Body() createUserDto: CreateUserDto) {
    return this.eventsService.addParticepants(eventId,createUserDto);
  }

  @Post('RemoveParticipants')
  removeParticipantsFromEvent(@Body('id') eventId: string, participantId: string) {
    return this.eventsService.removeParticipantsFromEvent(eventId, participantId);
  }
}
