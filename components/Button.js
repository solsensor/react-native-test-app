import React from 'react';
import {
	Button,
    StyleSheet,
} from 'react-native';

const MyButton = (props) => {
	return (
		<Button style={styles.button} {...props} />
	);
};

const styles = StyleSheet.create({
	button: {},
});

export default MyButton;
