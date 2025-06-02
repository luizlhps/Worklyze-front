import { AuthService } from './../../_auth/_service/auth.service';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouteToNavigate } from '../../shared/enum/route-to-navigate-enum';
import { NavigationEnd, Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  routes: { name: string; path: string }[] = [];
  private authService = inject(AuthService);
  private router = inject(Router);

  RouteToNavigate = RouteToNavigate;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.isAuth().subscribe((result) => {
        if (result) {
          this.addRoutesAuthenticated();
          return;
        }

        this.addRoutesUnauthenticated();
      });
    }
  }

  redirectRoot() {
    this.router.navigate([RouteToNavigate.ROOT]);
  }

  private addRoutesAuthenticated() {
    this.routes = [];

    this.routes.push({ name: 'Início', path: '/' + RouteToNavigate.ROOT });
    this.routes.push({ name: 'Tarefas', path: '/' + RouteToNavigate.TASKS });
    this.routes.push({ name: 'Demandas', path: '/' + RouteToNavigate.DEMANDS });
    this.routes.push({ name: 'Histórico', path: '/' + RouteToNavigate.HISTORIC });
  }

  private addRoutesUnauthenticated() {
    this.routes = [];

    this.routes.push({ name: 'Login', path: '/' + RouteToNavigate.LOGIN });
    this.routes.push({ name: 'Register', path: '/' + RouteToNavigate.REGISTER });
  }
}
