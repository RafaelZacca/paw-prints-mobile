import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSpinner } from '@ionic/angular/standalone';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-fullscreen-loader',
  templateUrl: './fullscreen-loader.component.html',
  styleUrls: ['./fullscreen-loader.component.scss'],
  standalone: true,
  imports: [CommonModule, IonSpinner],
})
export class FullscreenLoaderComponent {
  public isLoading$ = this.loaderService.isLoading$;

  constructor(private loaderService: LoaderService) {}
}
