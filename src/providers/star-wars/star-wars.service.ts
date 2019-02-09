import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StarWarsService {

	apiUrl = 'https://swapi.co/api/';

	constructor(
		private http: HttpClient) {
	}

	/**
	 * makes a GET request to the API
	 * @param {string} type – alters the payload based on category
	 */
	getFeed(url?:string, type: string = '') {
		url = (url) ? url : this.apiUrl; 
		return new Promise(resolve => {
			this.http.get(url + type).subscribe(
				data => {
					resolve(data);
				},
				err => {
					console.log(err);
				}
			);
		});
	}

	/**
	 * gets the feed and logs the response
	 * @param {string} type – alters the payload based on category
	 */
	async logFeed(type: string = '') {
		let feed = await this.getFeed(type);
		console.log(feed);
	}
}
