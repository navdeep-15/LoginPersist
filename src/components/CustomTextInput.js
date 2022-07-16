import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class CustomTextInput extends React.Component {
  render() {
    return (
      <TextInput
        style={this.props.style}
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChangeText}
        keyboardType={this.props.keyboardType}
        autoFocus={true}
        value={this.props.value}
      />
    )
  }
}
