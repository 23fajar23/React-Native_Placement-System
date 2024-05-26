import {Avatar, Separator, SizableText, XStack, YStack} from "tamagui";
import React, {useState} from "react";
import {FontAwesome6} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import ConfirmationContent from "../../components/ConfirmationContent";
import CustomSheet from "../../components/CustomSheet";
import ProfileSection from "../../components/profile/ProfileSection";
import ProfileSectionEmpty from "../../components/profile/ProfileSectionEmpty";
import PersonalRow from "../../components/PersonalRow";

const ProfileScreen = ({navigation}) => {
    const [openSheet, setOpenSheet] = useState(false)

    return (
        <>
            <YStack flex={1} backgroundColor={"white"} padding={"$3"} gap={"$5"}>
                <XStack gap={"$3"} alignItems={"center"}>
                    <Avatar flex={1} circular size={"$7"}>
                        <Avatar.Image
                            accessibilityLabel="ProfilePicture"
                            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                        />
                    </Avatar>
                    <YStack flex={5} gap={"$1"}>
                        <SizableText
                            style={{fontFamily: 'PoppinsBold'}}
                            size={'$7'}>
                            Pratama Wibi
                        </SizableText>
                        <XStack>
                            <SizableText
                                style={{fontFamily: 'PoppinsRegular'}}
                                size={'$5'}
                                color={"gray"}>
                                Trainee Batch 2 Malang{"  |  "}
                            </SizableText>
                            <SizableText
                                style={{fontFamily: 'PoppinsRegular'}}
                                size={'$5'}
                                color={"gray"}>
                                S1
                            </SizableText>
                        </XStack>
                    </YStack>
                    <YStack flex={1} alignItems={"center"}>
                        <TouchableOpacity onPress={() => setOpenSheet(true)}>
                            <FontAwesome6 name={"arrow-right-from-bracket"} color={"red"} size={24}/>
                        </TouchableOpacity>
                    </YStack>
                </XStack>
                <Separator width={"100%"} borderWidth={"$0.5"}/>
                <YStack gap={"$3"}>
                    <ProfileSection
                        icon={"user"}
                        title={"Personal"}
                        content={
                            <YStack gap={"$2"}>
                                <PersonalRow icon={"location-outline"} text={"Semarang, Jawabarat"}/>
                                <PersonalRow icon={"call-outline"} text={"+6282123456789"}/>
                                <PersonalRow icon={"mail-outline"} text={"pratamawibi24@gmail.com"}/>
                            </YStack>
                        }
                        onPress={() => navigation.navigate('ProfileNavigator', {screen: 'EditPersonal'})}
                    />
                    <ProfileSectionEmpty icon={"clipboard-list"} title={"Summary"}/>
                    <ProfileSectionEmpty icon={"lightbulb"} title={"Skills"}/>
                    <ProfileSectionEmpty icon={"file"} title={"CV/Resume"}/>
                </YStack>
            </YStack>

            <CustomSheet
                title={"Logout"}
                titleColor={"red"}
                onOpenChange={setOpenSheet}
                open={openSheet}
                content={
                    <ConfirmationContent
                        confirmationText={"Are you sure you want to logout?"}
                        buttonText={"Yes, Logout"}
                        onPressSecondary={() => setOpenSheet(false)}
                        onPressPrimary={() => {
                            setOpenSheet(false)
                        }}
                    />
                }
            />
        </>
    )
}

export default ProfileScreen