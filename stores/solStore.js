import { action, observable } from 'mobx';

class SolStore {
	@observable token = null;
	@observable sensors = [];

	@action getSensors() {
	}
}

const store = new SolStore();
export default store;
