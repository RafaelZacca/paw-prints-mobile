import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PetTypes } from '@shared/enums/pet-types.enum';
import { PetService } from '@services/pet.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PetGenders } from '@shared/enums/pet-genders.enum';
import { getPetIcon } from '@shared/utils/pet.utils';
import { IonModal } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { UserService } from '@services/user.service';
import { CreatePetDto } from '@shared/dtos/create-pet.dto';

@Component({
  selector: 'app-pet-creation',
  templateUrl: './pet-creation.page.html',
  styleUrls: ['./pet-creation.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class PetCreationPage {
  @ViewChild('birthDateModal') birthDateModal!: IonModal;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  showBirthDateModal = false;
  pet = {
    name: '',
    birthDate: '',
    location: '',
    gender: '',
    breed: '',
    description: '',
  };
  petTypes = Object.values(PetTypes).map((petType) => {
    const petIcon = getPetIcon(petType);

    return {
      label: this.capitalizePetType(petType),
      value: petType,
      icon: petIcon.value,
      iconType: petIcon.type,
    };
  });

  private capitalizePetType(petType: string): string {
    switch (petType) {
      case PetTypes.DOG:
        return 'Perro';
      case PetTypes.CAT:
        return 'Gato';
      case PetTypes.BIRD:
        return 'Pájaro';
      case PetTypes.REPTILE:
        return 'Reptil';
      case PetTypes.FISH:
        return 'Pez';
      case PetTypes.RODENT:
        return 'Roedor';
      case PetTypes.HORSE:
        return 'Caballo';
      case PetTypes.COW:
        return 'Vaca';
      case PetTypes.SHEEP:
        return 'Oveja';
      case PetTypes.GOAT:
        return 'Cabra';
      case PetTypes.PIG:
        return 'Cerdo';
      default:
        return petType;
    }
  }
  genderTypes = [
    { label: 'Hembra', value: PetGenders.FEMALE, icon: 'female-outline' },
    { label: 'Macho', value: PetGenders.MALE, icon: 'male-outline' },
  ];

  selectedType: string | null = null;
  uploadedImages: string[] = [];
  selectedDefaultImage = 'assets/images/default-pet.png';

  constructor(
    private petService: PetService,
    private router: Router,
    private location: Location,
    private userService: UserService,
  ) {}

  selectPetType(type: string) {
    this.selectedType = type;
  }

  selectGender(gender: PetGenders) {
    this.pet.gender = gender;
  }

  async uploadPhoto() {
    if (Capacitor.getPlatform() === 'web') {
      // We are running on a browser — fallback to file input
      this.triggerFileInput();
    } else {
      // Normal device (iOS/Android)
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
      });

      if (image.base64String) {
        this.uploadedImages.push(`data:image/jpeg;base64,${image.base64String}`);
      }
    }
  }

  cancel() {
    this.pet = {
      name: '',
      birthDate: '',
      location: '',
      gender: '',
      breed: '',
      description: '',
    };
    this.selectedType = null;
    this.uploadedImages = [];
  }

  submitPet() {
    this.userService.getProfile().subscribe({
      next: (user) => {
        if (!user) {
          console.error('User not found');
          return;
        }

        const petPayload: CreatePetDto = {
          ...this.pet,
          type: this.selectedType,
          userId: user.id,
        };

        this.petService.createPetWithImages(petPayload, this.uploadedImages).subscribe({
          next: (createdPet) => {
            console.log('Pet and images created!', createdPet);
            this.router.navigate(['/tabs/home']);
          },
          error: (error) => {
            console.error('Error creating pet and images', error);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching user profile', err);
      },
    });
  }

  openDatePicker() {
    this.showBirthDateModal = true;
  }

  onBirthDateSelected() {
    this.showBirthDateModal = false;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.uploadedImages.push(base64);
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.location.back();
  }
}
