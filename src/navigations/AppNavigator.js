import {NavigationContainer} from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import {useState} from "react";
import MainTabNavigator from "./MainTabNavigator";

const AppNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainTabNavigator/> : <AuthNavigator/>}
        </NavigationContainer>
    );
};

export default AppNavigator;