import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function Splash(props) {

    const [isLoggedIn, setisLoggedIn] = useState(undefined)
    const [isLoadingDone, setisLoadingDone] = useState(false)

    useEffect(() => {
        loadInfo()
    }, [])

    useEffect(() => {
        if (isLoadingDone && isLoggedIn !== undefined) {
            setTimeout(() => {
                props?.navigation?.navigate('RootNavigator', { isLoggedIn: isLoggedIn })
            }, 2000)
        }
    }, [isLoadingDone])

    const loadInfo = async () => {
        try {
            const value = await AsyncStorage.getItem('isLoggedIn')
            console.log('readed value-->>', value);
            if (value === 'true')
                setisLoggedIn(true)
            else
                setisLoggedIn(false)
        } catch (error) {
            console.warn(error);
        }
        finally {
            setisLoadingDone(true)
        }
    }

    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <LottieView
                resizeMode='contain'
                source={require('../assets/lottie.json')}
                autoPlay
            />
            <Text style={{ fontSize: 80, textAlign: 'center', fontWeight: 'bold', color: '#01a7a3', }}>Splash{'\n'}Screen</Text>
        </View>
    )
}