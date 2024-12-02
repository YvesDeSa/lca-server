import { Schema, model, Document } from "mongoose";
import { decryptDeterministic, encryptDeterministic } from "../../../shared/crypto";

export interface IUser extends Document {
  username: string;
  password: string;
  role: "root" | "association_global" | "technician_general" | "association" | "technician_association";
}

const UserSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["root", "association_global", "technician_general", "association", "technician_association"], 
    required: true
  },
});

export const User = model<IUser>("User", UserSchema);
