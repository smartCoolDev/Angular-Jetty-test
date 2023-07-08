import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CombinedInfo } from 'src/app/models/combinedinfo.model';
import { Employee } from 'src/app/models/employee.model';
import AddressService from 'src/app/services/address.service';
import EmployeeService from 'src/app/services/employee.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  combinedInfo: CombinedInfo = {
    firstName: '',
    lastName: '',
    streetAddress: '',
  };
  breakpoint: number = 1;
  employees: Employee[] = [];
  avatarSrcs = [
    'https://image.ibb.co/dUTfmJ/profile_img.jpg',
    'https://image.ibb.co/c9rY6J/profile02.jpg',
  ];
  constructor(
    private addressService: AddressService,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 480 ? 1 : 3;
    this.employeeService
      .getEmployees()
      .subscribe((res) => (this.employees = res.data.employees));
  }

  onResize(event: any) {
    let { innerWidth } = event.target;
    if (innerWidth <= 480) this.breakpoint = 1;
    else if (innerWidth > 480 && innerWidth <= 768) this.breakpoint = 2;
    else if (innerWidth > 768) this.breakpoint = 3;
  }

  handleMouseOver(id: number) {
    forkJoin([
      this.addressService.getAddressByID(id),
      this.employeeService.getEmployeeByID(id),
    ])
      .pipe(
        map(([address, employee]) => {
          const combinedData = {
            address: address,
            employee: employee,
          };
          return combinedData;
        })
      )
      .subscribe((combinedData) => {
        let { firstName, lastName } = combinedData.employee[0];
        let { streetAddress } = combinedData.address[0];
        this.combinedInfo = {
          firstName,
          lastName,
          streetAddress,
        };
      });
  }
}
