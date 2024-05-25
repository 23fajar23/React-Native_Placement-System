import {Avatar, SizableText, XStack, YStack} from "tamagui";
import NoteChip from "../../components/NoteChip";
import React from "react";
import {FontAwesome6} from "@expo/vector-icons";

const ProfileScreen = () => {
    return (
        <YStack flex={1} backgroundColor={"white"} justifyContent={"center"} alignItems={"center"}>
            <XStack flex={1} gap={"$3"}>
                <YStack flex={1} height={"100%"} aspectRatio={1} marginLeft={"$3"}>
                    <Avatar circular alignSelf={"center"}>
                        <Avatar.Image
                            accessibilityLabel="ProfilePicture"
                            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                        />
                    </Avatar>
                </YStack>
                <YStack flex={4} gap={"$1"} >
                    <SizableText
                        style={{fontFamily: 'PoppinsBold'}}
                        size={'$5'}>
                        Successfully Applied Test!
                    </SizableText>
                    <XStack>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$3'}
                            color={"gray"}>
                            20 Jun 2024{"  |  "}
                        </SizableText>
                        <SizableText
                            style={{fontFamily: 'PoppinsRegular'}}
                            size={'$3'}
                            color={"gray"}>
                            20:49
                        </SizableText>
                    </XStack>
                </YStack>
                <YStack flex={1}  alignItems={"flex-end"}>
                    <FontAwesome6 name={"angle-right"} color={"black"} size={24}/>
                </YStack>
            </XStack>
        </YStack>
    )
}

export default ProfileScreen