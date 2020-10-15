import { StyleSheet, Dimensions, ColorPropType } from 'react-native';
import color from '_config/colors';


const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexGrow1:{
    flexGrow: 1,
  },
  publishContainer: {
    paddingTop: 5,
    paddingLeft: 10,
  },
  publishText:{
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
    color: color.lightBrown
  },
  sharerContainer:{
    flexDirection: 'row',
    height: height /10,
    // width: height /10,
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
  inputContainer: {
    flex: 1,
    padding: 10 
  },
  textInputStyle: {
    backgroundColor: color.white,
    textAlignVertical: 'top',
    marginTop: '2%',
    marginLeft: '2%',
    fontSize: 15,
    color: color.lightBrown,
    fontFamily: 'SourceSansPro-Semibold',
    // flex: 1,
    // height: '100%',
  },
  image:{
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'cover'
  },
  postContainer: {
    flex:2,
    paddingVertical: 10,
    backgroundColor: color.lightGray,
  },
  hidePostContainer: {
    // flex: 0,
    // position: 'absolute',
    // bottom: -200,
    // left: 0,
    // right: 0,
  },
  innerPostContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingBottom: 20,
    backgroundColor: color.white,
  },
  typeOfPostContainer:{
    height: height /12,
    flexDirection: 'row',
    borderBottomColor: color.blushWhite,
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  postView1:{
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center'
  },
  postView1Text: {
    left: 10,
    fontFamily: 'SourceSansPro-Regular',
    color: color.lightBrown,
    fontSize: 17
  },
  postViewMain2: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  postView2:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  postView2Text: {
    fontFamily: 'SourceSansPro-Regular',
    color: color.lightBrown,
    fontSize: 17,
    left: 20,
  },
  checkBoxContainer: {
    color: color.thickGreen,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: color.lightBrown
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
  }
});
export default styles;