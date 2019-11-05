import React from 'react';
import { StyleSheet, ActivityIndicator, View, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
/**
 * Latest props
 */
export interface LatestProps {
	//navigation: any;
}

/**
 * Latest state
 */
export interface LatestState {
	latestData: any;
	categoriesData: any;
	loading: boolean;
}

/**
 * Latest component
 */
export class LatestComponent extends React.Component<LatestProps, LatestState> {
	/**
	 * Default props of Latest component
	 */
	static defaultProps = {};

	/**
	 * Creates an instance of Latest component.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			latestData: [],
			categoriesData: [],
			loading: true
		};
	}
	async componentDidMount() {
		//Have a try and catch block for catching errors.
		try {
			//Assign the promise unresolved first then get the data using the json method.
			const latestData = await fetch('https://forum.manjaro.org/latest.json');
			const latestDataV = await latestData.json();
			this.setState({ latestData: latestDataV });
			this.getCategories();
			//console.log(latestDataV.topic_list.topics[0].id);
		} catch (err) {
			console.log('Error fetching data', err);
		}
	}
	async getCategories() {
		try {
			//Assign the promise unresolved first then get the data using the json method.
			const categoriesData = await fetch('https://forum.manjaro.org/categories.json');
			const categoriesDataV = await categoriesData.json();
			this.setState({ categoriesData: categoriesDataV, loading: false });
			//console.log(latestDataV.topic_list.topics[0].id);
			//this.findNameOfCategory(8);
		} catch (err) {
			console.log('Error fetching data', err);
		}
	}
	findNameOfCategory = (id: number) => {
		const { categoriesData } = this.state;
		const data = Object.values(categoriesData)[0].categories.map(function(item) {
			if (item.id == id) {
				return item.name;
			}
		});
	};
	_renderItem({ item }) {
		return (
			<ListItem avatar>
				<Left>
					<Thumbnail source={{ uri: 'Image URL' }} />
				</Left>
				<Body>
					<Text>{item.title}</Text>
					<Text note>Doing what you like will always keep you happy . .</Text>
				</Body>
				<Right>
					<Text note>3:43 pm</Text>
				</Right>
			</ListItem>
		);
	}
	keyExtractor = (item, index) => index.toString();
	/**
	 * Renders Latest component
	 * @returns
	 */
	render() {
		//data.topic_list.topics
		const { latestData, loading } = this.state;
		if (!loading) {
			//console.log(latestData.topic_list.topics[0].id);
			return (
				<FlatList data={latestData.topic_list.topics} renderItem={this._renderItem} keyExtractor={this.keyExtractor} />
			);
		} else {
			return <ActivityIndicator />;
		}
	}
}

const styles: any = StyleSheet.create({
	header: {
		//paddingTop: 20,
		backgroundColor: '#8BC34A'
		// borderWidth: 0,
		//flex: 1,
	},
	title: {
		alignSelf: 'flex-end',
		color: '#424242'
	}
});
