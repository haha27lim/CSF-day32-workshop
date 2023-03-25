import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import {Todo} from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // Declare variables
	form!: FormGroup

  // Define a setter method to accept input data
	@Input()
	set todo(todo: Todo) {
    // Create form based on the input todo object
		this.form = this.createTodoForm(todo)
	}

  // Define a getter method to retrieve form values
	get value(): Todo {
		return this.form.value as Todo
	}

  // Define an observable to keep track of form validation status
  get invalid$(): Observable<boolean> {
    // emits an event whenever the status of the form changes. 
    return this.form.statusChanges
      // .pipe() is a method used to chain multiple operators together to transform, filter or manipulate data emitted by an observable.
      .pipe(
        // to log the current form status to the console.
        tap(v => {
          console.info('>> form status: ', v)
        }),
        // to emit an initial value of 'INVALID'
        startWith('INVALID'),
        // to convert the emitted status values to boolean values. If the status is 'INVALID', the output value will be true. Otherwise, it will be false.
        map(v => 'INVALID' == v)
      )
  }

  // Inject form builder dependency
	constructor(private fb: FormBuilder) { }

  // Define ngOnInit lifecycle hook
	ngOnInit(): void {
    // Create a new form
		this.form = this.createTodoForm()
	}

  // Define a method to clear form values
	clear() {
		this.form.reset()
	}

  // Define a method to create a new form group based on Todo data
	private createTodoForm(todo: Todo | null = null): FormGroup {
		return this.fb.group({
			description: this.fb.control<string>(
				!!todo? todo.description: '', [ Validators.required ]),
			priority: this.fb.control<string>(
				!!todo? todo.priority: '', [ Validators.required ]),
			dueDate: this.fb.control<string>(
				!!todo? todo.dueDate: '', [ Validators.required ]),
		})
	}

}
