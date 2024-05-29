import {Card, ScrollView, Separator, SizableText, Spinner, XStack, YStack} from "tamagui";
import LogoCard from "../../components/LogoCard";
import Icon from "../../../assets/icon.png";
import NoteChip from "../../components/NoteChip";
import PrimaryButton from "../../components/button/PrimaryButton";
import Stage from "../../components/stage/Stage";
import {FontAwesome6} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getApplicationById} from "../../api/application";

const ApplicationDetailScreen = ({route, navigation}) => {
    const {applicationId} = route.params;
    const dispatch = useDispatch();
    const {selectedApplication, loading} = useSelector((state) => state.application);

    useEffect(() => {
        dispatch(getApplicationById(applicationId))
    }, [dispatch, applicationId]);

    return (
        <>
            {loading || !selectedApplication ? (
                <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"large"} color="lightgray"/>
                </YStack>
            ) : (
                <>
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
                                    <SizableText
                                        style={{fontFamily: 'PoppinsBold'}}
                                        size={'$7'}>{selectedApplication.test.company.name}
                                    </SizableText>
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
                            <YStack width={"100%"} alignItems={"center"} gap={"$1"}>
                                <Stage backgroundColor={"rgba(0, 128, 0, 0.1)"} textColor={"green"}
                                       title={"Stage 1 : Hackerrank"} date={"28 Jun 2024"}/>
                                <FontAwesome6 name={"angle-down"} color={"black"} size={24}/>
                                <Stage backgroundColor={"rgba(128, 0, 128, 0.1)"} textColor={"purple"}
                                       title={"Stage 2 : Interview"} date={"30 Jun 2024"}/>
                                <FontAwesome6 name={"angle-down"} color={"black"} size={24}/>
                                <Stage backgroundColor={"rgba(0.5, 0.5, 0.5, 0.1)"} textColor={"grey"}
                                       title={"Stage 3 : Project"} date={"1 Juli 2024"}/>
                            </YStack>
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
                        <PrimaryButton title={"Discover Another Test"} onPress={() => navigation.navigate("Test")}/>
                    </XStack>
                </>
            )}
        </>
    )
}

export default ApplicationDetailScreen