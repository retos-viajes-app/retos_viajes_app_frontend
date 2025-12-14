//View para formularios

import React, { Children } from 'react';
import { View} from 'react-native';


const ViewGap24= ({ children }: { children: React.ReactNode }) => {
  return (
 <View style={{ alignItems:'center', gap:24 }}>
    {children}
</View>
  );
};

export default ViewGap24;