import {Card, ScrollView, Separator, SizableText, Spinner, XStack, YStack} from "tamagui";
import LogoCard from "../../components/LogoCard";
import Icon from "../../../assets/icon.png";
import NoteChip from "../../components/NoteChip";
import PrimaryButton from "../../components/button/PrimaryButton";
import CustomAccordion from "../../components/CustomAccordion";
import QuotaRow from "../../components/QuotaRow";
import CustomSheet from "../../components/CustomSheet";
import React, {useEffect, useState} from "react";
import {useToastController} from "@tamagui/toast";
import ConfirmationContent from "../../components/ConfirmationContent";
import {useDispatch, useSelector} from "react-redux";
import {getTestById} from "../../api/test";
import {formatDate} from "../../utils/formatDate";

const TestDetailScreen = ({route}) => {
    const {testId} = route.params;
    const [openSheet, setOpenSheet] = useState(false)
    const toast = useToastController()
    const dispatch = useDispatch();
    const {selectedTest, loading} = useSelector((state) => state.test);


    useEffect(() => {
        dispatch(getTestById(testId));
    }, [dispatch, testId]);

    return (
        <>
            {loading || !selectedTest ? (
                <YStack flex={1} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"large"} color="lightgray"/>
                </YStack>
            ) : (
                <>
                    <ScrollView backgroundColor={"white"} showsVerticalScrollIndicator={false}>
                        <YStack
                            flex={1}
                            backgroundColor={"white"}
                            paddingHorizontal={"$3"}
                            paddingTop={"$2"}
                            paddingBottom={"$3"}
                            gap={"$3"}>
                            <Card
                                gap={"$3"}
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
                                    <SizableText style={{fontFamily: 'PoppinsBold'}}
                                                 size={'$7'}>{selectedTest.company.name}</SizableText>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"deepskyblue"}>
                                        {selectedTest.rolePlacement}
                                    </SizableText>
                                </YStack>
                                <Separator width={"100%"} borderWidth={"$0.5"}/>
                                <YStack gap={"$2"} alignItems={"center"}>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"gray"}>
                                        {selectedTest.placement}
                                    </SizableText>
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"deepskyblue"}>
                                        {formatDate(selectedTest.stages[0].dateTime)}
                                    </SizableText>
                                    <XStack gap={"$2"}>
                                        <NoteChip
                                            text={selectedTest.stages[0].quotas[0].type}
                                            textColor={"gray"}
                                            borderColor={"gray"}
                                            backgroundColor={"white"}/>
                                        <NoteChip
                                            text={`Min. ${selectedTest.education.name}`}
                                            textColor={"gray"}
                                            borderColor={"gray"}
                                            backgroundColor={"white"}/>
                                    </XStack>
                                </YStack>
                            </Card>
                            <CustomAccordion
                                title={"Quota"}
                                content={
                                    <YStack flex={1}>
                                        <XStack flex={1} justifyContent={"space-between"} width={"100%"}>
                                            <SizableText
                                                style={{fontFamily: 'PoppinsRegular'}}
                                                size={'$5'}>
                                                Total Quota
                                            </SizableText>
                                            <SizableText
                                                style={{fontFamily: 'PoppinsRegular'}}
                                                size={'$5'}>
                                                {selectedTest.stages[0].quotas[0].total} Slots
                                            </SizableText>
                                        </XStack>
                                        <Separator width={"100%"} borderWidth={"$0.5"} marginVertical={"$2"}/>
                                        <YStack flex={1} gap={"$1"}>
                                            <QuotaRow batch={"Batch 14 Jakarta"} available={"Not Available"}
                                                      color={"red"}/>
                                            <QuotaRow batch={"Batch 15 Jakarta"} available={"Available: 15"}
                                                      color={"deepskyblue"}/>
                                            <QuotaRow batch={"Batch 18 Online"} available={"Not Available"}
                                                      color={"red"}/>
                                            <QuotaRow batch={"Batch 1 Malang"} available={"Available : 5"}
                                                      color={"deepskyblue"}/>
                                            <QuotaRow batch={"Batch 2 Malang"} available={"Available : 7"}
                                                      color={"deepskyblue"}/>
                                        </YStack>
                                    </YStack>
                                }
                            />
                            <CustomAccordion
                                title={"Notes"}
                                content={
                                    <SizableText
                                        style={{fontFamily: 'PoppinsRegular'}}
                                        size={'$5'}
                                        color={"black"}>
                                        {selectedTest.note}
                                    </SizableText>
                                }
                            />
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
                        <PrimaryButton title={"Apply"} onPress={() => setOpenSheet(true)}/>
                    </XStack>

                    <CustomSheet
                        title={"Apply Test"}
                        titleColor={"black"}
                        onOpenChange={setOpenSheet}
                        open={openSheet}
                        content={
                            <ConfirmationContent
                                confirmationText={"Are you sure you want to apply?"}
                                buttonText={"Yes, Apply"}
                                onPressSecondary={() => setOpenSheet(false)}
                                onPressPrimary={() => {
                                    setOpenSheet(false)
                                    toast.show('Successfully saved!', {
                                        message: "Don't worry, we've got your data.",
                                        native: false,
                                    })
                                }}
                            />
                        }
                    />
                </>
            )}
        </>
    )
}

export default TestDetailScreen