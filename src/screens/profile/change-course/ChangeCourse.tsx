import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType, Button } from 'react-native';
import { imagesTopik } from '../../../utils/PathImage';
import { COLORS, fonts } from '../../../themes';
import { RFFonsize } from '../../../utils/Fonts';
import { getBgStatus, getColorText, getTextStatus } from '../../../utils/CheckType';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchSync } from '../../../redux/hooks';
import { TopikCoursePayload, topikCourseRequest } from '../../../redux/course';
import { RootState } from '../../../redux/store';

interface Item {
    id: number;
    name: string;
    status: number;
    thumbnail: any;
}

const ChangeCourse: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { token } = useSelector((state: RootState) => state.auth);
    const { dataCourse } = useSelector((state: RootState) => state.course);
    
    const dispatch = useDispatch();


    const getPackageCourse = async () => {
        try {
            const payload: TopikCoursePayload = {
                token,
                codeApp: "TOPIK",
                pageIndex: 0,
                pageSize: 1000,

            };
            await dispatchSync(dispatch, topikCourseRequest, payload);
        } catch (error) {
            console.log(error);

        }
    };

    const handleChangeCourse = async () => {
        setVisible(!visible)
        await getPackageCourse()
    }


    const ButtonStatus: React.FC<{ item: Item }> = ({ item }) => {
        return (
            <Pressable style={[styles.rowAction, { backgroundColor: getBgStatus(item.status) }]}>
                <Text style={[styles.txtStatus, { color: getColorText(item.status) }]}>{getTextStatus(item.status)}</Text>
                <Image source={item.status === 0 ? imagesTopik.play_circle : imagesTopik.unlock} />
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={handleChangeCourse} style={styles.cssroowTouch}>
                <Image source={imagesTopik.change_course} />
                <Text style={styles.textTitle}>Đổi khoá học</Text>
                {
                    visible ?
                        <Image source={imagesTopik.chevron_right} /> :
                        <Image source={imagesTopik.chevron_right} style={{ transform: [{ rotate: '180deg' }] }} />
                }
            </Pressable>
            {visible && dataCourse.map((item) => (
                <View key={item.id} style={styles.itemContainer}>
                    <Pressable style={styles.dropdownItem}>
                        <Image source={{uri:item.thumbnail}} style={styles.image} />
                        <View style={styles.roiRight}>
                            <Text style={styles.txtName} numberOfLines={2}>{item.name}</Text>
                            <ButtonStatus item={item} />
                        </View>
                    </Pressable>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        shadowColor: COLORS.App,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemContainer: {
        backgroundColor: COLORS.WHITE,
        marginHorizontal: 16,
        borderRadius: 20,
        marginTop: 10
    },
    dropdownItem: {
        padding: 10,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    rowAction: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 30,
        marginTop: 10,
    },
    roiRight: {
        marginLeft: 20,
        flex: 1,
    },
    txtName: {
        fontFamily: fonts.inter,
        color: COLORS.TITLE_TASK,
        fontWeight: '600',
        fontSize: RFFonsize(14),
    },
    txtStatus: {
        fontFamily: fonts.inter,
        color: COLORS.TITLE_TASK,
        fontWeight: '500',
        fontSize: RFFonsize(12),
    },
    image: {
        width: 80,
        height: 80,
    },
    itemDetails: {
        marginLeft: '5%',
        marginTop: 10,
    },
    cssroowTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 10,
        backgroundColor: COLORS.WHITE,
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    textTitle: {
        flex: 1,
        marginLeft: 10,
        color: COLORS.TITLE_TASK,
        fontFamily: fonts.fontBold,
        fontSize: RFFonsize(14),
    }
});

export default ChangeCourse;
