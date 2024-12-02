import { Schema, model, Document } from 'mongoose';
import { decryptDeterministic, encryptDeterministic } from '../../../shared/crypto';

export interface ICompany extends Document {
  username: string;
  password: string;
  associationId: string;
  validated: boolean;
  token?: string;
  tokenExpiration?: Date; 
}

const CompanySchema = new Schema<ICompany>({
  username: { 
    type: String, 
    required: true
  },
  password: { 
    type: String, 
    required: true
  },
  associationId: { 
    type: String, 
    required: true
  },
  validated: { 
    type: Boolean, 
    default: false 
  },
  token: { 
    type: String
  },
  tokenExpiration: { 
    type: Date
  }
});

export const Company = model<ICompany>("Company", CompanySchema);
