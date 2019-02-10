import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { StarWarsService } from './../../providers/star-wars/star-wars.service';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
	selector: 'page-master-list',
	templateUrl: 'master-list.html',
})
export class MasterListPage {

	people: User[] = [];
	fetchedData: any;
	profile = [];

	constructor(
		private api: StarWarsService,
		private loadCtrl: LoadingController) {
		// films / people / planets / species / starships / vehicles
		// this.api.logFeed('people');
	}

	/** gets and sets data when the view will load */
	async ionViewWillEnter() {
		// if this is the first time the view is loaded
		if (!this.fetchedData) {
			// show the loader whilst we're getting the data
			const loader = this.loadCtrl.create({
				content: 'Please wait...'
			});
			loader.present();
			// make the api call
			this.fetchedData = await this.api.getFeed(null, 'people');
			this.people = this.fetchedData['results'];

			// sets faux placeholder data
			for (let user of this.people) {
				// user.thumbnail = '//placehold.it/35x35';
				user.featured_img = '//placehold.it/400x250';
				user.bio = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
			}

			this.profile = await this.buildProfile();
			loader.dismiss();
		}
	}

	/** returns true if details is an array */
	isArray(detail: any) {
		return Array.isArray(detail);
	}

	/** 
	 * gets the full profile data for each character including 
	 * values for nested data arrays. We can then pass the profile
	 * object to the single view and avoid calling the api again
	 */
	async buildProfile() {
		let results = this.fetchedData['results'],
			profile = [];
		// loop through the top level data array
		for (let i = 0; i < results.length; i++) {
			// loop through the object keys
			Object.keys(results[i])
				.forEach( async key => {
					let value = results[i][key],
						tempArr = [];
					// if this item has nested values 
					if ( this.isArray(value) ) {
						// get the data from the api
						for (let subvalue of value) {
							let nestedData = await this.api.getFeed(subvalue),
								firstItem = Object.keys(nestedData)[0];
							// push data to holding array
							tempArr.push(nestedData[firstItem]);
						}
						results[i][key] = tempArr;
					}
					// get the homeworld name
					else if( key === 'homeworld' ){
						let world = await this.api.getFeed(value)
						results[i][key] = world['name'];
					}
				});
			// push the data to our profile array
			profile.push(results[i]);
		}
		return profile;
	}
}
