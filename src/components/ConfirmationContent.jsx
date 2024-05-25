import {SizableText, XStack, YStack} from "tamagui";
import SecondaryButton from "./button/SecondaryButton";
import PrimaryButton from "./button/PrimaryButton";

const ConfirmationContent = ({confirmationText, buttonText, onPressSecondary, onPressPrimary}) => {

    return (
        <YStack flex={1} alignItems={"center"} margin={"$3"} marginTop={0} gap={"$3"}>
            <SizableText
                style={{fontFamily: 'PoppinsRegular'}}
                size={'$5'}>
                {confirmationText}
            </SizableText>
            <XStack flex={1} width={"100%"} gap={"$3"}>
                <SecondaryButton title={"Cancel"} onPress={onPressSecondary}/>
                <PrimaryButton title={buttonText} onPress={onPressPrimary}/>
            </XStack>
        </YStack>
    )
}

export default ConfirmationContent