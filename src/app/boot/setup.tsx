import { AppLoading } from 'expo';
import * as React from 'react';
import App from '../../main';
import { SafeAreaView } from 'react-navigation';
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
