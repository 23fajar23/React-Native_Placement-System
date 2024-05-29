import {SizableText, XStack, YStack} from "tamagui";
import {Toast, useToastState} from "@tamagui/toast";
import {FontAwesome6} from "@expo/vector-icons";

const CustomToast = ({backgroundColor, borderColor, icon, iconColor}) => {
    const toast = useToastState()

    if (!toast || toast.isHandledNatively) return null

    return (
        <Toast
            key={toast.id}
            duration={toast.duration}
            enterStyle={{opacity: 0, scale: 0.5, y: -25}}
            exitStyle={{opacity: 0, scale: 1, y: -20}}
            y={0}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            borderRadius={"$6"}
            borderWidth={"$0.5"}
            opacity={1}
            scale={1}
            animation="100ms"
            viewportName={toast.viewportName}>
            <XStack alignItems={"center"} gap={"$3"}>
                <FontAwesome6 name={icon} color={iconColor} size={24} solid/>
                <YStack>
                    <SizableText
                        top={"$1"}
                        style={{fontFamily: 'PoppinsBold'}}
                        size={'$5'}
                        color={"black"}>
                        {toast.message}
                    </SizableText>
                </YStack>
            </XStack>
        </Toast>
    )
}

export default CustomToast