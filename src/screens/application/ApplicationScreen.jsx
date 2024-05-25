import {YStack} from "tamagui";
import ApplicationList from "./ApplicationList";

const ApplicationScreen = ({navigation}) => {

    const handlePressItem = () => {
        navigation.navigate('ApplicationNavigator')
    };

    return (
        <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}>
            <ApplicationList handlePressItem={handlePressItem}/>
        </YStack>
    )
}

export default ApplicationScreen