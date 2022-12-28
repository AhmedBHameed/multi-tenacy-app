import {Document, Schema, model} from 'mongoose';

export interface EmployeeModel {
    id: string,
    name: string;
    companyName: string;
    createdAt: String,
    updatedAt: string
}

export interface EmployeeDocument extends Omit<EmployeeModel, "id">, Document {}


const EmployeeSchema = new Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, default: ""},
    companyName: {type: String, default: ""},
}, {timestamps: true})

EmployeeSchema.pre<EmployeeDocument>("save", function(this, next) {
    if(!this.createdAt) {
        this.createdAt = new Date().toISOString();
    }
    this.updatedAt = new Date().toISOString();
    next();
})


export default EmployeeSchema