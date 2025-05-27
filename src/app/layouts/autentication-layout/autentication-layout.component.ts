import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'autentication-layout',
  standalone: true,
  imports: [ButtonModule, FooterComponent],
  templateUrl: './autentication-layout.component.html',
  styleUrl: './autentication-layout.component.css'
})
export class AutenticationLayoutComponent {

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark');
    }
  }
}
