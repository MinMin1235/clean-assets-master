import { memo, useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { COLORS, fonts } from "../../../themes";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Platform } from "../../../themes/platform";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme } from "victory-native";
import moment from "moment";
import { DataByDayT } from "../../../redux/statistics/types";


interface CategoryT {
    name: string,
    color: string,
    title: string
}


export interface ChartBarProps {
    chartTitle: string,
    currentCategories: CategoryT[],
    currentData: DataByDayT[] | any,
    onPressHistory: () => void
}


const ChartBar = memo(({ chartTitle, currentCategories, currentData, onPressHistory }: ChartBarProps) => {

    const result = currentCategories.map(category => ({
        name: category.name,
        data: currentData
            .filter(entry => entry[category.name] > 0)
            .map(entry => ({ day: entry.time, total: entry[category.name] }))
    })).filter(category => category.data.length > 0);

    const getColorByName = useCallback((name: string) => {
        const category = currentCategories.find(cat => cat.name === name);
        return category ? category.color : null;
    }, [])


    return (
        <View style={styles.box}>
            <View style={styles.header}>
                <Text style={styles.subTitle}>{chartTitle}</Text>
                <Pressable style={styles.rightBtn} onPress={onPressHistory}>
                    <Text style={styles.txt}>Lịch sử</Text>
                    <Image source={require('../../../assets/icons/profile/chevron-right.png')} style={styles.rightIcon} />
                </Pressable>
            </View>
            <View style={styles.chartContainer}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={30}
                    horizontal
                >
                    <VictoryAxis
                        tickFormat={(day) => moment(day * 1000).format("DD/MM")}
                        tickValues={currentData.map((e) => e.time)}
                        style={styles.styleAxis}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(total) => total}
                        style={styles.styleAxis}
                    />
                    <VictoryStack animate={{ duration: 500 }}>
                        {result.map((ele, index) => (
                            <VictoryBar
                                key={index}
                                data={ele.data}
                                x={"day"}
                                y={"total"}
                                style={{ data: { fill: getColorByName(ele.name), width: 16 } }}
                            />
                        ))}
                    </VictoryStack>
                </VictoryChart>
            </View>
            <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
                {currentCategories.map((item) =>
                    <OpitonView item={item} key={item.name} />
                )}
            </ScrollView>
        </View>
    )
})


export default ChartBar


const OpitonView = memo(({ item }: { item: CategoryT }) => {

    return (
        <View style={styles.optionContainer}>
            <View style={[styles.colorSq, { backgroundColor: item.color }]}></View>
            <Text style={styles.categoryTxt}>{item.title}</Text>
        </View>
    )
})



const styles = StyleSheet.create({
    box: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE,
        padding: Platform.SizeScale(14),
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subTitle: {
        fontFamily: fonts.inter,
        fontWeight: '700',
        fontSize: 18,
    },
    txt: {
        fontFamily: fonts.fontItalic,
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.COLOR_DESC
    },
    styleAxis: {
        axis: {
            stroke: COLORS.BG_Text,
        },
        tickLabels: {
            fill: COLORS.COLOR_DESC,
            fontSize: 12,
        },
        grid: {
            stroke: COLORS.BG_Text,
            strokeDasharray: 1,
        },
        ticks: {
            size: 3,
            stroke: COLORS.BG_Text,

        },
    } as any,
    chartContainer: {
        flex: 1,
        overflow: 'hidden',
        marginTop: -40,
        marginLeft: -10,
        marginBottom: -10
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Platform.SizeScale(6),
        marginBottom: Platform.SizeScale(10)
    },
    colorSq: {
        width: 16,
        height: 16,
        borderRadius: 4
    },
    categoryTxt: {
        fontFamily: fonts.inter,
        fontSize: 14,
        fontWeight: '400',
        marginLeft: Platform.SizeScale(6)
    },
    rightIcon: {
        height: 14,
        width: 14,
        resizeMode: 'contain',
        transform: [{ rotate: '-90deg' }],
        tintColor: COLORS.COLOR_DESC
    },
    rightBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
})