import React, { useState, useEffect } from 'react'
import RootNavigator from './src/screens/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './src/screens/Splash'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='RootNavigator' component={RootNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}