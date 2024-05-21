import {Text, YStack} from "tamagui";
import {FlatList} from "react-native";

const DATA = Array.from({length: 1000}, (_, index) => `Item ${index + 1}`);

const getItem = (data, index) => ({
    id: index.toString(),
    title: data[index]
});

const getItemCount = (data) => data.length;

const Item = ({title}) => (
    <YStack>
        <Text>{title}</Text>
    </YStack>
);

const TestScreen = () => {
    return (
        <YStack flex={1} backgroundColor={"white"} justifyContent={"center"} alignItems={"center"}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title}/>}
                keyExtractor={(item) => item.id}
            />
        </YStack>
    )
}

export default TestScreen