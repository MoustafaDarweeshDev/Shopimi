import { Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatBadge} from '@angular/material/badge';
import {MatButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { BusyService } from '../../Core/Services/busy.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatBadge,
    MatButton,
    RouterLink,
    RouterModule,
    RouterLinkActive,
    MatProgressBar
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  busyService = inject(BusyService);

  constructor(){
    console.log('from inter ',this.busyService.loading);

  }
}
