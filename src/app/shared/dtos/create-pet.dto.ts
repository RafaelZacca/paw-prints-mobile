export type CreatePetDto = {
  type: string | null;
  userId: string;
  name: string;
  birthDate: string;
  location: string;
  gender: string;
  breed: string;
  description: string;
};
