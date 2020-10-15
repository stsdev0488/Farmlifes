import { StyleSheet, Dimensions, ColorPropType } from 'react-native';
import color from '_config/colors';
import colors from '../../config/colors';


const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  publishContainer: {
    paddingTop: 5,
    paddingLeft: 10,
  },
  publishText: {
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
    color: color.lightBrown
  },
  sharerContainer: {
    flexDirection: 'row',
    height: height / 10,
    borderTopColor: color.blushWhite,
    borderBottomColor: color.blushWhite,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  imageView: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: color.blushWhite,
  },
  image: {

    height: 50,
    resizeMode: 'cover',
    width: 50,
    borderRadius: 25,

    // height: 50,
    // width: 50,
    // borderRadius: 50,
    // // borderWidth: 25,
    // resizeMode: 'contain'
  },
  typeOfPostContainer: {
    height: height / 12,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: color.blushWhite,
    borderBottomWidth: 1,
    // marginHorizontal: 10,
    // marginVertical: 20,
  },
  postView1: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  postView1Text: {
    marginLeft: 15,
    fontFamily: 'SourceSansPro-Regular',
    color: color.lightBrown,
    fontSize: 15,
  },
  postViewMain2: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  postView2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postView3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postView2Text: {
    fontFamily: 'SourceSansPro-Regular',
    color: color.lightBrown,
    fontSize: 15,
    marginLeft: 15,
  },
  checkBoxContainer: {
    color: color.thickGreen,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: color.lightBrown,
    // width: '100%',
  },
  activeCheckBox: {
    borderColor: color.thickGreen,
  },
  inputContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    // padding: 10
  },
  textInputStyle: {
    flex: 1,
    backgroundColor: color.white,
    textAlignVertical: 'top',
    paddingTop: '4%',
    marginLeft: '2%',
    fontSize: 15,
    color: color.lightBrown,
    fontFamily: 'SourceSansPro-Semibold',
    // height: height / 1.9,
  },
  textInputWithImage: {
    flex: 1,
  },
  bigImageCont: {
    height: height /1.5
  },

  roundedView: {
    position: 'absolute',
    right: 14,
    bottom: 13,
    borderColor: color.blushWhite,
    borderWidth: 1,
    zIndex: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: color.white
  },
  roundedViewActive: {
    backgroundColor: color.thickGreen
  },
  bottomContainer: {
    bottom: 0,
    flex: 1,
    width: '100%',
    backgroundColor: color.whiteInCreate,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 50,
    minHeight: 50,
  },
  bottomContainerViewText: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  addSomethingText: {
    fontSize: 13,
    color: color.lightBrown,
    fontFamily: 'SourceSansPro-Regular',
  },
  bottomContainerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: '5%',
  },
  galleryImage: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryText: {
    fontSize: 13,
    textAlign: 'center',
    paddingRight: 5,
  },
});
export default styles;
