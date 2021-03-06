import React from 'react';
import {
  SafeAreaView,
	View,
	StyleSheet,
  Text,
} from 'react-native';
import { inject } from 'mobx-react';

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
		this.props.solStore.login(this.state.email, this.state.password)
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
