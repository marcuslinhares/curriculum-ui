import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/menu/menu.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
