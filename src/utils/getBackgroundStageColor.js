export const getBackgroundStageColor = (stage, index, testStageResultList) => {
    const colors = {
        yellow: 'rgba(255, 255, 0, 0.1)',
        orange: 'rgba(255, 165, 0, 0.1)',
        purple: 'rgba(128, 0, 128, 0.1)',
        green: 'rgba(0, 128, 0, 0.1)',
        red: 'rgba(255, 0, 0, 0.1)',
        gray: 'rgba(128, 128, 128, 0.1)',
    };

    if (stage.stageStatus === 'ONGOING') {
        if (index === 0) return colors.yellow;
        if (index === 1) return colors.orange;
        if (index === 2) return colors.purple;
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