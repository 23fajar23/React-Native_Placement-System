import {Button, SizableText} from "tamagui";

const PrimaryButton = ({onPress, title}) => {
    return (
        <Button
            flex={1}
            style={{borderRadius: 999}}
            size={'$5'}
            width={"100%"}
            backgroundColor={"deepskyblue"}
            onPress={onPress}>
            <SizableText style={{fontFamily: 'PoppinsRegular'}} size={'$5'}
                         color={"white"}>{title}</SizableText>
        </Button>
    )
}

export default PrimaryButton