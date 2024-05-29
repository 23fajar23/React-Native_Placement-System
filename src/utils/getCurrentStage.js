import {StageStatusEnum} from "./StageStatusEnum";

export const getCurrentStage = (stages) => {
    let stage = stages.find(stage => stage.stageStatus === StageStatusEnum.ONGOING);
    if (!stage) {
        const finishedStages = stages.filter(stage => stage.stageStatus === StageStatusEnum.FINISHED);
        if (finishedStages.length > 0) {
            stage = finishedStages[finishedStages.length - 1];
        }
    }
    if (!stage) {
        stage = stages.find(stage => stage.stageStatus === StageStatusEnum.COMING_SOON);
    }
    return stage;
};
