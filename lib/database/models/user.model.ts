import { model, models, Schema } from "mongoose";

// interface --> schema --> model

export interface IUser extends Document {
    firstName?: string;
    lastName?: string;
    username: string;
    email: string;
    photo: string;
    clerkId: string;
    planId?: number;
    creditBalance?: number;
}


const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    clerkId: { type: String, required: true, unique: true },
    planId: { type: Number, default: 1 },
    creditBalance: { type: Number, default: 10 },
});

const User = models?.User || model('User', UserSchema);

export default User;