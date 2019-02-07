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

	/** returns true if this is a modal (i.e signUp view) */
	isModal() {
		return this.viewCtrl.isOverlay
	}

	/** opens signUp modal, redirects to master page */
	openModal(page: string) {
		let modal = this.modal.create(page);
		modal.present();
		// redirect to master page
		// fixes issue with menuToggle not working from signUp view login
		modal.onDidDismiss( redirect => {
			if( redirect ) {
				this.redirectPage();
			}
		});
	}

	/** handles form submit */
	submit(form: NgForm) {
		// show the loader
		const loader = this.loadCtrl.create({
			content: "Logging in"
		});
		loader.present();
		// mock auth api call
		setTimeout(() => {
			// change views and show welcome message
			loader.dismiss();
			this.showWelcome();
		}, 2000);
	}

	/** sets welcome message and triggers redirects to master page */
	showWelcome() {
		// sign in page
		if (!this.isModal()) {
			this.welcomeMessage = 'Welcome Back!';
			this.redirectPage();
		}
		// sign up page
		else {
			// close modal and pass params back for redirect
			this.viewCtrl.dismiss('redirect');
			this.welcomeMessage = 'Welcome!';
		}
		// show toast
		this.toast.create({
			message: this.welcomeMessage,
			duration: 2500
		}).present();
	}

	/** redirects to master page */
	redirectPage() {
		this.navCtrl.setRoot('MasterListPage');
	}
}
