import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Gunakan inject(AuthService) seperti yang anda buat
  private auth = inject(AuthService);

  async handleAuth() {
    try {
      // Memanggil fungsi login dari service
      const response = await this.auth.signInWithGoogle();
      console.log('Login response:', response);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
}