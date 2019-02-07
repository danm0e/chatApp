import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;

	rootPage: string = 'SignInPage';
	pages: Array<{ title: string, component: string }>;

	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private loadCtrl: LoadingController,
		private menuCtrl: MenuController ) {

		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Dashboard', component: 'DashboardPage' },
			{ title: 'Photos', component: 'PhotosPage' },
			{ title: 'Available Missions', component: 'AvailableMissionsPage' },
			{ title: 'My Missions', component: 'MyMissionsPage' },
			{ title: 'Chat', component: 'ChatPage' }
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

	/** signs out, toggle menu draw and sets root to sign in view */
	signOut() {
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
