import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoDemoUiModule } from '@front-end/todo-demo/ui';

@NgModule({
	imports: [CommonModule, TodoDemoUiModule],
	declarations: [TodoComponent, TodoComponent],
})
export class TodoDemoFeatModule {}
