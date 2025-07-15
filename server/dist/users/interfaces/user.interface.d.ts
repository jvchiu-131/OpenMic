import { Document } from 'mongoose';
export interface User extends Document {
    _id: string;
    email: string;
    username: string;
    role: 'musician' | 'client';
    profileCompleted?: boolean;
    createdAt?: string;
    [key: string]: any;
}
