package com.employees.exception;

public class UserNotDFoundException extends RuntimeException{
	public UserNotDFoundException(String message) {
		super(message);
	}

}
