import { action, observable } from 'mobx';
import WifiManager from 'react-native-wifi-reborn';

class WifiStore {
	@observable enabled = null;
	@observable current = null;
	@observable available = null;

	@action update() {
		WifiManager.getCurrentWifiSSID().then(this.updateCurrent);
		WifiManager.loadWifiList(this.updateAvailable, console.warn);
		WifiManager.isEnabled(enabled => this.enabled = enabled);
	}

	@action.bound
	updateCurrent(ssid) {
		this.current = ssid;
	}

	@action.bound
	updateAvailable(list) {
		this.available = list;
	}
}

const store = new WifiStore();
export default store;
