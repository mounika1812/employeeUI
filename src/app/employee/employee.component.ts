import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees: any = [];
  closeResult;
  workDays;
  vacation;
  selectedEmployee;
  hasError : boolean = false;
  error;
  action : boolean = true;
  showWorkLog : boolean = false;
  showTakeVacation : boolean = false;
  constructor(private employeeService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
    });
  }

  workLogMethod(id: number): void {
    this.selectedEmployee = id;
    this.action = false;
    this.showWorkLog = true;
    this.showTakeVacation = false;
  }

  takeVacationMethod(id: number): void {
    this.selectedEmployee = id;
    this.action = false;
    this.showWorkLog = false;
    this.showTakeVacation = true;
  }

  cancle() {
    this.workDays = 0;
    this.vacation = 0;
    this.action = true;
    this.showWorkLog = false;
    this.showTakeVacation = false;
  }

  saveWorkLog(id: number) {
    this.employeeService.workLog(id, this.workDays).subscribe(data => {
      this.cancle();
      this.getAllEmployee();
      this.hasError = false;
    }, err => {
      this.hasError = true;
      this.error = "Error while updating work log";
    });

  }

  saveVacation(id: number) {
    this.employeeService.takeVacation(id, this.vacation).subscribe(data => {
      this.getAllEmployee();
      this.hasError = false;
    }, err => {
      this.hasError = true;
      this.error = "Error while taking vacation";
    });
    this.cancle();
  }

}
