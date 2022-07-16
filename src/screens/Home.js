import { SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, BackHandler, Alert, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { normalize } from '../utils/dimensions'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(props) {

    const [userInfo, setuserInfo] = useState({})

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold On', 'Are you sure you want to exit', [
                { text: "No", onPress: () => null, style: "cancel" },
                { text: 'Yes', onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        try {
            let email = await AsyncStorage.getItem('lastEmail')
            let value = await AsyncStorage.getItem(email)
            if (value != null) {
                value = JSON.parse(value)
                setuserInfo(value)
            }
        } catch (error) {
            console.warn(error);
        }
    }


    const logout = async () => {
        await AsyncStorage.removeItem('isLoggedIn')
        props?.navigation?.navigate("Login")
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', }}>
            <StatusBar hidden={true} />
            <Image
                source={{ uri: 'https://miro.medium.com/max/1400/1*ub1DguhAtkCLvhUGuVGr6w.png' }}
                style={{ width: '100%', height: 200 }}
            />
            <Text style={styles.signuptext}>Home</Text>
            <Text style={styles.text}>Name : {props?.route?.params?.userInfo?.name ?? userInfo?.name}</Text>
            <Text style={styles.text}>Email : {props?.route?.params?.userInfo?.email ?? userInfo?.email}</Text>
            <Text style={styles.text}>Number : {props?.route?.params?.userInfo?.number ?? userInfo?.number}</Text>
            <TouchableOpacity style={styles.submitbtn} onPress={logout}>
                <LinearGradient colors={['#01a7a3', '#66eb8f']} style={styles.gradientstyle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.submitbtntext}>Logout</Text>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signuptext: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#01a7a3',
        textAlign: 'center',
        marginTop: normalize(28),
    },
    submitbtn: {
        marginTop: normalize(80),
    },
    submitbtntext: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: "bold",
        padding: 15
    },
    gradientstyle: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#01a7a3',
        textAlign: 'center',
        marginTop: normalize(50),
    },
})