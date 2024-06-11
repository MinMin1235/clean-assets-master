import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HeaderMain from '../../components/header/HeaderMain';
import { COLORS } from '../../themes';
import TopikMasterStats from './components/TopikMasterStats';
import HocBaiStats from './components/HocBaiStats';

const Reports = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.BG_App }}>
      <HeaderMain TextName={"Báo cáo"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TopikMasterStats />
        <HocBaiStats />
      </ScrollView>
    </SafeAreaView >
  );
};

export default Reports;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
