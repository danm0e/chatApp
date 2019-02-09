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

	async ionViewWillLoad() {
		this.user = this.navParams.data;
		// console.log(this.user);
		await this.getDetails();
	}

	isArray(detail: any) {
		// console.log(detail);
		return Array.isArray(detail);
	}

	async getNestedData(value: string) {
		return await this.api.getFeed(value)
	}

	getDetails() {
		// loop through the 
		Object.keys(this.user)
			.forEach( async key => {
				let formattedKey = key.replace(/_/g, ' '),
					value = this.user[key],
					tempArr = [];

				if ( this.isArray(value) ) {
					// console.log(key, value);
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
