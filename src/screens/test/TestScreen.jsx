import {YStack} from "tamagui";
import TestList from "./TestList";

const TestScreen = ({navigation}) => {

    const handlePressItem = (testId) => {
        navigation.navigate('TestNavigator', {screen: 'TestDetail', params: {testId}});
    };

    return (
        <YStack flex={1} backgroundColor={"white"}>
            <TestList handlePressItem={handlePressItem}/>
        </YStack>
    );
};


export default TestScreen