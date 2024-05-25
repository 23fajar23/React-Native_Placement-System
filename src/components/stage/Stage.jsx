import {SizableText, YStack} from "tamagui";
import {FontAwesome6} from "@expo/vector-icons";

const Stage = ({backgroundColor, textColor, title, date}) => {
    return (
        <YStack
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"$3"}
            borderRadius={"$5"}
            width={"100%"}
            backgroundColor={backgroundColor}>
            <SizableText
                style={{fontFamily: 'PoppinsBold'}}
                size={'$3'}
                color={textColor}>
                {title}
            </SizableText>
            <SizableText
                style={{fontFamily: 'PoppinsRegular'}}
                size={'$3'}
                color={textColor}>
                {date}
            </SizableText>
            <YStack position={"absolute"} alignSelf={"flex-end"} right={"$5"}>
                <FontAwesome6
                    name={"thumbtack"}
                    color={textColor}
                    size={24}
                    style={{transform: [{rotate: '45deg'}]}}
                />
            </YStack>
        </YStack>
    )
}

export default Stage