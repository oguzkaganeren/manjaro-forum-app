import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';
import { HeaderComponent } from '../../components/HeaderComponent';
/**
 * Post props
 */
export interface PostProps {
	navigation: any;
}
/**
 * Post state
 */
export interface PostState {}

/**
 * Post
 */
export class PostScreen extends React.Component<PostProps, PostState> {
	constructor(props: PostProps) {
		super(props);
		this.state = {
			selectedTab: 0
		};
	}
	/**
	 * Renders Post
	 * @returns
	 */
	render() {
		return (
			<Layout>
				<HeaderComponent></HeaderComponent>
				<Text>{JSON.stringify(this.props.navigation.getParam('itemId', 'NO-ID'))}</Text>
			</Layout>
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
