import { PetTypes } from '@shared/enums/pet-types.enum';
import { MedicalRecord } from './medical-record.model';
import { PetGenders } from '@shared/enums/pet-genders.enum';
import { PetImage } from './pet-image.model';

export interface Pet {
  id: string;
  name: string;
  description: string;
  type: PetTypes;
  breed: string;
  birthDate: string;
  gender: PetGenders;
  location: string;
  images: PetImage[];
  medicalRecords: MedicalRecord[];
}
