import {Accordion, SizableText, Square} from "tamagui";
import {FontAwesome6} from "@expo/vector-icons";

const CustomAccordion = ({title, content}) => {
    return (
        <Accordion
            overflow="hidden"
            width="100%"
            type="multiple"
            borderWidth={"$0.5"}
            borderColor={"lightgrey"}
            borderRadius={"$7"}
            gap={"$3"}>
            <Accordion.Item value="notes">
                <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                    {({open}: {
                        open: boolean
                    }) => (
                        <>
                            <SizableText
                                style={{fontFamily: 'PoppinsBold'}}
                                size={'$5'}>
                                {title}
                            </SizableText>
                            <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                <FontAwesome6 name={"chevron-down"} size={16} color={"deepskyblue"}/>
                            </Square>
                        </>
                    )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="medium">
                    <Accordion.Content animation="medium" exitStyle={{opacity: 0}}>
                        {content}
                    </Accordion.Content>
                </Accordion.HeightAnimator>
            </Accordion.Item>
        </Accordion>
    )
}

export default CustomAccordion