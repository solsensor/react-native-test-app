import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Button from '../components/Button';

class SettingsScreen extends React.Component {

	_logout = async () => {
		await AsyncStorage.removeItem('userToken');
		this.props.navigation.navigate('AuthLoading');
	}

	render() {
		return (
		<>
			<SafeAreaView style={styles.container}>
			<View>
				<Button title="Log out" onPress={this._logout} />
			</View>
			</SafeAreaView>
		</>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 20,
	},
});

export default SettingsScreen;
