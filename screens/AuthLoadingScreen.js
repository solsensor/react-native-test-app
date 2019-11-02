import React, { useEffect } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');
		this.props.navigation.navigate(userToken ? 'App' : 'Auth');
	};

	render() {
		return (
			<View>
				<ActivityIndicator />
			</View>
		);
	}
};

export default AuthLoadingScreen;
