import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet.model';
import { environment } from '../../../environments/environment';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { PetImageService } from './pet-image.service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private petImagesService: PetImageService,
  ) {}

  getPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/pets/${id}`);
  }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/pets`);
  }

  createPet(petData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pets`, petData);
  }

  createPetWithImages(petData: any, images: string[]): Observable<any> {
    return this.createPet(petData).pipe(
      switchMap((createdPet: any) => {
        const imageUploads = images.map((imageBase64) =>
          this.petImagesService.createPetImage(createdPet.id, imageBase64),
        );
        if (imageUploads.length === 0) {
          return of(createdPet);
        }
        return forkJoin(imageUploads).pipe(switchMap(() => of(createdPet)));
      }),
    );
  }
}
