import {Separator, Sheet, SizableText, XStack, YStack} from "tamagui";

const CustomSheet = ({title, content, ...props}) => {
    return (
        <Sheet
            modal
            dismissOnSnapToBottom
            animationConfig={false}
            snapPointsMode={"fit"}
            {...props}>
            <Sheet.Frame style={{borderTopStartRadius: 64, borderTopEndRadius: 64}}>
                <YStack alignItems={"center"}>
                    <XStack marginVertical={"$3"} height={3} width={"$3"}
                            backgroundColor={"lightgray"}
                            borderRadius={"$9"}/>
                    <SizableText
                        alignSelf={"center"}
                        style={{fontFamily: 'PoppinsBold'}}
                        size={'$7'}>
                        {title}
                    </SizableText>
                </YStack>
                <Separator marginVertical={"$3"} marginHorizontal={"$3"} borderWidth={"$0.5"}/>
                {content}
            </Sheet.Frame>
            <Sheet.Overlay
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
            />
        </Sheet>
    )
}

export default CustomSheet