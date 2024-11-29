import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

@Schema({ timestamps: true })
export class Event extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop()
    location: string;

    @Prop({ default: 0 })
    participants: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: () => User }] })
    users: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);