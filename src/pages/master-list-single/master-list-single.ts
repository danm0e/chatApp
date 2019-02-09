import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
	selector: 'page-master-list-single',
	templateUrl: 'master-list-single.html',
})
export class MasterListSinglePage {

	user: User;
	details = [];
	exclude = ['thumbnail', 'featured_img', 'bio', 'url'];

	constructor( 
		private navParams: NavParams ){}

	/** gets and sets data on view load */
	ionViewWillLoad() {
		this.user = this.navParams.data;
		console.log(this.user);
		this.getDetails();
	}

	/** returns true if details is an array */
	isArray(detail: any) {
		return Array.isArray(detail);
	}

	/** get the details for the view to loop through and display */
	getDetails() {
		// loop through the profile data and build a key value pairing
		// to render in the template
		Object.keys(this.user)
			.forEach( async key => {
				let formattedKey = key.replace(/_/g, ' '),
					value = this.user[key];
				// filter the data so we're not repeating anything and 
				// we don't have any blank spaces
				if( this.exclude.indexOf(key) < 0 && value.length > 0 ) {
					this.details.push({ key: formattedKey, value: value });
				}
			}
		);
	}
}
