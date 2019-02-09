import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { StarWarsService } from '../../providers/star-wars/star-wars.service';

@IonicPage()
@Component({
	selector: 'page-master-list-single',
	templateUrl: 'master-list-single.html',
})
export class MasterListSinglePage {

	user: User;
	details = [];
	exclude = ['thumbnail', 'featured_img', 'bio'];

	constructor(
		private navParams: NavParams,
		private api: StarWarsService) {
	}

	/** gets and sets data on view load */
	ionViewWillLoad() {
		this.user = this.navParams.data;
		this.getDetails();
	}

	/** returns true if details is an array */
	isArray(detail: any) {
		return Array.isArray(detail);
	}

	/** makes another api call for the current value */
	async getNestedData(value: string) {
		return await this.api.getFeed(value)
	}

	/** get the details for the view to loop through and display */
	getDetails() {
		// loop through the 
		Object.keys(this.user)
			.forEach( async key => {
				let formattedKey = key.replace(/_/g, ' '),
					value = this.user[key],
					tempArr = [];

				// if this item has nested values, 
				// get the actual data from the api
				if ( this.isArray(value) ) {
					for (let subvalue of value) {
						let nestedData = await this.getNestedData(subvalue),
							firstItem = Object.keys(nestedData)[0];
							tempArr.push(nestedData[firstItem]);
					}
					value = tempArr;
				}

				// filter the data so we're not repeating anything and 
				// we don't have any blank spaces
				if( this.exclude.indexOf(key) < 0 && value.length > 0 ) {
					this.details.push({ key: formattedKey, value: value });
				}
			}
		);
	}
}
