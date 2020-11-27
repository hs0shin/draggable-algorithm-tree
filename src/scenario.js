export const flowArrFactory = (intentArr, actionArr) => (data = []) => {
    const result = [];
    if (!data.length) return result;
    for (let stepObj of data) {
        switch (stepObj.type) {
            case 0: setIntentObj(result, intentArr, stepObj); break;
            case 1: setActionObj(result, actionArr, stepObj); break;
            case 2: setStartObj(result, intentArr, stepObj); break;
            case 3: setEndObj(result, actionArr, stepObj); break;
        } break;
    }

    return result;
}

const setIntentObj = (result, intentArr, stepObj) => {
    const intentObj = intentArr.find(intent => intent.id === stepObj.intent_id) || errorNode;
    const node = {
        id: stepObj.id,
        data: { label: intentObj.name, description: intentObj.description },
        position: { x: stepObj.x_coordinate, y: stepObj.y_coordinate },
    }
    result.push(node);
}

const setActionObj = (result, actionArr, stepObj) => {

}

action = {
    "id": 1,
    "bot_id": 3,
    "name": "myaction",
    "type": 0,
    "description": "설명",
    "url": "myaction"
}

step = {
    id: 1,
    scenario_id: 1,
    type: 1,
    intent_id: 1,
    action_id: 1,
    next_steps: []
    x_coordinate: 1,
    y_coordinate: 2
};

{
    id: '1',
        type: 'input',
            className: 'dark-node',
                data: { label: 'start_intetn' },
    position: { x: 0, y: 80 },
    style: {
        background: 'rgb(225,225,255)',
            color: '#0041d0',
    },
}