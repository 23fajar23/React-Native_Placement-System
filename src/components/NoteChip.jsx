import {SizableText} from "tamagui";

const NoteChip = ({text, color}) => {
    return (
        <SizableText
            style={{fontFamily: 'PoppinsRegular'}}
            paddingTop={"$1.5"}
            paddingHorizontal={"$2"}
            borderRadius={8}
            borderWidth={"$0.5"}
            borderColor={color}
            size={'$3'}
            color={color}>
            {text}
        </SizableText>
    )
}

export default NoteChip