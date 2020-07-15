import React, {useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './Navigators/AuthNavigator';
import {AppContext} from './Contexts/app.context';
import AuthService from './Services/auth.service';
import auth from '@react-native-firebase/auth';
import {Text} from '@ui-kitten/components';
import Loading from './Screens/Loading';

const AppNavigator = () => {
  console.log('RE RENDER');
  const {appInfo, dispatchApp} = React.useContext(AppContext);
  const [initializing, setInitializing] = React.useState(true);
  // const [AuthenticatedUser, setAuthenticatedUser] = React.useState();

  const onAuthStateChanged = (user) => {
    if (initializing) {
      setInitializing(false);
      if (user) {
        AuthService.getUser().then((authUser) => {
          dispatchApp({
            type: 'UPDATE_USER',
            user: authUser,
          });
        });
      }
    }
  };

  const changeAuthState = async () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  };

  React.useEffect(() => {
    const initalizeAsync = async () => {
      if (initializing) {
        await changeAuthState();
      }
    };
    initalizeAsync();
  }, []);

  const NavigateTo = (screen: string) => {
    return <AuthNavigator initialRouteName={screen} />;
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
