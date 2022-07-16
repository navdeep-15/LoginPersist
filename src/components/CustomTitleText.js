import React from 'react';
import { View,Text,Image, StyleSheet } from 'react-native';

export default class CustomTitleText extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <Text style={styles.txt}>
            {this.props.children}
          </Text>
          <Image
            source={require('../assets/ic-slection.png')}
            style={styles.line}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txt:{
    fontSize:25,
    fontWeight:'bold',
  },
  line:{
    marginTop:5
  }
});
