import {Button, SizableText} from "tamagui";

const PrimaryButton = ({onPress, title}) => {
    return (
        <Button
            style={{borderRadius: 999}}
            size={'$5'}
            width={"100%"}
            backgroundColor={"deepskyblue"}
            color={"white"}
            onPress={onPress}>
            <SizableText style={{fontFamily: 'PoppinsRegular'}} size={'$5'}
                         color={"white"}>{title}</SizableText>
        </Button>
    )
}

export default PrimaryButton