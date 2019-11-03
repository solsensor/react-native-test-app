import { action, observable, runInAction } from 'mobx';
import { encode } from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';

class SolStore {
	@observable token = null;
	@observable sensors = [];

	@action login(email, pass) {
		const hash = encode(`${email}:${pass}`);
		return fetch(
			'https://dev.solsensor.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${hash}`,
				},
			})
			.then(res => (
				res.json().then(json => ({
					status: res.status,
					json: json,
				}))
			))
			.then(res => {
				console.log(res.status);
				console.log(res.json);
				if (res.status !== 200) {
					throw `failure status: ${res.status}`;
				}
				console.log(res.json.token);
				AsyncStorage.setItem('userToken', res.json.token);
				this.token = res.json.token;
			});
	}

	@action
	async loadToken() {
		const userToken = await AsyncStorage.getItem('userToken');
		runInAction(() => {
			this.token = userToken;
		});
		return userToken;
	}
}

const store = new SolStore();
export default store;
