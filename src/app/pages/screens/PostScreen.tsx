import * as React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ActivityIndicator,
	Dimensions,
	Image,
	Modal,
	BackHandler
} from 'react-native';
import { Icon, List, Card, CardHeader, Avatar, Layout, Text } from '@ui-kitten/components';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import HTML from 'react-native-render-html';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import ImageViewer from 'react-native-image-zoom-viewer';
import TimeAgo from 'react-native-timeago';

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
	componentWillMount() {
		BackHandler.addEventListener(
			'hardwareBackPress',
			function() {
				const { goBack } = this.props.navigation;
				this.props.navigation.goBack();
				return true;
			}.bind(this)
		);
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
		const Header = () => (
			<React.Fragment>
				<Layout style={[styles.container]}>
					<Layout style={[styles.layout, { flex: 0.15 }]}>
						<Avatar
							style={{ marginTop: 20, marginBottom: 5, marginLeft: 10 }}
							source={{ uri: 'https://forum.manjaro.org' + item.avatar_template.replace('{size}', '64') }}
						/>
					</Layout>
					<Layout style={[styles.layout, { flex: 0.4 }]}>
						<Text style={styles.headerText} category="s1">
							{item.username}
						</Text>
					</Layout>
					<Layout style={[styles.layout, { flex: 0.4 }]}>
						<TimeAgo time={item.created_at} style={{ textAlign: 'right', marginRight: 10 }} hideAgo={false} />
					</Layout>
				</Layout>
			</React.Fragment>
		);
		return (
			<TouchableOpacity key={item.id}>
				<Card status="success" header={Header} style={[styles.card, { marginTop: 5, marginBottom: 5 }]}>
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
												key={item.id}
											/>
										);
									else
										return (
											<TouchableWithoutFeedback
												onPress={() => {
													this.setState({ images: [{ url: htmlAttribs.src }] });
													this.openModal(0);
												}}
												key={item.id}
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
										);
								},
								code: (htmlAttribs, children, passProps) => {
									//console.log(children);
									/* 	const codeString = '(num) => num + 1';
									return (
										<SyntaxHighlighter language="javascript" style={docco}>
											{codeString}
										</SyntaxHighlighter>
									); */
								},
								blockquote: (htmlAttribs, children, passProps) => {
									console.log(children);
									const test = () => <CardHeader title="Maldives" />;
									return (
										<Layout>
											<Card header={test} status="success">
												{children}
											</Card>
										</Layout>
									);
								}
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
				</Card>
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
	},
	container: {
		flex: 1,
		flexDirection: 'row'
	},
	layout: {
		flex: 1,
		justifyContent: 'center'
	}
});
