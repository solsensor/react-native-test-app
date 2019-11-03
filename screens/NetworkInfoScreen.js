import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { inject, observer } from 'mobx-react';

import WifiManager from 'react-native-wifi-reborn';

import Button from '../components/Button';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 20,
	},
});

@inject('wifiStore')
@observer
class NetworkInfoScreen extends React.Component {
	render() {
		return (
		<>
			<SafeAreaView style={styles.container}>
			<View>
				<Button title="Refresh" onPress={() => this.props.wifiStore.update()} />
				<Text>Enabled: {this.props.wifiStore.enabled}</Text>
				<Text>Current SSID: {this.props.wifiStore.current}</Text>
				<Text>Available SSIDs: {this.props.wifiStore.available}</Text>
			</View>
			</SafeAreaView>
		</>
		);
	}
}

export default NetworkInfoScreen;
