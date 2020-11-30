import { nodeConfig } from './config';

export const flowArrFactory = (intentArr, actionArr) => (data = []) => {
    const result = [];
    if (!data.length) return result;
    for (let stepObj of data) {
        switch (stepObj.type) {
            case 0: setIntentObj(result, intentArr, stepObj); break;
            case 1: setActionObj(result, actionArr, stepObj); break;
            case 2: setStartObj(result, intentArr, stepObj); break;
            case 3: setEndObj(result, actionArr, stepObj); break;
            default: throw Error(`Invalid step type: ${stepObj.type}`);
        } break;
    }
    return result;
}

const setIntentObj = (result, intentArr, stepObj) => {
    const intentObj = intentArr.find(intent => intent.id === stepObj.intent_id) || nodeConfig.node.error;
    const node = {
        ...nodeConfig.node.intent,
        id: `node_${stepObj.id}`,
        data: { label: intentObj.name, description: intentObj.description },
        position: { x: stepObj.x_coordinate, y: stepObj.y_coordinate }
    }
    result.push(node);
    stepObj.next_steps.forEach((el, idx) => {
        result.push({
            ...nodeConfig.edge.intent,
            id: `edge_${idx}`,
            source: `node_${el.step_id}`,
            target: `node_${el.next_step_id}`,
            condition_flag: el.condition_flag,
            condition: el.condition
        })
    });
};

const setStartObj = (result, intentArr, stepObj) => {
    const intentObj = intentArr.find(intent => intent.id === stepObj.intent_id) || nodeConfig.node.error;
    const node = {
        ...nodeConfig.node.start,
        id: `node_${stepObj.id}`,
        data: { label: intentObj.name, description: intentObj.description },
        position: { x: stepObj.x_coordinate, y: stepObj.y_coordinate }
    }
    result.push(node);
    stepObj.next_steps.forEach((el, idx) => {
        result.push({
            ...nodeConfig.edge.start,
            id: `edge_${idx}`,
            source: `node_${el.step_id}`,
            target: `node_${el.next_step_id}`,
            condition_flag: el.condition_flag,
            condition: el.condition
        })
    });
};

const setActionObj = (result, actionArr, stepObj) => {
    const actionObj = actionArr.find(action => action.id === stepObj.action_id) || nodeConfig.node.error;
    const node = {
        ...nodeConfig.node.action,
        id: stepObj.id,
        data: { label: actionObj.name, description: actionObj.description },
        position: { x: stepObj.x_coordinate, y: stepObj.y_coordinate },
    }
    result.push(node);
    stepObj.next_steps.forEach((el, idx) => {
        result.push({
            ...nodeConfig.edge.action,
            id: `edge_${idx}`,
            source: `node_${el.step_id}`,
            target: `node_${el.next_step_id}`,
            condition_flag: el.condition_flag,
            condition: el.condition
        })
    });
}

const setEndObj = (result, actionArr, stepObj) => {
    const actionObj = actionArr.find(action => action.id === stepObj.action_id) || nodeConfig.node.error;
    const node = {
        ...nodeConfig.node.end,
        id: stepObj.id,
        data: { label: actionObj.name, description: actionObj.description },
        position: { x: stepObj.x_coordinate, y: stepObj.y_coordinate },
        type: 'output'
    }
    result.push(node);
};



let action = {
    "id": 1,
    "bot_id": 3,
    "name": "myaction",
    "type": 0,
    "description": "설명",
    "url": "myaction"
}

let step = {
    id: 1,
    scenario_id: 1,
    type: 1,
    intent_id: 1,
    action_id: 1,
    next_steps: [],
    x_coordinate: 1,
    y_coordinate: 2
};

let temp = {
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