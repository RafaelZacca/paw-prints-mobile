import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet.model';
import { environment } from '../../../environments/environment';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { PetImageService } from './pet-image.service';
import { CreatePetDto } from '../../shared/dtos/create-pet.dto';

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

  createPet(petData: CreatePetDto): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}/pets`, petData);
  }

  createPetWithImages(petData: CreatePetDto, images: string[]): Observable<Pet> {
    return this.createPet(petData).pipe(
      switchMap((createdPet: Pet) => {
        if (images.length === 0) {
          return of(createdPet);
        }

        const uploadTasks = images.map((imageBase64) =>
          this.petImagesService.createPetImage(Number(createdPet.id), imageBase64),
        );

        return forkJoin(uploadTasks).pipe(map(() => createdPet));
      }),
    );
  }
}
