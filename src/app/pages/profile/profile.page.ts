import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { Storage } from '@capacitor/storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, CommonModule],
})
export class ProfilePage {
  public user: User | undefined = undefined;
  public defaultAvatar = 'assets/default-avatar.png';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Failed to load profile', error);
        this.logout();
      },
    });
  }

  async logout() {
    await Storage.remove({ key: 'access_token' });
    window.location.href = '/login';
  }
}
