import {Ionicons} from "@expo/vector-icons";
import {SizableText, XStack} from "tamagui";
import React from "react";

const PersonalRow = ({icon, text}) => {
    return (
        <XStack alignItems={"center"} gap={"$3"}>
            <Ionicons name={icon} size={16} color={"black"}/>
            <SizableText
                top={"$0.5"}
                style={{fontFamily: 'PoppinsRegular'}}
                size={'$5'}>
                {text}
            </SizableText>
        </XStack>
    )
}

export default PersonalRow