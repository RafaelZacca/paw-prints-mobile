import { PetTypes } from '../enums/pet-types.enum';

export function getPetIcon(petType: PetTypes): { type: 'ionicon' | 'custom'; value: string } {
  const petTypeToIconMap: Record<PetTypes, { type: 'ionicon' | 'custom'; value: string }> = {
    [PetTypes.DOG]: { type: 'custom', value: 'assets/icons/dog.png' },
    [PetTypes.CAT]: { type: 'custom', value: 'assets/icons/cat.svg' },
    [PetTypes.BIRD]: { type: 'ionicon', value: 'egg-outline' },
    [PetTypes.REPTILE]: { type: 'custom', value: 'assets/icons/turtle.svg' },
    [PetTypes.FISH]: { type: 'ionicon', value: 'fish-outline' },
    [PetTypes.RODENT]: { type: 'ionicon', value: 'paw-outline' },
    [PetTypes.HORSE]: { type: 'custom', value: 'assets/icons/horse.png' },
    [PetTypes.COW]: { type: 'ionicon', value: 'leaf-outline' },
    [PetTypes.SHEEP]: { type: 'ionicon', value: 'cloudy-outline' },
    [PetTypes.GOAT]: { type: 'custom', value: 'assets/icons/goat.png' },
    [PetTypes.PIG]: { type: 'custom', value: 'assets/icons/pig.png' },
  };

  return petTypeToIconMap[petType] || { type: 'ionicon', value: 'help-outline' };
}
