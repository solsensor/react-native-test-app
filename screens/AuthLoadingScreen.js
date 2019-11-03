import React, { useEffect } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { inject } from 'mobx-react';

@inject('solStore')
class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
		const userToken = await this.props.solStore.loadToken();
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
