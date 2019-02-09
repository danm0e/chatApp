import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasterListSinglePage } from './master-list-single';

@NgModule({
  declarations: [
    MasterListSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(MasterListSinglePage),
  ],
})
export class MasterListSinglePageModule {}
