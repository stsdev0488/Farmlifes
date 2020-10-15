import { AsyncStorage } from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;