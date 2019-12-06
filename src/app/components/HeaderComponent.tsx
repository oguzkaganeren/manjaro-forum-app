import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Constants from 'expo-constants';
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

	MenuIcon = style => <Icon {...style} name="menu-outline" />;

	MenuAction = props => <TopNavigationAction {...props} icon={this.MenuIcon} />;
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
		const onBackPress = () => {};

		const renderLeftControl = () => <this.MenuAction onPress={onBackPress} />;
		return <TopNavigation style={styles.container} title={this.props.headerTitle} leftControl={renderLeftControl()} />;
	}
}

const styles: any = StyleSheet.create({
	header: {
		//paddingTop: 20,
		// borderWidth: 0,
		//flex: 1,
	},
	container: {
		marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
	}
});
