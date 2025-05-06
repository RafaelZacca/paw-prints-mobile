import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { MedicalRecord } from '@models/medical-record.model'; // Adjust if needed

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createMedicalRecord(medicalRecordData: any): Observable<any> {
    return this.http.post<MedicalRecord>(`${this.apiUrl}/medical-records`, medicalRecordData);
  }
}
