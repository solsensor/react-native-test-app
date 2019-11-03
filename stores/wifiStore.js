import { action, observable } from 'mobx';
import WifiManager from 'react-native-wifi-reborn';

class WifiStore {
	@observable current = null;
	@observable available = [];

	@action update() {
		WifiManager.getCurrentWifiSSID().then(this.updateCurrent)
	}

	@action.bound
	updateCurrent(ssid) {
		this.current = ssid;
	}
}

const store = new WifiStore();
export default store;
