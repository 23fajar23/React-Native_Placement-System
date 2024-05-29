import {YStack} from "tamagui";
import ApplicationList from "./ApplicationList";

const ApplicationScreen = ({navigation}) => {

    const handlePressItem = (applicationId) => {
        navigation.navigate('ApplicationNavigator', {screen: 'ApplicationDetail', params: {applicationId}})
    };

    return (
        <YStack flex={1} backgroundColor={"white"}>
            <ApplicationList handlePressItem={handlePressItem}/>
        </YStack>
    )
}

export default ApplicationScreen