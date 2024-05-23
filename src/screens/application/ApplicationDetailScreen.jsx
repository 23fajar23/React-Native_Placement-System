import {Card, ScrollView, Separator, SizableText, XStack, YStack} from "tamagui";
import LogoCard from "../../components/LogoCard";
import Icon from "../../../assets/icon.png";
import NoteChip from "../../components/NoteChip";
import PrimaryButton from "../../components/button/PrimaryButton";
import CustomToast from "../../components/CustomToast";
import Stage from "../../components/Stage";

const ApplicationTestScreen = ({navigation}) => {
    return (
        <>
            <CustomToast
                backgroundColor={"#eff4ff"}
                borderColor={"deepskyblue"}
                iconColor={"deepskyblue"}
            />

            <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
                <YStack
                    flex={1}
                    alignItems={"center"}
                    backgroundColor={"white"}
                    paddingHorizontal={"$3"}
                    paddingTop={"$2"}
                    paddingBottom={"$3"}
                    gap={"$3"}>
                    <Card
                        gap={"$3"}
                        width={"100%"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        padding={"$3"}
                        borderWidth={"$0.5"}
                        borderRadius={"$11"}
                        borderColor={"lightgrey"}
                        backgroundColor={"white"}>
                        <XStack width={"25%"}>
                            <LogoCard icon={Icon}/>
                        </XStack>
                        <YStack gap={"$1"} alignItems={"center"}>
                            <SizableText style={{fontFamily: 'PoppinsBold'}} size={'$7'}>Company</SizableText>
                            <SizableText
                                style={{fontFamily: 'PoppinsRegular'}}
                                size={'$5'}
                                color={"deepskyblue"}>
                                Role
                            </SizableText>
                        </YStack>
                        <Separator width={"100%"} borderWidth={"$0.5"}/>
                        <YStack gap={"$2"} alignItems={"center"}>
                            <SizableText
                                style={{fontFamily: 'PoppinsRegular'}}
                                size={'$5'}
                                color={"gray"}>
                                Placement Place
                            </SizableText>
                            <SizableText
                                style={{fontFamily: 'PoppinsRegular'}}
                                size={'$5'}
                                color={"deepskyblue"}>
                                28 Aug 2024
                            </SizableText>
                            <XStack gap={"$2"}>
                                <NoteChip
                                    text={"All"}
                                    textColor={"gray"}
                                    borderColor={"gray"}
                                    backgroundColor={"white"}/>
                                <NoteChip
                                    text={"Min. S1"}
                                    textColor={"gray"}
                                    borderColor={"gray"}
                                    backgroundColor={"white"}/>
                            </XStack>
                        </YStack>
                    </Card>
                    <Separator width={"100%"} borderWidth={"$0.5"} marginVertical={"$1"}/>
                    <SizableText
                        style={{fontFamily: 'PoppinsRegular'}}
                        size={'$5'}>
                        Your Application Status
                    </SizableText>
                    <Stage backgroundColor={"rgba(0, 191, 255, 0.1)"} textColor={"deepskyblue"}
                           text={"Stage 1 : Interview"}/>
                </YStack>
            </ScrollView>

            <XStack
                position={"fixed"}
                bottom={0}
                left={0}
                right={0}
                alignSelf={"flex-end"}
                backgroundColor={"white"}
                padding={"$3"}
                paddingBottom={"$5"}
                borderTopColor={"lightgrey"}
                borderTopWidth={"$0.5"}>
                <PrimaryButton title={"Discover Another Test"} onPress={() => navigation.navigate("TestScreen")}/>
            </XStack>
        </>
    )
}

export default ApplicationTestScreen