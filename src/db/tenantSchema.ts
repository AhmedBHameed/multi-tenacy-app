import {Document, Schema, model} from 'mongoose';

export interface TenantModel {
  id: string;
  name: string;
  email: string;
  createdAt: String;
  updatedAt: string;
}

export interface TenantDocument extends Omit<TenantModel, 'id'>, Document {}

const TenantSchema = new Schema(
  {
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
  },
  {timestamps: true}
);

TenantSchema.pre<TenantDocument>('save', function (this, next) {
  if (!this.createdAt) {
    this.createdAt = new Date().toISOString();
  }
  this.updatedAt = new Date().toISOString();
  next();
});

export default TenantSchema;
