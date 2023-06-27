import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from '../../components/CardKebijakan/CustomDrawer';
import Main from '../SuperApps/Main';
import Dashboard from '../Kebijakan/Dashboard'

const Drawer = createDrawerNavigator();

export function DrawerNavigation({ navigation }) {
    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerTitle: '', headerStatusBarHeight: 10 }} />
        </Drawer.Navigator>
    )
}
