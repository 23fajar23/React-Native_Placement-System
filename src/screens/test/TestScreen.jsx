import {YStack} from "tamagui";
import TestList from "./TestList";

const TestScreen = ({navigation}) => {

    const handlePressItem = () => {
        navigation.navigate('TestNavigator', {screen: 'TestDetail'})
    };

    return (
        <YStack flex={1} backgroundColor={"white"}>
            <TestList handlePressItem={handlePressItem}/>
        </YStack>
    );
};


export default TestScreen