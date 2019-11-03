import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ButtonGroup } from 'react-native-elements';
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
				<ButtonGroup
					buttons={['Latest', 'New', 'Top']}
					onPress={this.updateIndex}
					selectedIndex={selectedTab}
					selectedButtonStyle={styles.selectedButton}
					selectedTextStyle={styles.selectedTextStyle}
				/>
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
