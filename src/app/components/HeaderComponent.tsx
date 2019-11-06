import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from 'react-native-ui-kitten';
import { Constants } from 'expo';
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
	BackIcon = style => <Icon {...style} name="arrow-back" />;

	EditIcon = style => <Icon {...style} name="edit" />;

	MenuIcon = style => <Icon {...style} name="more-vertical" />;

	BackAction = props => <TopNavigationAction {...props} icon={this.BackIcon} />;

	EditAction = props => <TopNavigationAction {...props} icon={this.EditIcon} />;

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

		const renderLeftControl = () => <this.BackAction onPress={onBackPress} />;

		const renderRightControls = () => [<this.EditAction />, <this.MenuAction />];
		return (
			<TopNavigation
				title={this.props.headerTitle}
				leftControl={renderLeftControl()}
				rightControls={renderRightControls()}
			/>
		);
	}
}

const styles: any = StyleSheet.create({
	header: {
		//paddingTop: 20,
		// borderWidth: 0,
		//flex: 1,
	}
});
