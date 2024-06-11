import { memo, useCallback, useEffect, useState } from "react"
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { fonts } from "../../../themes/fonts"
import { Platform } from "../../../themes/platform"
import { COLORS, commonStyles } from "../../../themes"
import Toast from "../../../components/toast-message/Toast"
import { DataFullTestT, StatisticsPayload, StatisticsResponseT } from "../../../redux/statistics/types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { getStatisticsTopikMasterRequest } from "../../../redux/statistics/actions"
import { useIsFocused } from "@react-navigation/native"
import ChartBar from "./ChartBar"


const TopikMasterStats = memo(() => {
    const { token } = useSelector((state: RootState) => state.auth)
    const { topikMaster } = useSelector((state: RootState) => state.statistics)
    console.log("🚀 ~ TopikMasterStats ~ topikMaster:", topikMaster)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            const payload: StatisticsPayload = {
                token,
                type: 2,
            }

            dispatch(getStatisticsTopikMasterRequest(payload))
        }
    }, [isFocused, token])


    const categories = [
        { name: 'totalListening', color: COLORS.LISTENING, title: 'Nghe' },
        { name: 'totalWriting', color: COLORS.WRITING, title: 'Viết' },
        { name: 'totalReading', color: COLORS.READING, title: 'Đọc' },
        { name: 'totalFulll', color: COLORS.FULL, title: 'Thi tiêu chuẩn' }
    ];
    const last7days = topikMaster.dataByDay.slice(topikMaster.dataByDay.length - 7, topikMaster.dataByDay.length)

    const onPressHistory = useCallback(() => {

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/icons/icons-tabbar/icon_master_active.png')} style={styles.icon} />
                <Text style={styles.title}>TOPIK Master</Text>
            </View>
            <DataFullTestStats />
            <ChartBar
                chartTitle="Bài thi đã làm"
                currentCategories={categories}
                currentData={last7days}
                onPressHistory={onPressHistory}
            />
            {/* <DataSkillTestStats data={dataSkillTest} /> */}
        </View>
    )
})


export default TopikMasterStats


export const DataFullTestStats = memo(() => {
    const [visible, setVisible] = useState<boolean>(false)
    const { topikMaster } = useSelector((state: RootState) => state.statistics)

    const onPressInfoIcon = useCallback(() => {
        setVisible(true)
        setTimeout(() => setVisible(false), 2000)
    }, [])


    return (
        <View style={styles.box}>
            <View style={styles.subTitleHeader}>
                <Text style={styles.subTitle}>Đề thi tiêu chuẩn</Text>
                <Pressable onPress={onPressInfoIcon}
                    hitSlop={commonStyles.hitSlop}
                >
                    <Image source={require('../../../assets/icons/alert-circle.png')} style={styles.infoIcon} />
                </Pressable>
                <Toast
                    visible={visible}
                    message="Kết quả làm bài mới nhất"
                    duration={2000}
                    backgroundColor={COLORS.TOAST_BG}
                    style={styles.toast}
                />
            </View>
            <View style={styles.statLine}>
                <Image source={require('../../../assets/icons/statistics/average.png')} style={styles.statIcon} />
                <View style={{ gap: 5 }}>
                    <Text style={styles.bldTxt}>Điểm thi</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.score}>{topikMaster.dataFullTest.totalScore}</Text>
                        <Text style={styles.totalScore}>/{topikMaster.dataFullTest.scoreConfig}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.statLine}>
                <Image source={require('../../../assets/icons/statistics/target.png')} style={styles.statIcon} />
                <View style={{ gap: 5 }}>
                    <Text style={styles.bldTxt}>Trình độ</Text>
                    <Text style={styles.score}>{topikMaster.dataFullTest.skill}</Text>
                </View>
            </View>
        </View>
    )
})


// const DataSkillTestStats = memo(({ data }: { data: any }) => {
//     const [visible, setVisible] = useState<boolean>(false)

//     const onPressInfoIcon = useCallback(() => {
//         setVisible(true)
//         setTimeout(() => setVisible(false), 2000)
//     }, [])


//     return (
//         <View style={styles.box}>
//             <View style={styles.subTitleHeader}>
//                 <Text style={styles.subTitle}>Đề thi kỹ năng</Text>
//                 <Pressable onPress={onPressInfoIcon}
//                     hitSlop={commonStyles.hitSlop}
//                 >
//                     <Image source={require('../../../assets/icons/alert-circle.png')} style={styles.infoIcon} />
//                 </Pressable>
//                 <Toast
//                     visible={visible}
//                     message="Kết quả làm bài Đề thi kỹ năng mới nhất"
//                     duration={2000}
//                     backgroundColor={COLORS.TOAST_BG}
//                     style={styles.toast}
//                 />
//             </View>
//             <View style={styles.statLine}>
//                 <Image source={require('../../../assets/icons/statistics/listening.png')} style={styles.statIconSmall} />
//                 <SkillStatLine name={'Nghe'} score={data.listening} />
//             </View>
//             <View style={styles.statLine}>
//                 <Image source={require('../../../assets/icons/statistics/writing.png')} style={styles.statIconSmall} />
//                 <SkillStatLine name={'Viết'} score={data.writing} />
//             </View>
//             <View style={styles.statLine}>
//                 <Image source={require('../../../assets/icons/statistics/reading.png')} style={styles.statIconSmall} />
//                 <SkillStatLine name={'Đọc'} score={data.reading} />
//             </View>
//         </View>
//     )
// })


// const SkillStatLine = memo(({ name, score }: { name: string, score: number }) => {

//     return (
//         <View style={styles.rowLine}>
//             <Text style={[styles.bldTxt, { fontSize: 18 }]}>{name}</Text>
//             <View style={{ flexDirection: 'row' }}>
//                 <Text style={styles.score}>{score}</Text>
//                 <Text style={styles.totalScore}>/100</Text>
//             </View>
//         </View>
//     )
// })



const styles = StyleSheet.create({
    container: {
        marginHorizontal: Platform.SizeScale(20),
        gap: Platform.SizeScale(20),
        flex: 1,
    },
    title: {
        fontFamily: fonts.inter,
        fontWeight: '600',
        fontSize: 22,
        color: COLORS.App,
        paddingLeft: Platform.SizeScale(16)
    },
    icon: {
        height: Platform.SizeScale(28),
        width: Platform.SizeScale(28),
        resizeMode: 'contain'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.SizeScale(10)
    },
    subTitle: {
        fontFamily: fonts.inter,
        fontWeight: '700',
        fontSize: 18,

    },
    subTitleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        borderRadius: 20,
        backgroundColor: COLORS.WHITE,
        padding: Platform.SizeScale(14),
        gap: Platform.SizeScale(14),
        paddingHorizontal: Platform.SizeScale(20),
        shadowColor: COLORS.App,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    infoIcon: {

    },
    toast: {
        position: 'absolute',
        right: 0,
        top: 20,
        padding: 5,
        borderRadius: 10
    },
    statIcon: {
        height: Platform.SizeScale(40),
        width: Platform.SizeScale(40),
    },
    statIconSmall: {
        height: Platform.SizeScale(32),
        width: Platform.SizeScale(32),
        resizeMode: 'contain'
    },
    statLine: {
        flexDirection: 'row',
        gap: Platform.SizeScale(10),
        alignItems: 'center',
        // height: Platform.SizeScale(40)
    },
    bldTxt: {
        fontFamily: fonts.inter,
        fontSize: 14,
        fontWeight: '500',
    },
    score: {
        color: COLORS.App,
        fontFamily: fonts.inter,
        fontWeight: '700',
        fontSize: 20
    },
    totalScore: {
        fontFamily: fonts.inter,
        fontWeight: '400',
        fontSize: 20,
        color: COLORS.COLOR_DESC,
        opacity: 0.5
    },
    rowLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center'
    }
})