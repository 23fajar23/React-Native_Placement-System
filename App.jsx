import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import {useCallback} from "react";
import {createTamagui, TamaguiProvider, Theme, YStack} from "tamagui";
import {config} from '@tamagui/config/v3'
import {
    Poppins_700Bold as PoppinsBold,
    Poppins_400Regular as PoppinsRegular,
    Poppins_300Light as PoppinsLight
} from "@expo-google-fonts/poppins";
import {useFonts} from "expo-font";
import RegisterScreen from "./src/screens/RegisterScreen";

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
        <TamaguiProvider config={tamaguiConfig}>
            <Theme name={'light'}>
                <YStack style={styles.container} onLayout={onLayoutRootView}>
                    <StatusBar style="light" translucent={false}/>
                    <RegisterScreen/>
                </YStack>
            </Theme>
        </TamaguiProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App