import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { StyleSheet,View,Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import LoginPage from './LoginPage';
import CompanyList from './ListeStartup';
//import StartupDetailsScreen from './DetailScreen';
import StartupDetailScreen from './DetailStartup';
import InvestorListScreen from './InvestorListScreen';
import BusinessAngelLoginScreen from './LoginPage';
import BusinessAngelSignUpScreen from './BusinessAngelScreenPage';
import StartupSignupScreen from './StartupSignupScreen';
import DocumentUploadScreen from './DocumentUploadScreen';

// import YourComponent1 from './Pages/Coordonne';
  
const Stack = createStackNavigator();

const CustomHeaderTitle = ({ title }) => (
  <View style={styles.headerTitleContainer}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

export default function Navigue({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="BusinessAngelLoginScreen">
        <Stack.Screen name="BusinessAngelLoginScreen" component={BusinessAngelLoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessAngelSignUpScreen" component={BusinessAngelSignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DocumentUploadScreen" component={DocumentUploadScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StartupSignupScreen" component={StartupSignupScreen} options={{ headerShown: true }}/>
      </Stack.Navigator> 
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    // Ajoutez un décalage à gauche selon votre préférence
    justifyContent:'flex-start'
  },
  headerTitle: {
    fontSize: 18, // Ajustez la taille de la police selon votre préférence
    fontWeight: 'bold',
    color: '#D0D3D4',
    marginLeft:15
  },
});
