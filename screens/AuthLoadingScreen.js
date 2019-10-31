import React, { useEffect } from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';

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
				<StatusBar barStyle='default' />
			</View>
		);
	}
};

export default AuthLoadingScreen;
