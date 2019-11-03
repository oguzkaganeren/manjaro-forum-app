import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './app/pages/screens/HomeScreen';
import { ThemeProvider } from 'react-native-elements';
/**
 * Define navigator
 */
const RootSwitch = createSwitchNavigator(
	{
		Home: { screen: HomeScreen }
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#FFEB3B'
			},
			headerTintColor: 'black',
			headerTitleStyle: {
				fontWeight: 'normal'
			}
		}
	}
);
const App = createAppContainer(RootSwitch);

export default () => (
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
