import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetCreationPage } from './pet-creation.page';

describe('PetCreationPage', () => {
  let component: PetCreationPage;
  let fixture: ComponentFixture<PetCreationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
