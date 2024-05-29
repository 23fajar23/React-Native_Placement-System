import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTests} from '../../api/test';
import {toggleBookmark} from '../../redux/bookmarkSlice';
import EmptyList from '../../components/EmptyList';
import TestItem from './TestItem';
import {Spinner, YStack} from "tamagui";  // Adjust the import path if necessary

const TestList = ({handlePressItem}) => {
    const dispatch = useDispatch();
    const {loading, tests} = useSelector((state) => state.test);
    const bookmarked = useSelector((state) => state.bookmark.bookmarkedTests);

    useEffect(() => {
        dispatch(getTests());
    }, [dispatch]);

    const handleToggleBookmark = (id) => {
        dispatch(toggleBookmark(id));
    };

    const reversedTests = [...tests].reverse();

    return (
        <>
            {loading ? (
                <YStack flex={1} backgroundColor={"white"} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"large"} color="lightgray"/>
                </YStack>
            ) : tests.length === 0 ? (
                <EmptyList text={"placement test"}/>
            ) : (
                <FlatList
                    data={reversedTests}
                    renderItem={({item}) => (
                        <TestItem
                            item={item}
                            handlePressItem={handlePressItem}
                            handleToggleBookmark={handleToggleBookmark}
                            isBookmarked={bookmarked[item.id]}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 13, paddingVertical: 7, gap: 13}}
                    nestedScrollEnabled
                />
            )}
        </>
    );
};

export default TestList;
