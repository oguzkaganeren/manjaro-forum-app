import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderComponent } from '../../components/HeaderComponent';
import { LatestComponent } from '../../components/LatestComponent';
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
		this.state = {
			selectedTab: 0
		};
		this.updateIndex = this.updateIndex.bind(this);
	}
	updateIndex(selectedIndex) {
		this.setState({ selectedTab: selectedIndex });
	}
	/**
	 * Renders home
	 * @returns
	 */
	render() {
		const { selectedTab } = this.state;
		return (
			<View>
				<HeaderComponent></HeaderComponent>
				<LatestComponent></LatestComponent>
			</View>
		);
	}
}

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: '#FBFAFA'
	},
	selectedButton: {
		backgroundColor: '#8BC34A'
	},
	selectedTextStyle: {
		color: '#FBFAFA'
	}
});
