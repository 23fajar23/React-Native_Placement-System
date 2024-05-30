export const getBackgroundStageColor = (stage, index, testStageResultList) => {
    const colors = {
        orange: 'rgba(255, 165, 0, 0.1)',
        green: 'rgba(0, 128, 0, 0.1)',
        red: 'rgba(255, 0, 0, 0.1)',
        gray: 'rgba(128, 128, 128, 0.1)',
    };

    if (stage.stageStatus === 'ONGOING') {
        return colors.orange;
    }
    if (stage.stageStatus === 'FINISHED') {
        const result = testStageResultList[index]?.result;
        if (result === 'PASSED') return colors.green;
        if (result === 'FAILED') return colors.red;
    }
    if (stage.stageStatus === 'COMING_SOON') {
        return colors.gray;
    }
    return '#ffffff';
};