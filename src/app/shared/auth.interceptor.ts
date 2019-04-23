import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedReq = req.clone();
    if (req.method === 'PUT') {
      const token = this.authService.getToken();
      clonedReq = req.clone({params: req.params.append('auth', token)});
    }
    console.log('Auth Interceptor', clonedReq);
    return next.handle(clonedReq);
  }
}
