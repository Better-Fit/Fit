/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import theme from '../Styles/theme';

const Loading = (props) => {
  const styles = StyleSheet.create({
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
  });
  return (
    <View style={styles.activityIndicator}>
      <View>
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.success[500]}
        />
      </View>
    </View>
  );
};

export default Loading;
