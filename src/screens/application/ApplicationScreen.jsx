import {YStack} from "tamagui";
import ApplicationList from "./ApplicationList";

const ApplicationScreen = ({navigation}) => {

    const handlePressItem = (application) => {
        navigation.navigate('ApplicationNavigator', {screen: 'ApplicationDetail', params: {application}})
    };

    return (
        <YStack flex={1} backgroundColor={"white"}>
            <ApplicationList handlePressItem={handlePressItem}/>
        </YStack>
    )
}

export default ApplicationScreen