import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;

	rootPage: string = 'SignInPage';
	pages: Array<{ title: string, icon: string, component: string }>;

	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private loadCtrl: LoadingController,
		private menuCtrl: MenuController,
		private alertCtrl: AlertController ) {

		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Dashboard', icon: 'apps', component: 'MasterListPage' },
			{ title: 'Photos', icon: 'images', component: 'PhotosPage' },
			{ title: 'Available Missions', icon: 'compass', component: 'AvailableMissionsPage' },
			{ title: 'My Missions', icon: 'medal', component: 'MyMissionsPage' },
			{ title: 'Chat', icon: 'chatboxes', component: 'ChatPage' }
		];

	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	/** sets current nav stack root */
	openPage(page) {
		this.nav.setRoot(page.component);
	}

	/** prompts user to confirm signs out */
	signOut() {
		this.alertCtrl.create({
			title: 'Log out',
			message: 'Are you sure you want to log out?',
			buttons: [
			  {
				text: 'Cancel',
				role: 'cancel',
				cssClass:'btn-cancel'
			  },
			  {
				text: 'Log out',
				handler: () => this.logOut()
			  }
			]
		  }).present();
	}

	/** 
	 * actually perform log out, toggle menu draw 
	 * and sets root to sign in view 
	 */
	private logOut() {
		const loader = this.loadCtrl.create({
			content: 'Signing out'
		});
		loader.present();
		// mock sign out
		setTimeout( () => {
			this.menuCtrl.toggle();
			this.openPage({ component: 'SignInPage' });
			loader.dismiss();
		}, 2000 );
	}
}
