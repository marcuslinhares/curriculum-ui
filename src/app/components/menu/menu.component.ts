import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'menu-bar',
  standalone: true,
  imports: [Menubar, ButtonModule, FormsModule, InputTextModule, MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Início',
        icon: 'pi pi-home',
        routerLink: ['/']
      },

      {
        label: 'Relatórios',
        icon: 'pi pi-chart-bar',
        routerLink: ['/relatorios']
      },
    ];
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark');
    }
  }

  logout(){
    this.authService.logout();
  }
}
