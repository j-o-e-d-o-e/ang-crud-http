import {Component} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private dataService: DataStorageService, private authService: AuthService) {
  }

  onSaveData() {
    this.dataService.saveData().subscribe((response: Response) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.dataService.fetchData();
  }

  onLogOut() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
