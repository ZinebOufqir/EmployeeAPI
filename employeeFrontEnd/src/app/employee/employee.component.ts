import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  
  constructor(private employeeService: EmployeeService) { }

  employees!: Employee[] ;
  editEmployee: Employee;
  deleteEmployee: Employee;
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void{
    this.employeeService.getEmployees().subscribe((response: Employee[])=> { this.employees= response;}, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
}
searchEmployee(key: String): void{
  const results: Employee[] = [];
  for(const employee of this.employees){
    if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1){
          results.push(employee);
    }
  
  }
  console.log(results);
  this.employees = results;
  if(results.length == 0 || !key){
      this.getEmployees()
  }
}

onOpenModal(employee: Employee, mode: string): void{
  const container = document.getElementById('main-container');
  const button= document.createElement('button');
  button.setAttribute('type','button'); //button.type = 'button'
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  if(mode == 'add'){
    button.setAttribute('data-target','#addEmployeeModal');
  }
  if(mode=='edit'){
    button.setAttribute('data-target','#editEmployeeModal');
    this.editEmployee=employee;
  }
  if (mode == 'delete'){
    this.deleteEmployee= employee;
    button.setAttribute('data-target','#deleteEmployeeModal');
  }
  container!.appendChild(button);
  button.click();
}
onAddEmployee(addForm: NgForm): void{
  document.getElementById('add-employee-form').click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee)=>{
          console.log(response);
          this.getEmployees();
          addForm.reset();
      }
      ,
      (error: HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    );
    
}
onUpdateEmployee(employee: Employee): void{
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee)=>{
          console.log(response);
          this.getEmployees();
      }
      ,
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    
}
onDeleteEmployee(employeeID: number): void{
  this.employeeService.deleteEmployees(employeeID).subscribe(
    (response: void)=>{
        console.log(response);
        this.getEmployees();
    }
    ,
    (error: HttpErrorResponse)=>{
      alert(error.message);
    }
  );
  
}
}
