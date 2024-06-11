import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik } from "formik";
import AvatarImage from '../../../components/avatar-image/AvatarImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormValues from '../../../components/form-common';
import { useAccountStyle } from '../styles';
import { Platform } from '../../../themes/platform';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenRouteT } from '../../../navigations/types';
import { UpdateProfileSchema } from '../../../utils/Validate';
import ImagePicker from "react-native-image-crop-picker";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const { height } = Dimensions.get("window");
const EditProfile = () => {
    const styles = useAccountStyle();
    const navigation = useNavigation<StackNavigationProp<ScreenRouteT>>();

    const { displayName, avatar, dataUser, loadingAvatar, userName } = useSelector((state: RootState) => state.user);

    const ViewAvatar = () => {
        return (
            <View style={{ marginTop: -50 }}>
                <AvatarImage
                    uri={avatar}
                    isLoading={loadingAvatar}
                    onChangeAvatar={chooseImage}
                    canEdit={true}
                    size={Platform.SizeScale(110)}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                    }}
                />
                <Text style={styles.inputName} numberOfLines={1}>{displayName}</Text>
            </View>
        )
    }

    const onPressButton = () => { }


    const chooseImage = () => {
        ImagePicker.openPicker({
            width: 250,
            height: 250,
            cropping: true,
            includeBase64: true,
        })
            .then((image: any) => {
                console.log("image", image);
                postChangeAva(image?.data);
            })
            .catch((err) => {
                if (err.toString() == "Error: User did not grant library permission.") {
                    Alert.alert("", "Hãy cho phép ứng dụng truy cập vào thư viện ảnh!");
                }
            });
    };

    const postChangeAva = (base64: any) => {
        // dispatch(
        //     postChangeAvatarRequest({
        //         token: token,
        //         body: {
        //             email: dataUser.Email,
        //             extFile: "png",
        //             imageBase64: `data:image/png;base64,${base64}`,
        //         },
        //         resolve: () => { },
        //         reject: () => { },
        //     })
        // );
    };
    return (
        <View style={styles.wallet}>
            <ViewAvatar />

            <KeyboardAwareScrollView
                style={{ flex: 1, paddingVertical: 50 }}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={height * 0.01}
                enableOnAndroid={true}
                bounces={false}
            >
                <Formik
                    initialValues={{
                        phoneNumber: dataUser?.PhoneNumber,
                        displayName: displayName,
                        email: dataUser?.userName
                    }}
                    validationSchema={UpdateProfileSchema}
                    onSubmit={onPressButton}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                        <View style={{ marginHorizontal: 20 }}>
                            <FormValues
                                label={"Tên hiển thị "}
                                placeholder={"Tên hiển thị"}
                                editable={true}
                                onChangeText={handleChange("displayName")}
                                value={values.displayName}
                                error={touched.displayName && errors.displayName ? errors.displayName.toString() : ""}
                                renderIcon
                            />

                            <FormValues
                                label={"Số điện thoại"}
                                placeholder={"Số điện thoại"}
                                editable={true}
                                onChangeText={handleChange("phoneNumber")}
                                value={values.phoneNumber}
                                renderIcon
                            />

                            <FormValues
                                label={"E-mail"}
                                placeholder={"E-mail"}
                                editable={false}
                                onChangeText={handleChange("email")}
                                value={values.email}
                                colorText
                                renderLockIcon
                                error={touched.email && errors.email ? errors.email.toString() : ""}

                            />

                            <Pressable
                                // onPress={handleSubmit} 
                                style={styles.styButton}>
                                <Text style={styles.txtSubmit}>Cập nhật</Text>
                            </Pressable>
                            <View style={{ height: 15 }}></View>
                        </View>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({})