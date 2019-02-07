import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-master-list',
  templateUrl: 'master-list.html',
})
export class MasterListPage {

  constructor(
	  public navCtrl: NavController, 
	  public navParams: NavParams ) {
  }

}
