import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../website_pages/header/header.component';
import { FooterComponent } from '../../website_pages/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-website-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './website-layout.component.html',
  styleUrl: './website-layout.component.css'
})
export class WebsiteLayoutComponent {
  router = inject(Router)
  constructor() {
    this.router.navigateByUrl('/home')
  }
}
