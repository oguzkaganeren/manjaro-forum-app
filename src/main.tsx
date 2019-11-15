import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './app/pages/screens/HomeScreen';
import { PostScreen } from './app/pages/screens/PostScreen';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Text } from 'react-native-ui-kitten';

/**
 * Define navigator
 */
const RootSwitch = createSwitchNavigator(
	{
		HomeScreen: { screen: HomeScreen },
		PostScreen: { screen: PostScreen }
	},
	{
		initialRouteName: 'HomeScreen'
	}
);
const App = createAppContainer(RootSwitch);
/**View or Fragment??? */
export default () => (
	<React.Fragment>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider mapping={mapping} theme={lightTheme}>
			<App />
		</ApplicationProvider>
	</React.Fragment>
);
