import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { HeaderComponent } from '../../components/HeaderComp';
/**
 * Home props
 */
export interface HomeProps {
	navigation: any;
}
/**
 * Home state
 */
export interface HomeState {}

/**
 * Home
 */
export class HomeScreen extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);
		this.state = {};
	}
	static navigationOptions = {
		title: 'Home'
	};
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		return (
			<View>
				<HeaderComponent></HeaderComponent>
				<Text h1>Heading 1</Text>
				<Text h2>TEst 1</Text>
			</View>
		);
	}
}

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: '#FBFAFA'
	}
});
