import * as React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ActivityIndicator,
	Dimensions,
	Image,
	Modal
} from 'react-native';
import { Icon, List, ListItem, Avatar, Button, Layout, Text } from 'react-native-ui-kitten';
import { HeaderComponent } from '../../components/HeaderComponent';
import HTML from 'react-native-render-html';
import ImageViewer from 'react-native-image-zoom-viewer';
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
	isModalOpened: boolean;
	currentImageIndex: number;
	images: any;
}

/**
 * Post
 */
export class PostScreen extends React.Component<PostProps, PostState> {
	constructor(props: PostProps) {
		super(props);
		this.state = {
			postData: [],
			loading: true,
			images: [],
			isModalOpened: false, //Controls if modal is opened or closed
			currentImageIndex: 0 //Controls initial photo to show for modal
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
	openModal(index) {
		this.setState({ isModalOpened: true, currentImageIndex: index });
	}
	_renderItem({ item }) {
		console.log(item.cooked);
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
							style={{ marginTop: 20, marginBottom: 5, marginLeft: 10 }}
							source={{ uri: 'https://forum.manjaro.org' + item.avatar_template.replace('{size}', '64') }}
						/>
					</Layout>
					<Layout style={{ flex: 1 }}>
						<HTML
							renderers={{
								img: (htmlAttribs, children, passProps) => {
									if (htmlAttribs.class == 'avatar')
										return (
											<Avatar
												size="small"
												style={{ marginTop: 20, marginBottom: 5, marginLeft: 10 }}
												source={{ uri: htmlAttribs.src }}
											/>
										);
									else
										return (
											<TouchableWithoutFeedback
												onPress={() => {
													this.setState({ images: [{ url: htmlAttribs.src }] });
													this.openModal(0);
												}}
											>
												<Image
													resizeMode="cover"
													style={{
														width: htmlAttribs.class == 'emoji' ? 20 : Dimensions.get('window').width / 2,
														height: htmlAttribs.class == 'emoji' ? 20 : Dimensions.get('window').height / 4
													}}
													source={{ uri: htmlAttribs.src }}
												/>
											</TouchableWithoutFeedback>

											// <Image
											// 	style={{
											// 		width: htmlAttribs.class == 'emoji' ? 20 : Dimensions.get('window').width / 2,
											// 		height: htmlAttribs.class == 'emoji' ? 20 : Dimensions.get('window').height / 4
											// 	}}
											// 	source={{ uri: htmlAttribs.src }}
											// ></Image>
										);
								}

								//<Image style={{ width: 50, height: 50 }} source={{ uri: htmlAttribs.src }}></Image>
							}}
							style={{ marginLeft: 5 }}
							html={item.cooked}
							imagesInitialDimensions={{
								width: Dimensions.get('window').width,
								height: Dimensions.get('window').height
							}}
						/>
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
					<HeaderComponent headerTitle={this.props.navigation.getParam('title', 'no title')}></HeaderComponent>
					<Modal visible={this.state.isModalOpened} transparent={true}>
						<ImageViewer imageUrls={this.state.images} index={this.state.currentImageIndex} />
					</Modal>
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
