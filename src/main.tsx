import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './app/pages/screens/HomeScreen';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Text } from 'react-native-ui-kitten';
import Constants from 'expo-constants';
import { StyleSheet, Platform, View } from 'react-native';

/**
 * Define navigator
 */
const RootSwitch = createSwitchNavigator(
	{
		Home: { screen: HomeScreen }
	},
	{
		initialRouteName: 'Home'
	}
);
const App = createAppContainer(RootSwitch);
/**View or Fragment??? */
export default () => (
	<View style={styles.container}>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider mapping={mapping} theme={lightTheme}>
			<App />
		</ApplicationProvider>
	</View>
);
const styles = StyleSheet.create({
	container: {
		marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
	}
});
