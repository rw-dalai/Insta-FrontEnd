import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from './main-shell.component';
import { RouterModule } from '@angular/router';
import { featureMainRoutes } from './lib.routes';

@NgModule({
	imports: [
    CommonModule,
    RouterModule.forChild(featureMainRoutes),
  ],
	declarations: [MainShellComponent],

})
export class InstaFeatMainModule {}
