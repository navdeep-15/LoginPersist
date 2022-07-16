import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, BackHandler } from 'react-native'
import { normalize } from '../utils/dimensions'
import React, { useState, useEffect } from 'react'
import CustomTitleText from '../components/CustomTitleText'
import CustomTextInput from '../components/CustomTextInput'
import CustomPasswordInput from '../components/CustomPasswordInput'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup(props) {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [number, setnumber] = useState('')
    const [password, setpassword] = useState('')
    const [checked, setchecked] = useState(true)

    const namePattern = /^[a-zA-Z ]{2,40}$/
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const numberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    useEffect(() => {
        const backAction = () => {
            props?.navigation?.goBack()
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, []);

    const validate = () => {
        let type = '';
        if (!namePattern.test(name))
            type = 'Username'
        else if (!emailPattern.test(email))
            type = 'Email'
        else if (!numberPattern.test(number))
            type = 'Contact Number'
        else if (!passwordPattern.test(password))
            type = 'Password'
        return type
    }

    const onSubmit = async () => {
        if (name && email && number && password && !checked) {
            let errorType = validate()
            if (errorType?.length > 0)
                alert(errorType + ' is not valid')
            else {
                let obj = {
                    name,
                    email,
                    number,
                    password
                }
                try {
                    await AsyncStorage.setItem(email, JSON.stringify(obj))
                    alert('Signup Sucessfull')
                    props?.navigation?.goBack()
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
            <TouchableOpacity onPress={() => props?.navigation?.goBack()}>
                <Image source={require('../assets/ic-back-btn.png')} style={styles.closebtn} />
            </TouchableOpacity>
            <View style={styles.container}>
                <CustomTitleText style={styles.signintext}>
                    Sign Up
                </CustomTitleText>
                <Text style={styles.subtitletext}>
                    Please fill the details below
                </Text>
                <CustomTextInput
                    style={styles.txtinput}
                    placeholder={'Full Name'}
                    onChangeText={(text) => setname(text)}
                    secureTextEntry={false}
                    value={name}

                />
                <CustomTextInput
                    style={styles.txtinput}
                    placeholder={'Email address'}
                    onChangeText={(text) => setemail(text)}
                    secureTextEntry={false}
                    keyboardType={'email-address'}
                    value={email}
                />
                <CustomTextInput
                    style={styles.txtinput}
                    placeholder={'Contact number'}
                    onChangeText={(text) => setnumber(text)}
                    secureTextEntry={false}
                    keyboardType={'number-pad'}
                    value={number}
                />
                <CustomPasswordInput
                    style={styles.passwordcontainer}
                    placeholder={'Password'}
                    onChangeText={(text) => setpassword(text)}
                    secureTextEntry={true}
                    value={password}
                />
                <View style={styles.rowview}>
                    <TouchableOpacity style={styles.checkbtn} onPress={() => setchecked(!checked)}>
                        <Image
                            source={checked
                                ? require('../assets/ic-check-unselected.png')
                                : require('../assets/ic-check-selected.png')
                            }
                            style={styles.checkbtn}
                        />
                    </TouchableOpacity>
                    <Text style={styles.txt1}>{`I agree to the `}</Text>
                    <Text style={styles.txt2}>{`Terms & Conditions`}</Text>
                    <Text style={styles.txt1}>{` of this App`}</Text>
                </View>
                <TouchableOpacity style={styles.submitbtn} onPress={onSubmit}>
                    <LinearGradient colors={['#01a7a3', '#66eb8f']} style={styles.gradientstyle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <Image source={{ uri: 'https://img.icons8.com/android/24/ffffff/right.png' }} style={styles.btnimg} />
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
    signintext: {
        marginTop: normalize(48),
    },
    subtitletext: {
        marginTop: normalize(24),
        fontSize: 15,
        fontWeight: 'bold'
    },
    txtinput: {
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
        paddingHorizontal: 18,
        marginTop: normalize(15),
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
    closebtn: {
        marginLeft: normalize(14.5),
        marginTop: normalize(20)
    },
    submitbtn: {
        marginTop: normalize(30),
        alignSelf: 'flex-end'
    },
    gradientstyle: {
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(56),
        height: normalize(56),
    },
    btnimg: {
        width: normalize(20.5),
        height: normalize(20),
    },
    rowview: {
        flexDirection: 'row',
        marginTop: normalize(25),
        alignItems: 'center'
    },
    checkbtn: {
        marginRight: normalize(6.5),
    },
    txt1: {
        color: '#8c8c8c',
        fontSize: 12.5,
    },
    txt2: {
        color: '#01a7a3',
        fontSize: 12.5,
        fontWeight: 'bold'
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