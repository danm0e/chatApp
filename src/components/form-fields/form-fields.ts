import { NavController, NavParams, LoadingController, ToastController, ViewController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'form-fields',
	templateUrl: 'form-fields.html'
})
export class FormFieldsComponent {

	welcomeMessage: string;

	constructor(
		private navCtrl: NavController,
		private loadCtrl: LoadingController,
		private toast: ToastController,
		private viewCtrl: ViewController,
		private modal: ModalController) {
	}

	isModal() {
		return this.viewCtrl.isOverlay
	}

	openModal(page: string) {
		this.modal.create(page).present();
	}

	/** handles form submit */
	submit(form: NgForm) {
		// console.log(form.value);
		
		// show the loader
		const loader = this.loadCtrl.create({
			content: "Logging in"
		});
		loader.present();

		// mock auth api call
		setTimeout(() => {
			// change views and show welcome message
			loader.dismiss();
			this.redirectPage();
		}, 2000);

	}

	/** redirects to master page and sets welcome message */
	redirectPage() {
		// sign in page
		if (!this.isModal()) {
			this.welcomeMessage = 'Welcome Back!';
		}
		// sign up page
		else {
			this.viewCtrl.dismiss();
			this.welcomeMessage = 'Welcome!';
		}
		// show toast
		this.toast.create({
			message: this.welcomeMessage,
			duration: 2500
		}).present();
		// redirect
		this.navCtrl.setRoot('MasterListPage');
	}

}
