import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';

@NgModule({
	declarations: [FormFieldsComponent],
	imports: [IonicModule],
	exports: [FormFieldsComponent]
})
export class ComponentsModule {}
