import React from 'react';
import {
  SafeAreaView,
	View,
	StyleSheet,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { encode } from 'base-64';

import Input from '../components/Input';
import Button from '../components/Button';

class LoginScreen extends React.Component {

	state = {
		email: '',
		password: '',
	};

	_onEmailChange = email => {
		this.setState(prev => {
			prev.email = email;
			return prev;
		});
	};

	_onPasswordChange = pwd => {
		this.setState(prev => {
			prev.password = pwd;
			return prev;
		});
	};

	_onSubmit = () => {
		const hash = encode(`${this.state.email}:${this.state.password}`);
		fetch('https://dev.solsensor.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${hash}`,
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			}),
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
			})
			.then(() => this._navigateToApp())
			.catch(err => console.warn(err));
	}

	_navigateToApp = () => {
		this.props.navigation.navigate('App');
	};

	render() {
		return (
		<>
			<SafeAreaView style={styles.container}>
			<View>
				<Text>MAIN SCREEN</Text>
				<Input placeholder='email' style={styles.formControl} onChangeText={this._onEmailChange} value={this.state.email} />
				<Input placeholder='password' style={styles.formControl} onChangeText={this._onPasswordChange} value={this.state.password} />
				<Button title="Log in" onPress={this._onSubmit} style={styles.formControl} />
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
	},
	formControl: {
		marginVertical: 16,
	},
});

export default LoginScreen;
