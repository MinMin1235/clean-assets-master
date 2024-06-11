import { useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { COLORS, fonts } from "../../themes";
import { Platform } from "../../themes/platform";
import { RFFonsize } from "../../utils/Fonts";


const { width } = Dimensions.get('window')

export const useAccountStyle = () => {
    return useMemo(
        () =>
            StyleSheet.create({
                tetxPass: {
                    fontFamily: fonts.nunito,
                    fontSize: Platform.SizeScale(14),
                    color: "#2361AF",
                    fontWeight: "400",
                    textDecorationLine: "underline",
                },

                rowSet: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                },
                styButton: {
                    backgroundColor: COLORS.App,
                    alignItems: "center",
                    paddingVertical: 13,
                    borderRadius: 30,
                    marginTop: 30,
                    marginHorizontal: 30,
                    width: 200,
                    alignSelf: 'center'
                },
                txtSubmit: {
                    fontFamily: fonts.nunito,
                    color: "#fff",
                    fontSize: Platform.SizeScale(18),
                    fontWeight: "800",
                },
                dropDownButton: {
                    backgroundColor: "rgba(0,0,0,0)",
                    //backgroundColor:'red',
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: COLORS.WHITE,
                    borderStyle: "dashed",
                    alignItems: "center",
                    marginTop: 20,
                    height: Platform.SizeScale(25),
                    width: Platform.SizeScale(126),
                },
                dropdown: {
                    marginTop: 15,
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 12,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    width: 160,
                    elevation: 2,
                },
                itemDropdown: {
                    justifyContent: 'center',
                    borderRadius: 30,
                    width: width * 2 / 3,
                    marginVertical: 100,
                },
                icon: {
                    marginRight: 5,
                },
                item: {
                    padding: 17,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                },
                textItem: {
                    fontSize: 15,
                    lineHeight: 19,
                    color: "#6d7fb3",
                    fontFamily: fonts.nunito,
                    fontWeight: '500'
                },
                placeholderStyle: {
                    fontSize: 16,
                    width: 100,
                    color: '#6d7fb3',
                },
                selectedTextStyle: {
                    fontSize: 16,
                    width: 100,
                    lineHeight: 19,
                    color: '#6d7fb3'
                },
                inputSearchStyle: {
                    fontSize: 16,
                    lineHeight: 22,
                    borderRadius: 20,
                },
                viewAva: {
                    height: Platform.SizeScale(110),
                    width: Platform.SizeScale(110),
                    alignSelf: "center",
                    borderRadius: 110,
                    marginTop: 24,
                },
                textDisPlay: {
                    textAlign: "center",
                    color: "#0030C3",
                    fontFamily: fonts.nunito,
                    fontSize: 22,
                    lineHeight: 27,
                    marginRight: 7,
                },
                viewAvatar: {
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                },
                editAva: {
                    height: 25,
                    width: 25,
                    backgroundColor: '#0030C3',
                    borderRadius: 100,
                    alignItems: "center",
                    alignSelf: "flex-end",
                    top: -25,
                },
                className: {
                    flexDirection: "row",
                    alignSelf: "center",
                },
                txtClass: {
                    alignSelf: 'center',
                    color: '#0030C3',
                    left: 5,
                    fontFamily: fonts.nunito,
                },
                input: {
                    top: -30,
                },
                inputName: {
                    fontSize: RFFonsize(20),
                    alignSelf: 'center',
                    color: COLORS.TITLE_TASK,
                    fontFamily: fonts.inter,
                    fontWeight: '700',
                    flex: 1,
                    marginTop: 16,
                    marginBottom: 5
                },

                container: {
                    flex: 1,
                    justifyContent: "space-around",
                    alignItems: "center",
                },
                wallet: {
                    backgroundColor: COLORS.WHITE,
                    borderRadius: 30,
                    marginTop: 50,
                    zIndex: 0,
                    minHeight: 0,
                    flex: 1,
                    marginHorizontal: 16,
                    shadowColor: COLORS.App,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                },
                btnPress: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 30,
                    marginTop: 30
                },
                txtBtn: {
                    alignSelf: 'center',
                    color: COLORS.App,
                    left: 10,
                    fontFamily: fonts.nunito,
                    fontWeight: '500',
                    fontSize: RFFonsize(14),
                }
            }),
        []
    );
};
