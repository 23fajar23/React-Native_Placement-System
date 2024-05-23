import {Card, YStack} from "tamagui";
import {TouchableOpacity} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";

const IconCard = ({icon}) => {
    return (
        <TouchableOpacity>
            <Card
                bordered
                paddingHorizontal={"$5"}
                paddingVertical={"$3"}
                backgroundColor={"white"}
                borderRadius={"$7"}
                borderWidth={"$1"}>
                <FontAwesome6 name={icon} size={16} color={"grey"}/>
            </Card>
        </TouchableOpacity>
    )
}

export default IconCard