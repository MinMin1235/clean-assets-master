import { memo, useCallback } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { Platform } from "../../../themes/platform"
import { fonts } from "../../../themes/fonts"
import { COLORS } from "../../../themes/colors"
import ChartPie from "./ChartPie"
import ChartBar from "./ChartBar"








const HocBaiStats = memo(() => {

    const categories = [
        { name: 'Summary', color: COLORS.LISTENING, title: 'Summary' },
        { name: 'Flashcard', color: COLORS.WRITING, title: 'Flashcard' },
        { name: 'Exercise', color: COLORS.READING, title: 'Exercise' },
    ];

    const last7days = [
        { time: 1717088400, Summary: 0, Flashcard: 0, Exercise: 0 },
        { time: 1717174800, Summary: 0, Flashcard: 0, Exercise: 0 },
        { time: 1717261200, Summary: 0, Flashcard: 0, Exercise: 0 },
        { time: 1717347600, Summary: 0, Flashcard: 0, Exercise: 0 },
        { time: 1717434000, Summary: 1, Flashcard: 3, Exercise: 1 },
        { time: 1717520400, Summary: 1, Flashcard: 1, Exercise: 1 },
        { time: 1717606800, Summary: 1, Flashcard: 0, Exercise: 2 }
    ]

    const onPressHistory = useCallback(() => {

    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/icons/icons-tabbar/icon_book_active.png')} style={styles.icon} />
                <Text style={styles.title}>Học bài</Text>
            </View>
            <ChartPie />
            <ChartBar
                chartTitle="Kiến thức đã học"
                currentCategories={categories}
                currentData={last7days}
                onPressHistory={onPressHistory}
            />
        </View>
    )
})



export default HocBaiStats



const styles = StyleSheet.create({
    container: {
        marginHorizontal: Platform.SizeScale(20),
        gap: Platform.SizeScale(20),
        flex: 1,
        marginVertical: Platform.SizeScale(30)
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
})