import bcrypt from 'bcryptjs';

export async function encryptData(data: string): Promise<string> {
  const saltRounds = 8;
  const hashedData = await bcrypt.hash(data, saltRounds);
  return hashedData;
}

export async function compareData(data: string, hashedData: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(data, hashedData);
  return isMatch;
}
