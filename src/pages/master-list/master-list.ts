import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { StarWarsService } from './../../providers/star-wars/star-wars.service';

@IonicPage()
@Component({
	selector: 'page-master-list',
	templateUrl: 'master-list.html',
})
export class MasterListPage {

	constructor(
		private api: StarWarsService ) {
		// films / people / planets / species / starships / vehicles
		this.api.logFeed('people');
	}

}
