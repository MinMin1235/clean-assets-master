import { memo, useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { COLORS, fonts } from "../../../themes"
import { Platform } from "../../../themes/platform"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { LineSegment, VictoryChart, VictoryContainer, VictoryPie, VictoryTheme } from "victory-native"
import { useIsFocused } from "@react-navigation/native"
import { getChartCourseCurrentRequest } from "../../../redux/statistics/actions"
import { Authorization } from "../../../redux/rootTypes"
import { PieChart } from "../../../redux/statistics/types"









const ChartPie = memo(() => {
    const dispatch = useDispatch()
    const { token } = useSelector((state: RootState) => state.auth)
    const [currentData, setCurrentData] = useState([])

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            const payload: Authorization = {
                token,
                resolve: (res: PieChart) => {
                    const percentWorked = Math.ceil(res.totalLessonFinish / res.totalLesson * 100)
                    const percentLeftOver = 100 - percentWorked

                    const worked = { x: `${res.totalLessonFinish} bài (${percentWorked}%)`, y: res.totalLessonFinish }
                    const leftOver = { x: `${res.totalLesson} bài (${percentLeftOver}%)`, y: res.totalLesson }

                    setCurrentData([worked, leftOver])
                },
            }

            dispatch(getChartCourseCurrentRequest(payload))
        }

    }, [isFocused, token])



    return (
        <View style={styles.box}>
            <Text style={styles.subTitle}>Tiến độ hoàn thành kiến thức</Text>
            <View style={{ flex: 1, alignItems: 'center' }}>
                {currentData.length > 1
                    ? <VictoryPie
                        data={currentData}
                        labelIndicator={<LineSegment style={{ stroke: COLORS.App, strokeDasharray: 1, fill: "none", }} />}
                        labelIndicatorInnerOffset={80}
                        labelIndicatorOuterOffset={5}
                        style={{
                            labels: {
                                fontSize: 16,
                                fill: COLORS.App,
                                fontFamily: fonts.inter,
                                fontWeight: 'bold'
                            },
                            data: {

                            }
                        }}
                        colorScale={[COLORS.App, COLORS.BG_Text]}
                    />
                    : <View style={styles.emptyView}>
                        <Text style={styles.emptyTxt}>No data yet.</Text>
                        <Text style={styles.emptyTxt}>Start learning and check your progress.</Text>
                    </View>
                }
            </View>
            <View style={{ flexDirection: 'row' }}>
                <OpitonView item={{ color: COLORS.App, title: 'Hoàn thành' }} />
                <OpitonView item={{ color: COLORS.BG_Text, title: 'Chưa hoàn thành' }} />
            </View>
        </View>
    )
})



export default ChartPie


const OpitonView = memo(({ item }: { item: any }) => {

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
    subTitle: {
        fontFamily: fonts.inter,
        fontWeight: '700',
        fontSize: 18,
    },
    emptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: Platform.SizeScale(20)
    },
    emptyTxt: {
        color: COLORS.COLOR6,
        fontSize: 14,
        fontFamily: fonts.fontItalic,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Platform.SizeScale(10),
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
})