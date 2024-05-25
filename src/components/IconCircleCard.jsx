import {Circle} from "tamagui";
import {FontAwesome6} from "@expo/vector-icons";

const IconCircleCard = () => {
    return (
        <Circle
            flex={1}
            backgroundColor={"rgba(0, 191, 255, 0.1)"}
            padding={"$3"}
            size={"$5"}>
            <FontAwesome6 name={"file-lines"} color={"deepskyblue"} size={24} solid/>
        </Circle>
    )
}

export default IconCircleCard