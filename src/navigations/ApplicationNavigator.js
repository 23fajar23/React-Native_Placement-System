import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SizableText, XStack, YStack} from "tamagui";
import {TouchableOpacity} from "react-native";
import {FontAwesome6, Ionicons} from "@expo/vector-icons";
import ApplicationDetailScreen from "../screens/application/ApplicationDetailScreen";
import Tooltip from "react-native-walkthrough-tooltip";
import {useState} from "react";
import StageColorInfo from "../components/stage/StageColorInfo";

const ApplicationStack = createNativeStackNavigator();

const ApplicationNavigator = () => {
    const [showTip, setShowTip] = useState(false)

    return (
        <ApplicationStack.Navigator>
            <ApplicationStack.Screen
                name="ApplicationDetail"
                component={ApplicationDetailScreen}
                options={{
                    headerShadowVisible: false,
                    headerTitle: () => (
                        <SizableText
                            size={"$7"}
                            style={{fontFamily: "PoppinsBold"}}>
                            Stages
                        </SizableText>
                    ),
                    headerRight: () => (
                        <Tooltip
                            isVisible={showTip}
                            contentStyle={{
                                borderRadius: 12
                            }}
                            content={
                                <YStack padding={"$3"} gap={"$2"}>
                                    <StageColorInfo color={"orange"} text={"Ongoing"}/>
                                    <StageColorInfo color={"red"} text={"Failed"}/>
                                    <StageColorInfo color={"green"} text={"Passed"}/>
                                    <StageColorInfo color={"deepskyblue"} text={"Onboard"}/>
                                    <StageColorInfo color={"grey"} text={"Coming Soon"}/>
                                    <XStack alignItems={"center"} gap={"$3"} marginLeft={"$1.5"}>
                                        <FontAwesome6
                                            name={"thumbtack"}
                                            size={16}
                                            style={{transform: [{rotate: '45deg'}]}}
                                        />
                                        <SizableText
                                            style={{fontFamily: 'PoppinsRegular'}}
                                            top={"$0.5"}
                                            marginLeft={"$1.5"}
                                            size={'$5'}>
                                            Current Stage
                                        </SizableText>
                                    </XStack>
                                </YStack>
                            }
                            placement="bottom"
                            onClose={() => setShowTip(false)}>
                            <TouchableOpacity onPress={() => setShowTip(true)}>
                                <Ionicons name={"information-circle-outline"} size={32}/>
                            </TouchableOpacity>
                        </Tooltip>
                    ),
                }}
            />

        </ApplicationStack.Navigator>
    )
        ;
};

export default ApplicationNavigator