import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import {useCallback} from "react";
import {createTamagui, TamaguiProvider, YStack} from "tamagui";
import {config} from '@tamagui/config/v3'
import {
    Poppins_700Bold as PoppinsBold,
    Poppins_400Regular as PoppinsRegular,
    Poppins_300Light as PoppinsLight
} from "@expo-google-fonts/poppins";
import {useFonts} from "expo-font";
import AppNavigator from "./src/navigations/AppNavigator";
import {ToastProvider, ToastViewport} from "@tamagui/toast";
import CustomToast from "./src/components/CustomToast";
import {Provider, useSelector} from "react-redux";
import store from "./src/redux/store";

const tamaguiConfig = createTamagui(config)

SplashScreen.preventAutoHideAsync();

function App() {
    const [fontsLoaded, fontError] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
        PoppinsRegular, PoppinsLight, PoppinsBold
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Provider store={store}>
            <TamaguiProvider config={tamaguiConfig} defaultTheme={"light"}>
                <ToastProvider>
                    <YStack style={styles.container} onLayout={onLayoutRootView}>
                        <StatusBar style="dark" backgroundColor={"white"} translucent={false}/>
                        <AppNavigator/>

                        <ErrorToast/>

                        <ToastViewport flexDirection="column-reverse" top={"$7"} right={0} left={0}/>
                    </YStack>
                </ToastProvider>
            </TamaguiProvider>
        </Provider>
    )
}

const ErrorToast = () => {
    const authError = useSelector((state) => state.auth.error);
    const traineeError = useSelector((state) => state.trainee.error);

    const error = authError || traineeError

    return (
        <CustomToast
            backgroundColor={error ? "#fff3f3" : "#eff2ff"}
            borderColor={error ? "red" : "deepskyblue"}
            iconColor={error ? "red" : "deepskyblue"}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default App