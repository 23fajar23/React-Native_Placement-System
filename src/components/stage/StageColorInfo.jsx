import {Circle, SizableText, XStack} from "tamagui";

const StageColorInfo = ({color, text}) => {
    return (
        <XStack alignItems={"center"} gap={"$3"}>
            <Circle
                backgroundColor={color}
                size={"$1"}
            />
            <SizableText
                style={{fontFamily: 'PoppinsRegular'}}
                top={"$0.5"}
                size={'$5'}>
                {text}
            </SizableText>
        </XStack>
    )
}

export default StageColorInfo