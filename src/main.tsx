import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './app/pages/screens/HomeScreen';
import { Container } from 'native-base';
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
	<Container>
		<App />
	</Container>
);
