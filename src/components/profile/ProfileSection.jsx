import {Separator, SizableText, XStack, YStack} from "tamagui";
import {FontAwesome6} from "@expo/vector-icons";
import React from "react";
import {TouchableOpacity} from "react-native";

const ProfileSection = ({icon, title, content, onPress}) => {
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
                    <FontAwesome6 name={"pen-to-square"} size={16} color={"deepskyblue"}/>
                </TouchableOpacity>
            </XStack>
            <Separator width={"100%"} borderWidth={"$0.5"}/>
            {content}
        </YStack>
    )
}

export default ProfileSection