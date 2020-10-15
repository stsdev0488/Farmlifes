import {NavigationActions, StackActions} from 'react-navigation';
import {func} from "prop-types";

// https://github.com/react-navigation/react-navigation/issues/1439

let navigator;
let _container; // eslint-disable-line

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function setContainer(container) {
  _container = container;
}

function goBack() {
  return navigator.dispatch(NavigationActions.back());
}

function reset(routeName: string, params: any) {
  _container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        }),
      ],
    }),
  );
}

function navigate(routeName: string, params?: any) {
   return navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function push(routeName: string, params?: any) {
  return navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  );
}

function navigateDeep(actions) {
  _container.props.navigation.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
}

function getCurrentRouteRecursive(nav) {
  if (Array.isArray(nav.routes) && nav.routes.length > 0) {
    return getCurrentRouteRecursive(nav.routes[nav.index]);
  } else {
    return nav;
  }
}

function getCurrentRouteName() {
  if (!navigator || !navigator.state || !navigator.state.nav) {
    return null;
  }

  const route = getCurrentRouteRecursive(navigator.state.nav);

  if (route) {
    return route.name;
  }
}

function getCurrentRoute() {
  if (!navigator || !navigator.state || !navigator.state.nav) {
    return null;
  }

  return getCurrentRouteRecursive(navigator.state.nav)
}

function getNavigator() {return navigator};

export default {
  navigate,
  push,
  setTopLevelNavigator,
  navigateDeep,
  reset,
  getCurrentRoute,
  getCurrentRouteName,
  getNavigator,
  goBack,
};
