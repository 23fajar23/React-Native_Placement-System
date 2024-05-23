import {Button, SizableText} from "tamagui";

const SecondaryButton = ({onPress, title}) => {
    return (
        <Button
            flex={1}
            style={{borderRadius: 999}}
            size={'$5'}
            width={"100%"}
            backgroundColor={"rgba(0, 191, 255, 0.1)"}
            onPress={onPress}>
            <SizableText style={{fontFamily: 'PoppinsRegular'}} size={'$5'}
                         color={"deepskyblue"}>{title}</SizableText>
        </Button>
    )
}

export default SecondaryButton