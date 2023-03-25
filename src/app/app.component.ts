import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import {TodoComponent} from './components/todo.component';
import {Todo} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  // get reference to the TodoComponent instance
	@ViewChild(TodoComponent)
	taskComp!: TodoComponent

  // declare an Observable of boolean to hold the validation status of the form
	invalid_!: Observable<boolean>

  ngAfterViewInit(): void {
    // set the Observable to the validation status of the form in the TodoComponent
    this.invalid_ = this.taskComp.invalid$
	}

	addTodo() {
    // retrieve the form value from the TodoComponent
		const todo: Todo = this.taskComp.value
    // clear the form
		this.taskComp.clear()
    // log the form value to the console
		console.info('>>> todo: ', todo)
	}
}
