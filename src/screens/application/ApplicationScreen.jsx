import {YStack} from "tamagui";
import ApplicationList from "./ApplicationList";

const ApplicationScreen = ({navigation}) => {

    const handlePressItem = () => {
        navigation.navigate('ApplicationNavigator')
    };

    return (
        <YStack flex={1} backgroundColor={"white"}>
            <ApplicationList handlePressItem={handlePressItem}/>
        </YStack>
    )
}

export default ApplicationScreen