import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Collection } from 'mongoose';

@Schema(
  { collection:'users', versionKey: false}
)
export class Users extends Document {
  @Prop()
  studentName: string;
}


export const UsersSchema = SchemaFactory.createForClass(Users);
