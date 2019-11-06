import { AppLoading } from 'expo';
import * as React from 'react';
import App from '../../main';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
/**
 * State
 */
export interface State {
	loading: boolean;
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
			loading: true
		};
	}

	/**
	 * Loads fonts
	 */
	componentDidMount = async () => {
		Font.loadAsync({
			Roboto: require('../../../assets/Roboto.ttf'),
			Roboto_medium: require('../../../assets/Roboto_medium.ttf'),
			...Ionicons.font
		});
		this.setState({ loading: false });
	};

	/**
	 * Renders setup
	 * @returns
	 */
	render() {
		if (this.state.loading) {
			return <AppLoading />;
		} else {
			return <App></App>;
		}
	}
}
