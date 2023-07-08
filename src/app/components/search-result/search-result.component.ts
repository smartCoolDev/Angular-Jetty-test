import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CombinedInfo } from 'src/app/models/combinedinfo.model';
import AddressService from 'src/app/services/address.service';
import EmployeeService from 'src/app/services/employee.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  combinedInfo: CombinedInfo = {
    firstName: '',
    lastName: '',
    streetAddress: '',
  };
  avatarSrcs = [
    'https://image.ibb.co/dUTfmJ/profile_img.jpg',
    'https://image.ibb.co/c9rY6J/profile02.jpg',
  ];
  constructor(
    private addressService: AddressService,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.selectedEmployeeID.subscribe((id) => {
      id &&
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
            console.log(combinedData);
            this.combinedInfo = {
              firstName,
              lastName,
              streetAddress,
            };
          });
    });
  }
}
