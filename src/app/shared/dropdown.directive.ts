import {Directive, HostBinding, HostListener} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open')
  isOpen = false;

  constructor(private authService: AuthService) {
  }

  @HostListener('click')
  toggleOpen() {
    if (this.authService.isAuthenticated()) {
      this.isOpen = !this.isOpen;
    }
  }
}
