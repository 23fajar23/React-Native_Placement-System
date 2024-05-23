import {SizableText} from "tamagui";

const NoteChip = ({text, textColor, backgroundColor, borderColor}) => {
    return (
        <SizableText
            style={{fontFamily: 'PoppinsRegular'}}
            paddingTop={"$1.5"}
            paddingHorizontal={"$3"}
            borderRadius={"$3"}
            borderWidth={"$0.5"}
            size={'$2'}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            color={textColor}>
            {text}
        </SizableText>
    )
}

export default NoteChip