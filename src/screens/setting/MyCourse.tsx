import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderMain from '../../components/header/HeaderMain'
import BannerSearch from '../../components/banner-search/BannerSearch'
import Chapter from './chapter/Chapter'
import { COLORS } from '../../themes'
import StreakTracker from '../../components/streak-Tracker/StreakTracker'
import { imagesTopik } from '../../utils/PathImage'

const MyCourse = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.BG_App }}>
      <HeaderMain TextName={"Học bài"} />
      <ScrollView style={{ flex: 1 }}>

        <BannerSearch />
        <StreakTracker isCourse icon={imagesTopik.learn_light} description="Cùng học ít nhất một bài mới mỗi ngày nhé!" />
        <Chapter />
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyCourse

const styles = StyleSheet.create({})