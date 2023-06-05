import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from '../../components/CardKebijakan/CustomDrawer';

const Drawer = createDrawerNavigator();

export function DrawerNavigation({ navigation }) {
    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerTitle: '', navigation: navigation }} />
            <Drawer.Screen name='Main' component={Main} options={{ headerShown: false, swipeEnabled: false, navigation: navigation }} />
        </Drawer.Navigator>
    )
}
