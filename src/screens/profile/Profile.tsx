import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderMain from '../../components/header/HeaderMain'
import EditProfile from './edit-profile/EditProfile'
import { imagesTopik } from '../../utils/PathImage'
import { useAccountStyle } from './styles'
import { useDispatch } from 'react-redux'
import Support from './support/Support'
import ChangeCourse from './change-course/ChangeCourse'
import { signOutRequest } from '../../redux/auth'
import { COLORS } from '../../themes'

const Profile = () => {
    const styles = useAccountStyle()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(signOutRequest())
    }
    const ButtonLogout = () => {
        return (
            <Pressable style={styles.btnPress} onPress={logout}>
                <Image source={imagesTopik.logout} />
                <Text style={styles.txtBtn}>Đăng xuất</Text>
            </Pressable>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: COLORS.BG_App }}>
            <HeaderMain TextName={"Cá nhân"} />
            <ScrollView style={{ flex: 1 }}>
                <EditProfile />
                <ChangeCourse />
                <Support />
                <ButtonLogout />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile

