import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonModal } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { MedicalRecordTypes } from '@shared/enums/medical-record-types.enum';
import { MedicalRecordService } from '@services/medical-record.service';
import { CreateMedicalRecordDto } from '@shared/dtos/create-medical-record.dto';

@Component({
  selector: 'app-medical-record-creation',
  templateUrl: './medical-record-creation.page.html',
  styleUrls: ['./medical-record-creation.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class MedicalRecordCreationPage {
  @ViewChild('birthDateModal') dateModal!: IonModal;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  petId: string | null = null;
  showDateModal = false;
  medicalRecord = {
    title: '',
    description: '',
    date: '',
  };
  medicalRecordTypes = [
    { label: 'Vacuna', value: MedicalRecordTypes.VACCINE, icon: 'medkit-outline' },
    { label: 'Chequeo', value: MedicalRecordTypes.CHECKUP, icon: 'search-outline' },
    { label: 'Cirugía', value: MedicalRecordTypes.SURGERY, icon: 'bandage-outline' },
  ];

  selectedMedicalType: MedicalRecordTypes | null = null;

  uploadedImage: string = '';

  constructor(
    private location: Location,
    private medicalRecordService: MedicalRecordService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get('id');
  }

  selectMedicalType(type: MedicalRecordTypes) {
    this.selectedMedicalType = type;
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
        this.uploadedImage = `data:image/jpeg;base64,${image.base64String}`;
      }
    }
  }

  cancel() {
    this.medicalRecord = {
      title: '',
      description: '',
      date: '',
    };
    this.selectedMedicalType = null;
    this.uploadedImage = '';
  }

  submitMedicalRecord() {
    const medicalRecordPayload: CreateMedicalRecordDto = {
      ...this.medicalRecord,
      type: this.selectedMedicalType,
      imageBase64: this.uploadedImage,
      petId: this.petId,
    };

    this.medicalRecordService.createMedicalRecord(medicalRecordPayload).subscribe({
      next: (createdRecord) => {
        console.log('Medical Record created:', createdRecord);
        this.router.navigate(['/pet-details', this.petId], { state: { reload: true } });
      },
      error: (err) => {
        console.error('Error creating medical record', err);
      },
    });
  }

  openDatePicker() {
    this.showDateModal = true;
  }

  onDateSelected() {
    this.showDateModal = false;
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
        this.uploadedImage = base64;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.location.back();
  }
}
