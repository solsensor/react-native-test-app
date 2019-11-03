/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Wifi from 'react-native-iot-wifi';
import {
	createAppContainer,
	createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'mobx-react';

import AddSensorScreen from './screens/AddSensorScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import NetworkInfoScreen from './screens/NetworkInfoScreen';

import solStore from './stores/solStore';
import wifiStore from './stores/wifiStore';

const HelloWorldPage = () => {
	const [ssid, setSSID] = useState(null);
	const updateSSID = () => Wifi.getSSID(setSSID);
	const connect = () => {
		Wifi.connectSecure('HKZR2', 'WBV82DP9GGSYXNFH', false, err => {
			updateSSID()
		});
	};
	const disconnect = () => {
		Wifi.removeSSID('HKZR2', err => {
			updateSSID()
		});
	};

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>WiFi</Text>
              <Text style={styles.sectionDescription}>
		  SSID is {ssid ? ssid : 'null'}
              </Text>
		      <TouchableOpacity onPress={updateSSID}>
		        <Text>Update</Text>
		      </TouchableOpacity>
		      <TouchableOpacity onPress={connect}>
		        <Text>Connect</Text>
		      </TouchableOpacity>
		      <TouchableOpacity onPress={disconnect}>
		        <Text>Disconnect and remove</Text>
		      </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const OtherPage = () => {
	return (
      <StatusBar barStyle="dark-content" />
	);
};

const AppNavigator = createBottomTabNavigator({
	Wifi: NetworkInfoScreen,
	Add: AddSensorScreen,
	Settings: SettingsScreen,
});

const AuthNavigator = createStackNavigator({
	Login: { screen: LoginScreen },
});

const NavigationContainer = createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			Auth: AuthNavigator,
			App: AppNavigator
		},
		{ InitialRouteName: 'AuthLoading' },
	)
);

const App = () => (
	<Provider solStore={solStore} wifiStore={wifiStore}>
		<NavigationContainer />
	</Provider>
)

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
