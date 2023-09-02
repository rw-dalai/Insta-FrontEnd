import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoDemoUiModule } from '@todo-demo/ui';

@NgModule({
	imports: [CommonModule, TodoDemoUiModule],
	declarations: [TodoComponent, TodoComponent],
	exports: [TodoComponent],
})
export class TodoDemoFeatModule {}
