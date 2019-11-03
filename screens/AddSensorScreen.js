import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Wifi from 'react-native-iot-wifi';

import Button from '../components/Button';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 20,
	},
});

class AddSensorScreen extends React.Component {
	_sendCredsToSensor = () => {
		fetch(
			'http://192.168.5.18/setup?token=sensor-abcdetokdef&ssid=wifinetwork&pswd=wifipassword',
			{method: 'POST'},
		)
			.then(res => {
				if (res.status !== 200) {
					throw `expected status 200, got ${res.status}`;
				}
				console.warn('posted auth info to sensor');
			})
			.catch(err => console.warn(err))
	};

	_addSensor = () => {
		Wifi.connect('SOL Sensor cc50e380a6a0', err => {
			if (err) {
				console.warn(err);
			} else {
				console.warn('connected to solsensor wifi');
				setTimeout(this._sendCredsToSensor, 5000);
			}
		});

	};

	render() {
		return (
		<>
			<SafeAreaView style={styles.container}>
			<View>
				<Button title="Add Sensor" onPress={this._addSensor} />
			</View>
			</SafeAreaView>
		</>
		);
	}
}

export default AddSensorScreen;
