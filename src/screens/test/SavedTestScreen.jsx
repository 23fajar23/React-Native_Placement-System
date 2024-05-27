import {YStack} from "tamagui";
import SavedTestList from "./SavedTestList";

const SavedTestScreen = ({navigation}) => {

    const handlePressItem = () => {
        navigation.navigate('TestNavigator', {screen: 'SavedTest'})
    };

    return (
        <YStack flex={1} backgroundColor={"white"}>
            <SavedTestList handlePressItem={handlePressItem}/>
        </YStack>
    );
};


export default SavedTestScreen