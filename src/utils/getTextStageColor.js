import {StageStatusEnum} from "./StageStatusEnum";
import {ResultEnum} from "./ResultEnum";

export const getTextStageColor = (stage, index, testStageResultList) => {
    if (stage.stageStatus === StageStatusEnum.ONGOING) {
        return 'orange';
    }
    if (stage.stageStatus === StageStatusEnum.FINISHED) {
        const result = testStageResultList[index]?.result;
        if (result === ResultEnum.PASSED) return 'green';
        if (result === ResultEnum.FAILED) return 'red';
    }
    if (stage.stageStatus === StageStatusEnum.COMING_SOON) {
        return 'gray';
    }
    return '#000000';
};