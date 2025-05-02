import { Component } from '@angular/core';
import { FullscreenLoaderComponent } from '@components/fullscreen-loader/fullscreen-loader.component';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, FullscreenLoaderComponent, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
