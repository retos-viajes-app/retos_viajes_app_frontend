//View para formularios

import React, { Children } from 'react';
import { View} from 'react-native';


const ViewInputs= ({ children }: { children: React.ReactNode }) => {
  return (
 <View style={{ width: "100%", gap:10 }}>
    {children}
</View>
  );
};

export default ViewInputs;
