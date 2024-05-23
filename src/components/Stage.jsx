import {Button, SizableText, YStack} from "tamagui";

const Stage = ({backgroundColor, textColor, text}) => {
    return (
        <YStack
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"$3"}
            borderRadius={"$5"}
            size={'$5'}
            width={"100%"}
            backgroundColor={backgroundColor}>
            <SizableText
                style={{fontFamily: 'PoppinsBold'}}
                size={'$5'}
                color={textColor}
                justifyContent={"center"}>
                {text}
            </SizableText>
        </YStack>
    )
}

export default Stage