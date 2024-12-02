import { Schema, model, Document } from "mongoose";

export interface IToken extends Document {
  token: string;
  associationId: string;
  expirationDate: Date;
}

const TokenSchema = new Schema<IToken>({
  token: { type: String, required: true },
  associationId: { type: String, required: true },
  expirationDate: { type: Date, required: true },
});

export const Token = model<IToken>("Token", TokenSchema);
