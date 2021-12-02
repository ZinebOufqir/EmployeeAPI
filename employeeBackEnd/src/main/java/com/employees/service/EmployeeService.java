package com.employees.service;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employees.exception.UserNotDFoundException;
import com.employees.model.Employee;
import com.employees.repo.EmployeeRepo;

@Service
public class EmployeeService {
		private final EmployeeRepo employeeRepo;

		@Autowired
		public EmployeeService(EmployeeRepo employeeRepo) {
			this.employeeRepo = employeeRepo;
		}
		
		public Employee addEmployee(Employee employee ) {
			employee.setCode(UUID.randomUUID().toString());
			return employeeRepo.save(employee);
		}
		
		public List<Employee> findAllEmployee(){
			return employeeRepo.findAll();
		}
		
		public Employee updateEmployee(Employee employee) {
			return employeeRepo.save(employee);
		}
		
		public Employee findEmployeeById(Long id) {
			return employeeRepo.findEmployeeById(id).orElseThrow(() -> new UserNotDFoundException("User by id "+id +"was not found."));
		}
		
		@Transactional
		public void deleteEmployee(Long id) {
			employeeRepo.deleteEmployeeById(id);
		}
}
