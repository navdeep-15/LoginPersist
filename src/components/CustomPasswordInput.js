import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class CustomPasswordInput extends React.Component {
  constructor()
  {
    super();
    this.state={checked:false};
  }
  toogleCheck=()=>{
    this.setState({ checked: !this.state.checked });
  }
  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          style={styles.txt}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          secureTextEntry={!this.state.checked}
          keyboardType={this.props.keyboardType}
          value={this.props.value}
        />
        <TouchableOpacity style={styles.eyebtn} onPress={this.toogleCheck}>
          <Image 
            style={styles.eyeimg}
            source={!this.state.checked
                ?require('../assets/ic-eye-disabled.png')
                :require('../assets/ic-eye-enabled.png')
              }  
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txt: {
    flex: 0.95
  },
  eyebtn: {
    flex: 0.05
  },eyeimg:{
    height: 10.5, 
    width: 20
  }
});
