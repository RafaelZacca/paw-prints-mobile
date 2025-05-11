import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { PetImage } from '@models/pet-image.model';

@Injectable({
  providedIn: 'root',
})
export class PetImageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createPetImage(petId: number, base64Image: string): Observable<PetImage> {
    return this.http.post<PetImage>(`${this.apiUrl}/pet-images`, {
      petId,
      imageBase64: base64Image,
    });
  }
}
