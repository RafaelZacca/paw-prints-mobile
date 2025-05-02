import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      const token = params['token'];

      if (token) {
        await Storage.set({ key: 'access_token', value: token });

        // Redirect to Home
        this.router.navigateByUrl('/tabs/home');
      } else {
        console.error('No token found in callback');
        this.router.navigateByUrl('/login');
      }
    });
  }
}
