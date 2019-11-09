import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { List, ListItem, Avatar, Layout, Text } from 'react-native-ui-kitten';
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
	findNameOfCategory = (id: any): string => {
		const { categoriesData } = this.state;
		let itemName;
		const data = Object.values(categoriesData)[0].categories.map(function(item) {
			if (item.id == id) {
				itemName = item.name;
			}
		});
		return itemName;
	};
	_renderItem({ item }) {
		return (
			<Layout key={item.key} style={{ flexDirection: 'row' }}>
				<Layout style={{ flex: 0.2 }}>
					<Avatar
						style={{ marginTop: 5, marginBottom: 5, marginLeft: 10 }}
						source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
					/>
				</Layout>
				<Layout style={{ flex: 1 }}>
					<Text category="s1">{item.title}</Text>
					<Text appearance="hint">{this.findNameOfCategory(item.category_id)}</Text>
				</Layout>
			</Layout>
		);
		//return <ListItem title={item.title} description={item.tags} accessory={this.RemoteAvatar} />;
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
				<List
					data={latestData.topic_list.topics}
					renderItem={this._renderItem.bind(this)}
					keyExtractor={this.keyExtractor}
				/>
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
