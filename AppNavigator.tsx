import React, {useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './Navigators/AuthNavigator';
import {AppContext} from './Contexts/app.context';
import AuthService from './Services/auth.service';
import auth from '@react-native-firebase/auth';

const AppNavigator = () => {
  console.log('RE RENDER');
  const {appInfo, dispatchApp} = React.useContext(AppContext);
  const [initializing, setInitializing] = React.useState(true);
  const [AuthenticatedUser, setAuthenticatedUser] = React.useState();

  const onAuthStateChanged = (user) => {
    // AuthService.signOut();
    setAuthenticatedUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  const changeAuthState = async () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  };

  React.useEffect(() => {
    const initalizeAsync = async () => {
      // AuthService.signOut();
      await changeAuthState();

      if (initializing) {
        // null;
      }
      console.log('AUTHENTICATED USER', AuthenticatedUser);
      if (!AuthenticatedUser) {
        dispatchApp({
          type: 'UPDATE_USER',
          loading: false,
        });
      } else {
        AuthService.getUser().then((user) => {
          console.log('AUTHENTICATED USER', user);
          dispatchApp({
            type: 'UPDATE_USER',
            user: user,
          });
        });
      }

      dispatchApp({
        type: 'UPDATE_USER',
        loading: false,
      });
    };

    initalizeAsync();
  }, []);

  console.log('APP INFO USER', appInfo.user);
  console.log('APP INFO LOADING', appInfo.loading);

  const NavigateTo = (screen: string) => {
    return <AuthNavigator initialRouteName={screen} />;
  };

  // if (appInfo.loading === true) {
  //   dispatchApp({
  //     type: 'UPDATE_USER',
  //     loading: false,
  //   });
  //   return NavigateTo('Loading');
  // }
  if (appInfo.user === null) {
    return NavigateTo('Landing');
  } else {
    const user = appInfo.user.data;
    if (!user.coach) {
      if (!user.teamId) {
        return NavigateTo('JoinTeam');
      } else {
        return NavigateTo('Dashboard');
      }
    } else {
      if (!user.teamId) {
        return NavigateTo('CreateTeam');
      } else {
        return NavigateTo('CoachDashboard');
      }
    }
  }
};

export default AppNavigator;
