import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Dashboard from './Pages/Dashboard';
import DetailDashboard from './Pages/DetailDashboard';
import PdfViewer from './Pages/PdfViewer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './Component/CardKebijakan/CustomDrawer';
import Main from './Pages/Main';
import { Home } from './Pages/Main/Home';
import { Notification } from './Pages/Main/Notification';
import { FAQ } from './Pages/Main/FAQ';
import { Profile } from './Pages/Main/Profile';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen name='Home' component={DrawerNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="PdfViewer" component={PdfViewer} options={{ headerTitle: '' }} />
        <Stack.Screen name="DetailDashboard" component={DetailDashboard} options={{ headerTitle: '' }} />
        <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
        <Stack.Screen name='BottomTabs' component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerTitle: '' }} />
      <Drawer.Screen name='Main' component={Main} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}

export const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Notification' component={Notification} />
      <Tab.Screen name='FAQ' component={FAQ} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})