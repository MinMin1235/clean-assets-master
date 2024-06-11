import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { imagesTopik } from '../../../utils/PathImage';
import { COLORS, fonts } from '../../../themes';
import { RFFonsize } from '../../../utils/Fonts';

interface ItemSupportProps {
  icon: any;
  title: string;
  subTitle?: string;
}

const ItemSupport: React.FC<ItemSupportProps> = ({ icon, title, subTitle }) => {
  return (
    <View style={styles.rowSup}>
      <Image source={icon} />
      <View style={styles.textContainer}>
        <Text style={styles.txtTitle}>{title}</Text>
        {subTitle && <Text style={styles.txtDesc}>{subTitle}</Text>}
      </View>
    </View>
  );
};

const Support: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtSup}>Hỗ trợ</Text>
      <ItemSupport icon={imagesTopik.hotline} title="Hotline & Zalo:" subTitle="096 393 1066" />
      <ItemSupport icon={imagesTopik.email} title="Email:" subTitle="support@edmicro.vn" />
      <ItemSupport icon={imagesTopik.book} title="Hướng dẫn sử dụng" />
      <View style={styles.spacing} />
      <ItemSupport icon={imagesTopik.shield} title="Chính sách bảo mật" />
      <ItemSupport icon={imagesTopik.file_text} title="Điều khoản dịch vụ" />
      <View style={styles.spacing} />
      <ItemSupport icon={imagesTopik.globe} title="Website:" subTitle="https://topik.onluyen.vn" />
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    margin: 16,
    borderRadius: 20,
    paddingVertical: 16,
    shadowColor: COLORS.App,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  rowSup: {
    flexDirection: 'row',
    marginHorizontal: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  textContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  txtTitle: {
    color: COLORS.TITLE_TASK,
    fontFamily: fonts.inter,
    fontWeight: '400',
    fontSize: RFFonsize(13),
  },
  txtDesc: {
    color: COLORS.BLACK,
    fontFamily: fonts.inter,
    fontWeight: '600',
    fontSize: RFFonsize(13),
    marginLeft: 10,
  },
  txtSup: {
    fontFamily: fonts.inter,
    fontSize: RFFonsize(16),
    color: COLORS.TITLE_TASK,
    fontWeight: '600',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 16,
  },
  spacing: {
    height: 16,
  },
});
