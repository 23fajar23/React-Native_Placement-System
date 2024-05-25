import {Text} from "tamagui";
import {TouchableOpacity} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";

const CustomTooltip = ({trigger, content}) => {

    return (
        <Tooltip
            isVisible={showTip}
            content={content}
            placement="top"
            onClose={() => setShowTip(false)}>
            {trigger}
        </Tooltip>
    )
}

export default CustomTooltip