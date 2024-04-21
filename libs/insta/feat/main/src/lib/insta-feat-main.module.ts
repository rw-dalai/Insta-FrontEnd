import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { featureMainRoutes } from './lib.routes';
import { SidebarComponent } from '@insta/ui/sidebar';
import { ToolbarComponent } from '@insta/ui/toolbar';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(featureMainRoutes),
		SidebarComponent,
		ToolbarComponent,
	],
})
export class InstaFeatMainModule {}
