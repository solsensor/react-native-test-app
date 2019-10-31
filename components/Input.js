import React from 'react';
import {
	TextInput,
    StyleSheet,
} from 'react-native';

const Input = (props) => {
	return (
		<TextInput style={styles.input} {...props} />
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		fontSize: 16,
		borderColor: 'silver',
		borderBottomWidth: 1,
	},
});

export default Input;
