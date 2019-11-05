import { AppLoading } from 'expo';
import * as React from 'react';
import App from '../../main';
import * as Font from 'expo-font';
/**
 * State
 */
export interface State {
	isLoading: boolean;
	isReady: boolean;
}

/**
 * Setup
 */
export default class Setup extends React.Component<{}, State> {
	/**
	 * Creates an instance of setup.
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isReady: false
		};
	}

	/**
	 * Components will mount
	 */
	componentWillMount() {
		this.loadFonts();
	}

	/**
	 * Loads fonts
	 */
	async loadFonts() {
		await Font.loadAsync({
			Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf')
		});
		this.setState({ isReady: true });
	}

	/**
	 * Renders setup
	 * @returns
	 */
	render() {
		if (!this.state.isReady || this.state.isLoading) {
			return <AppLoading />;
		}
		return <App />;
	}
}
