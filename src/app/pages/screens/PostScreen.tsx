import * as React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon, List, ListItem, Avatar, Button, Layout, Text } from 'react-native-ui-kitten';
import { HeaderComponent } from '../../components/HeaderComponent';
import HTMLView from 'react-native-htmlview';
/**
 * Post props
 */
export interface PostProps {
	navigation: any;
}
/**
 * Post state
 */
export interface PostState {
	postData: any;
	loading: boolean;
}

/**
 * Post
 */
export class PostScreen extends React.Component<PostProps, PostState> {
	constructor(props: PostProps) {
		super(props);
		this.state = {
			postData: [],
			loading: true
		};
	}
	async componentDidMount() {
		let itemId = JSON.stringify(this.props.navigation.getParam('itemId', 'NO-ID'));
		//Have a try and catch block for catching errors.
		try {
			//Assign the promise unresolved first then get the data using the json method.
			const posts = await fetch('https://forum.manjaro.org/t/' + itemId + '/posts.json');
			const postJson = await posts.json();
			this.setState({ postData: postJson, loading: false });
		} catch (err) {
			console.log('Error fetching data', err);
		}
	}
	_renderItem({ item }) {
		return (
			<TouchableOpacity key={item.id}>
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
							source={{ uri: 'https://forum.manjaro.org' + item.avatar_template.replace('{size}', '64') }}
						/>
					</Layout>
					<Layout style={{ flex: 1 }}>
						<HTMLView value={item.cooked} stylesheet={styles} />
					</Layout>
					<Layout style={{ flex: 0.3 }}>
						<Text appearance="hint" style={{ textAlign: 'right', marginRight: 10 }}>
							{item.post_number}
						</Text>
					</Layout>
				</Layout>
			</TouchableOpacity>
		);
		//return <ListItem title={item.title} description={item.tags} accessory={this.RemoteAvatar} />;
	}
	keyExtractor = (item, index) => index.toString();
	/**
	 * Renders Post
	 * @returns
	 */
	render() {
		const { postData, loading } = this.state;
		if (!loading) {
			return (
				<Layout style={{ marginRight: 10, marginLeft: 10 }}>
					<HeaderComponent></HeaderComponent>
					<Text category="h3" style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', paddingBottom: 10 }}>
						{this.props.navigation.getParam('title', 'no title')}
					</Text>

					<List
						data={postData.post_stream.posts}
						renderItem={this._renderItem.bind(this)}
						keyExtractor={this.keyExtractor}
					/>
				</Layout>
			);
		} else {
			return <ActivityIndicator />;
		}
	}
}

const styles: any = StyleSheet.create({
	a: {
		fontWeight: '300',
		color: '#FF3366' // make links coloured pink
	}
});
