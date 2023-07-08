import { Component, OnInit, Input } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CombinedInfo } from 'src/app/models/combinedinfo.model';
import AddressService from 'src/app/services/address.service';
import EmployeeService from 'src/app/services/employee.service';

@Component({
  selector: 'app-shared-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class SharedCardComponent implements OnInit {
  @Input() combinedInfo: CombinedInfo = {
    firstName: '',
    lastName: '',
    streetAddress: '',
  };
  @Input() avatar: string = '';

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
