import React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Icon, List, ListItem, Avatar, Layout, Text } from 'react-native-ui-kitten';
import TimeAgo from 'react-native-timeago';
/**
 * Latest props
 */
export interface LatestProps {
	navigation: any;
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
	MenuIcon = style => <Icon {...style} name="book-open-outline" />;
	async componentDidMount() {
		//Have a try and catch block for catching errors.
		try {
			//Assign the promise unresolved first then get the data using the json method.
			const latestData = await fetch('https://forum.manjaro.org/latest.json');
			const latestDataJson = await latestData.json();
			this.setState({ latestData: latestDataJson });
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
			const categoriesDataJson = await categoriesData.json();
			this.setState({ categoriesData: categoriesDataJson, loading: false });
			//console.log(latestDataV.topic_list.topics[0].id);
			//this.findNameOfCategory(8);
		} catch (err) {
			console.log('Error fetching data', err);
		}
	}
	getUserAvatar = (userID: any): string => {
		const { latestData } = this.state;
		let avatar;
		const data = latestData.users.map(function(item) {
			if (item.id == userID) {
				avatar = item.avatar_template;
			}
		});
		avatar = avatar.replace('{size}', '64');
		return avatar;
	};
	getNameOfCategory = (id: any): string => {
		const { categoriesData } = this.state;
		let itemName;
		const data = Object.values(categoriesData)[0].categories.map(function(item) {
			if (item.id == id) {
				itemName = item.name;
			}
		});
		return itemName;
	};
	_onPressButton(key, title) {
		//console.log(key);
		this.props.navigation.navigate('PostScreen', {
			itemId: key,
			title: title
		});
		this.props.navigation.navigate('PostScreen');
	}
	_renderItem({ item }) {
		return (
			<TouchableOpacity key={item.id} onPress={() => this._onPressButton(item.id, item.title)}>
				<Layout
					style={{
						flexDirection: 'row',
						paddingBottom: 5,
						paddingTop: 5,
						borderBottomWidth: 0.2,
						borderBottomColor: 'gray'
					}}
				>
					<Layout style={{ flex: 0.2 }}>
						<Avatar
							style={{ marginTop: 5, marginBottom: 5, marginLeft: 10 }}
							source={{ uri: 'https://forum.manjaro.org' + this.getUserAvatar(item.posters[0].user_id) }}
						/>
					</Layout>
					<Layout style={{ flex: 1 }}>
						<Text category="s1">{item.title}</Text>
						<Text appearance="hint">{this.getNameOfCategory(item.category_id)}</Text>
					</Layout>
					<Layout style={{ flex: 0.3 }}>
						<Text appearance="hint" style={{ textAlign: 'right', marginRight: 10 }}>
							{item.views}
						</Text>
						<TimeAgo time={item.last_posted_at} hideAgo={true} />
					</Layout>
				</Layout>
			</TouchableOpacity>
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
