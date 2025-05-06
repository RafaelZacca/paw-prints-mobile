import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalRecordCreationPage } from './medical-record-creation.page';

describe('MedicalRecordCreationPage', () => {
  let component: MedicalRecordCreationPage;
  let fixture: ComponentFixture<MedicalRecordCreationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
