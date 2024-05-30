import React, {useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTests} from '../../api/test';
import {toggleBookmark} from '../../redux/bookmarkSlice';
import EmptyList from '../../components/EmptyList';
import TestItem from './TestItem';

const TestList = ({handlePressItem}) => {
    const dispatch = useDispatch();
    const {tests} = useSelector((state) => state.test);
    const bookmarked = useSelector((state) => state.bookmark.bookmarkedTests);
    const [refreshing, setRefreshing] = useState(false);

    const handleToggleBookmark = (id) => {
        dispatch(toggleBookmark(id));
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(getTests());
        setRefreshing(false);
    };

    const reversedTests = [...tests].reverse();

    return (
        <>
            {tests.length === 0 && !refreshing ? (
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
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                />
            )}
        </>
    );
};

export default TestList;
