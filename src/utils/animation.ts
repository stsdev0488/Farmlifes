import {LayoutAnimation, UIManager} from 'react-native';
// import { UIManager } from 'react-native';

const CONFIG = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  // delete: {
    // type: LayoutAnimation.Types.linear,
  // },
};

export function animate() {
  LayoutAnimation.configureNext(CONFIG);
}
