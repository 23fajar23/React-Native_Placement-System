import {SizableText, XStack} from "tamagui";

const QuotaRow = ({batch, available, color}) => {
    return (
        <XStack flex={1} justifyContent={"space-between"} width={"100%"}>
            <SizableText
                style={{fontFamily: 'PoppinsRegular'}}
                size={'$5'}
                color={"gray"}>
                {batch}
            </SizableText>
            <SizableText
                style={{fontFamily: 'PoppinsRegular'}}
                size={'$5'}
                color={color}>
                {available}
            </SizableText>
        </XStack>
    )
}

export default QuotaRow