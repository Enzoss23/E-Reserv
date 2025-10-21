import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const cloned = req.clone({
            headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
          });
          return next(cloned);
        }
      ])
    )
  ]
}).catch(err => console.error(err));
 
