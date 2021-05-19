import React from 'react';
import {SafeAreaView} from 'react-native';

import BookStore from './src';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <BookStore />
    </SafeAreaView>
  );
}

export default App;
