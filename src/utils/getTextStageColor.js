export const getTextStageColor = (stage, index, testStageResultList) => {
    if (stage.stageStatus === 'ONGOING') {
        if (index === 0) return 'yellow';
        if (index === 1) return 'orange';
        if (index === 2) return 'purple';
    }
    if (stage.stageStatus === 'FINISHED') {
        const result = testStageResultList[index]?.result;
        if (result === 'PASSED') return 'green';
        if (result === 'FAILED') return 'red';
    }
    if (stage.stageStatus === 'COMING_SOON') {
        return 'gray';
    }
    return '#000000';
};