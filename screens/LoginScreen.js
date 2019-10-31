import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
	TouchableOpacity,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
	const navigateToApp = () => navigation.navigate('App');
	return (
	  <>
		<SafeAreaView>
		  <View>
			<Text>MAIN SCREEN</Text>
		  </View>
			<TouchableOpacity onPress={navigateToApp}>
			<Text>SUBMIT</Text>
			</TouchableOpacity>
		</SafeAreaView>
	  </>
	);
};

export default LoginScreen;
