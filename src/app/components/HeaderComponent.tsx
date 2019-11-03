import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
/**
 * Header props
 */
export interface HeaderProps {
	headerTitle?: string;
	//hasBackButton?: boolean; //? means optional
	//backButtonNavigate?: string;
	//navigation: any;
}

/**
 * Header state
 */
export interface HeaderState {}

/**
 * Header component
 */
export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
	/**
	 * Default props of header component
	 */
	static defaultProps = { hasBackButton: false, headerTitle: 'Manjaro Forum' };

	/**
	 * Creates an instance of header component.
	 * @param props
	 */
	constructor(props) {
		super(props);
	}

	/**
	 * Render back button of header component
	 */
	/*  renderBackButton = () => {
        const { hasBackButton } = this.props;
        if (hasBackButton) {
            return (
                <View>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate(this.props.backButtonNavigate);
                        }}
                        transparent
                    >
                        <Icon style={styles.icon} name="arrow-back" />
                    </Button>
                </View>
            );
        } else {
            return null;
        }
    }; */

	/**
	 * Renders header component
	 * @returns
	 */
	render() {
		return (
			<Header
				placement="left"
				leftComponent={{ icon: 'menu', color: '#fff' }}
				centerComponent={{ text: this.props.headerTitle, style: { color: '#fff' } }}
				rightComponent={{ icon: 'home', color: '#fff' }}
				containerStyle={styles.header}
			/>
		);
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
