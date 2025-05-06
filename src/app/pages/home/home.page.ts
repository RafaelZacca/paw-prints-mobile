import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { PetTypes } from 'src/app/shared/enums/pet-types.enum';
import { getPetIcon } from 'src/app/shared/utils/pet.utils';
import { Router } from '@angular/router';
import { Pet } from '@models/pet.model';
import { PetService } from '@services/pet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon, CommonModule],
})
export class HomePage implements OnInit {
  pets: Pet[] = [];

  constructor(
    private petService: PetService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadPets();
  }

  ionViewWillEnter() {
    this.loadPets();
  }

  loadPets() {
    this.petService.getAllPets().subscribe({
      next: (pets) => {
        this.pets = pets;
      },
      error: (err) => {
        console.error('Error fetching pets', err);
      },
    });
  }

  addPet() {
    this.router.navigate(['/pet-creation']);
  }

  getPetIcon(type: PetTypes) {
    return getPetIcon(type);
  }

  goToPetDetails(petId: string) {
    this.router.navigate(['/pet-details', petId]);
  }

  getDefaultPetImage(pet: any): string {
    if (!pet?.images?.length) {
      return '/assets/images/default-pet.png'; // fallback if no images
    }

    const defaultImage = pet.images.find((img: any) => img.isDefault);
    return defaultImage?.imageBase64 || '/assets/images/default-pet.png';
  }
}
