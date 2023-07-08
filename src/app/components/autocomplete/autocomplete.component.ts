import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import EmployeeService from 'src/app/services/employee.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl<string | Employee>('');
  options: Employee[] = [];
  filteredOptions: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((res) => (this.options = res.data.employees));
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(400),
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.firstName;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(user: Employee): string {
    return user && user.firstName ? user.firstName + ' ' + user.lastName : '';
  }

  onEmployee(employee: Employee) {
    this.employeeService.selectedEmployeeID.next(employee.id);
  }

  private _filter(name: string): Employee[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.firstName.toLowerCase().includes(filterValue)
    );
  }

  resetFilter() {
    this.employeeService.selectedEmployeeID.next(0);
  }
}
