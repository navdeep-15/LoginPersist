import { SafeAreaView, View, Text, StyleSheet, Modal, Image, TouchableOpacity, BackHandler, Alert, StatusBar } from 'react-native'
import { normalize } from '../utils/dimensions'
import React, { useState, useEffect } from 'react'
import CustomTitleText from '../components/CustomTitleText'
import CustomTextInput from '../components/CustomTextInput'
import CustomPasswordInput from '../components/CustomPasswordInput'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

    const login = async () => {

        if (email && password) {
            if (!emailPattern.test(email))
                alert('Username is not valid')
            else {
                try {
                    let value = await AsyncStorage.getItem(email)
                    if (value != null) {
                        value = JSON.parse(value)
                        if (value?.password === password) {
                            try {
                                await AsyncStorage.setItem('isLoggedIn', 'true')
                                await AsyncStorage.setItem('lastEmail', email)
                            } catch (error) {
                                console.warn(error);
                            }
                            props?.navigation?.navigate("Home", { userInfo: value })
                            setemail('')
                            setpassword('')
                        }
                        else
                            alert('Username or Password is wrong')
                    }
                    else
                        alert('User not Found')
                } catch (error) {
                    console.warn(error);
                }
            }

        }
        else
            alert('Please fill all fields')
    }

    return (
        <SafeAreaView>
            <StatusBar hidden={true} />
            <Image
                source={require('../assets/ic-sign-up-graphic.png')}
                style={styles.bgimg}
            />
            <TouchableOpacity onPress={() => props?.navigation?.navigate('Signup')}>
                <Text style={styles.signuptext}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <CustomTitleText style={styles.signintext}>
                    Sign In
                </CustomTitleText>
                <Text style={styles.subtitletext}>Welcome to Shembe!</Text>
                <CustomTextInput
                    style={styles.txtinput}
                    placeholder={'Email address'}
                    onChangeText={text => setemail(text)}
                    secureTextEntry={false}
                    value={email}
                />
                <CustomPasswordInput
                    style={styles.passwordcontainer}
                    placeholder={'Password'}
                    onChangeText={text => setpassword(text)}
                    secureTextEntry={true}
                    value={password}
                />
                <TouchableOpacity style={styles.submitbtn} onPress={login}>
                    <LinearGradient colors={['#01a7a3', '#66eb8f']} style={styles.gradientstyle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <Text style={styles.submitbtntext}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    bgimg: {
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    signuptext: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#01a7a3',
        textAlign: 'right',
        marginRight: normalize(14.5),
        marginTop: normalize(28),
    },
    signintext: {
        marginTop: normalize(20),
    },
    subtitletext: {
        marginTop: normalize(24.5),
        fontWeight: 'bold',
        fontSize: 15,
    },
    txtinput: {
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
        paddingHorizontal: 18,
        marginTop: normalize(25),
        borderWidth: 1,
        borderColor: '#01a7a3'
    },
    passwordcontainer: {
        flexDirection: 'row',
        alignItems: 'center', backgroundColor: '#f4f4f4',
        paddingHorizontal: 18,
        borderRadius: 5,
        marginTop: normalize(15),
        borderWidth: 1,
        borderColor: '#01a7a3'
    },
    forgottext: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#8c8c8c',
        marginTop: normalize(20),
    },
    submitbtn: {
        marginTop: normalize(25),
        marginBottom: 350,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 25,
    },
    modalview: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 45,
        paddingRight: 45,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modaltitle: {
        marginTop: normalize(25),
        fontSize: 16,
        fontWeight: 'bold'
    },
    modaldescription: {
        marginTop: normalize(15),
        fontSize: 14,
        textAlign: 'center'
    },
    modalokaybtn: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#01a7a3',
        marginTop: normalize(35),
    },
});