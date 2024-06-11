import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { imagesTopik } from '../../../utils/PathImage';
import { COLORS, fonts } from '../../../themes';
import { RFFonsize } from '../../../utils/Fonts';

interface ChapterItem {
    id: number;
    title: string;
    description: string
}

// Mock data for testing
const chapters: ChapterItem[] = [
    { id: 1, title: 'Tên chương: Bảng chữ cái', description: '18 bài học' },
    { id: 2, title: 'Tên chương: Bảng chữ cái', description: '18 bài học' },
    { id: 3, title: 'Tên chương: Bảng chữ cái', description: '18 bài học' },
    { id: 3, title: 'Tên chương: Bảng chữ cái', description: '18 bài học' },
    { id: 3, title: 'Tên chương: Bảng chữ cái', description: '18 bài học' },
    { id: 3, title: 'Tên chương: Bảng chữ cái', description: '18 bài học' },
    { id: 3, title: 'Tên chương: Bảng chữ cái', description: '18 bài học' },
];

const Chapter: React.FC = () => {


    const renderItem = ({ item }: { item: ChapterItem }) => (
        <View style={styles.chapterItem}>
            <Image source={imagesTopik.chapter} style={{ width: 50, height: 50 }} />
            <View style={styles.rowDesc}>
                <Text style={styles.txtTitle}>{item.title}</Text>
                <Text style={styles.textdesc}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={chapters}
            renderItem={renderItem}
            keyExtractor={(_item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={{ margin: 16, flex: 1 }}
            scrollEnabled={false}
        />

    );
};

export default Chapter;

const styles = StyleSheet.create({
    chapterItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: COLORS.WHITE,
        padding: 16,
        borderRadius: 20,
        shadowColor: COLORS.App,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    txtTitle: {
        fontFamily: fonts.fontBold,
        fontSize: RFFonsize(14),
        marginLeft: 16,
        color: COLORS.TITLE_TASK,
        flex: 1,
        fontWeight: '600'
    },
    rowDesc: {

    },
    textdesc: {
        fontFamily: fonts.fontBold,
        fontSize: RFFonsize(12),
        marginLeft: 16,
        color: COLORS.COLOR_DESC,
        flex: 1,
    }
});
