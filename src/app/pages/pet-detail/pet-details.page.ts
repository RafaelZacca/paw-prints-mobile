import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Pet } from '@models/pet.model';
import { PetImage } from '@models/pet-image.model';
import { PetService } from '@services/pet.service';
import { PetTypes } from '@shared/enums/pet-types.enum';
import { getPetIcon } from '@shared/utils/pet.utils';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.page.html',
  styleUrls: ['./pet-details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class PetDetailsPage implements OnInit {
  petId: string | null = null;
  pet: Pet | null = null;
  mainImage: string = '';
  petAge: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get('id');

    if (this.petId) {
      this.fetchPetDetails(this.petId);
    } else {
      console.error('Pet ID not found');
    }
  }

  ionViewWillEnter() {
    if (this.petId) {
      this.fetchPetDetails(this.petId);
    } else {
      console.error('Pet ID not found');
    }
  }

  fetchPetDetails(id: string) {
    this.petService.getPetById(id).subscribe({
      next: (pet) => {
        console.log('Fetched pet details:', pet);
        this.pet = pet;
        this.mainImage =
          pet.images.find((img) => img.isDefault)?.imageBase64 || '/assets/images/default-pet.png';
        console.log('Main image:', this.mainImage);
        this.petAge = this.calculateAge(pet.birthDate);
      },
      error: (err) => {
        console.error('Error fetching pet', err);
      },
    });
  }

  private calculateAge(birthDateString: string): string {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    const diffYears = today.getFullYear() - birthDate.getFullYear();
    const diffMonths = today.getMonth() - birthDate.getMonth();

    if (diffYears > 0) {
      return `${diffYears} año${diffYears > 1 ? 's' : ''}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    } else {
      return 'Recién nacido';
    }
  }

  getPetIcon(type: PetTypes) {
    return getPetIcon(type);
  }

  addNewMedicalRecord() {
    this.router.navigate(['/pet-details', this.petId, 'medical-record-creation']);
  }

  goBack() {
    this.router.navigate(['/tabs/home']);
  }
}
