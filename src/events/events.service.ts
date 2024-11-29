import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import { Event } from './events.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const newEvent = new this.eventModel(createEventDto);
      return newEvent.save();
    } catch (error) {
      throw new error;
    }

  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    try {

      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException(`Invalid ID format: ${id}`);
      }

      const event = await this.eventModel.findById(id).exec();

      if (!event) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }

      return event;
    } catch (error) {
      console.error(`Error in findOne: ${error.message}`);
      throw error;
    }
  }


  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    try {
      const updatedEvent = await this.eventModel
          .findByIdAndUpdate(id, updateEventDto, {new: true})
          .exec();
      if (!updatedEvent) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      return updatedEvent;
    } catch (error) {
      throw new error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.eventModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }


  async addParticepants(eventId: string, createUserDto: CreateUserDto): Promise<Event> {
    try {
      const event = await this.eventModel.findById(eventId).exec();
      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const userId = new Types.ObjectId(createUserDto.userId);

      if (event.users.includes(userId)) {
        throw new HttpException('User is already a participant of this event', 400);
      }

      if (event.users.length >= event.participants) {
        throw new HttpException('The event has reached the maximum number of participants', 400);
      }

      event.users.push(userId);
      await event.save();

      return event;

    } catch (error) {
      throw  error;
    }
  }




  async removeParticipantsFromEvent(eventId: string, eventParticipant: string): Promise<Event> {
    try {
      const participantObjectId = new Types.ObjectId(eventParticipant);

      const updatedEvent = await this.eventModel.findByIdAndUpdate(
          eventId,
          { $pull: { users: participantObjectId } }, // Ensure the type matches
          { new: true } // Return the updated document
      ).exec();

      if (!updatedEvent) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      return updatedEvent;
    } catch (error) {
      throw error;
    }
  }
}
