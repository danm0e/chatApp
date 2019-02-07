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
	likeCount = 12;
	
	constructor(
		private api: StarWarsService,
		private loadCtrl: LoadingController ) {
		// films / people / planets / species / starships / vehicles
		// this.api.logFeed('people');
		// show the loader whilst we're getting the data
		const loader = this.loadCtrl.create({
			content: 'Please wait...'
		});
		loader.present();
		// make the api call
		this.api.getFeed('people')
			.then( people => {
				// once resolved, hide the loader and push the data 
				// to our array for looping through
				loader.dismiss();
				this.people = people['results'];

				for(let user of this.people) {
					user.thumbnail = '//placehold.it/35x35';
					user.featured_img = '//placehold.it/280x170';
					user.bio = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
				}
						
				console.log(this.people)
			});
			
	}

	like() {
		this.likeCount++;
	}

}
