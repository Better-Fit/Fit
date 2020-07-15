import React from 'react';
import {AuthNavigator} from './Navigators/AuthNavigator';
import {AppContext} from './Contexts/app.context';
import AuthService from './Services/auth.service';

import Loading from './Screens/Loading';
import {getItemFromCache} from './Utils/cache.util';
import AsyncStorage from '@react-native-community/async-storage';


const AppNavigator = () => {
  const {appInfo, dispatchApp} = React.useContext(AppContext);

  React.useEffect(() => {
    checkAuthState();
  }, []);

  const NavigateTo = (screen: string) => {
    return <AuthNavigator initialRouteName={screen} />;
  };

  const checkAuthState = async () => {
    const cachedUid = await getItemFromCache('uid');

    if (cachedUid) {
      AuthService.waitForAuth(() => {
        AuthService.getUser().then((user) => {
          dispatchApp({
            type: 'UPDATE_USER',
            loading: false,
            user: user,
          });
        });
      });
    } else {
      dispatchApp({
        type: 'UPDATE_USER',
        loading: false,
      });
    }
  };

  if (appInfo.loading) {
    return <Loading />;
  }

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
