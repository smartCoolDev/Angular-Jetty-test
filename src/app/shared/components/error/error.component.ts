import { Component, OnInit } from '@angular/core';
import ErrorService from 'src/app/services/error.service';

@Component({
  selector: 'app-shared-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class SharedErrorComponent implements OnInit {
  constructor(public errorService: ErrorService) {}

  ngOnInit(): void {}
}
