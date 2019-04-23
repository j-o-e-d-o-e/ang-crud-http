import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import {DataStorageService} from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataStorageService) {
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'API_KEY',
      authDomain: 'DOMAIN'
    });
    this.dataService.fetchData();
  }
}
