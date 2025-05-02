import { MedicalRecordTypes } from '@shared/enums/medical-record-types.enum';

export interface MedicalRecord {
  id: number;
  petId: number;
  title: string;
  type: MedicalRecordTypes;
  description: string;
  date: string;
  imageBase64?: string;
}
