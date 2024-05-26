import {SizableText, XStack, YStack} from "tamagui";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";
import {TouchableOpacity} from "react-native";

const ProfileSectionEmpty = ({icon, title, onPress}) => {
    return (
        <YStack
            gap={"$3"}
            padding={"$3"}
            borderRadius={"$7"}
            borderWidth={"$0.5"}
            borderColor={"lightgrey"}>
            <XStack alignItems={"center"} gap={"$3"}>
                <FontAwesome6 name={icon} size={16} color={"deepskyblue"} solid/>
                <SizableText
                    top={"$0.5"}
                    style={{fontFamily: 'PoppinsBold'}}
                    size={'$5'}>
                    {title}
                </SizableText>
                <XStack flex={1}/>
                <TouchableOpacity onPress={onPress}>
                    <FontAwesome6 name={"plus"} size={16} color={"deepskyblue"}/>
                </TouchableOpacity>
            </XStack>
        </YStack>
    )
}

export default ProfileSectionEmpty