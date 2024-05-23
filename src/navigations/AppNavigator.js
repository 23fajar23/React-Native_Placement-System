import {NavigationContainer} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import {useState} from "react";
import MainTabNavigator from "./MainTabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TestNavigator from "./TestNavigator";

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen
                    name={"InitialNavigator"}
                    component={isAuthenticated ? MainTabNavigator : AuthNavigator}
                    options={{headerShown: false}}
                />
                <AppStack.Screen
                    name={"TestNavigator"}
                    component={TestNavigator}
                    options={{headerShown: false}}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;