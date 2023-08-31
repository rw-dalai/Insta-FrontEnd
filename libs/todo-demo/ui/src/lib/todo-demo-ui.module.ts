import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';

@NgModule({
	imports: [CommonModule],
	declarations: [TodoHeaderComponent, TodoListComponent, TodoFooterComponent],
	exports: [TodoListComponent, TodoHeaderComponent, TodoFooterComponent],
})
export class TodoDemoUiModule {}
