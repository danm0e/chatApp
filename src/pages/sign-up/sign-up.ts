import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-sign-up',
	templateUrl: 'sign-up.html',
})
export class SignUpPage {

	constructor(
		private viewCtrl: ViewController ) {
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
