import { nodeConfig } from './config';
import uniqueId from 'lodash.uniqueid';

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
        }
    }
    return result;
}

const setIntentObj = (result, intentArr, stepObj) => {
    const intentObj = intentArr.find(intent => intent.id === stepObj.intent_id) || nodeConfig.node.error;
    const node = {
        ...nodeConfig.node.intent,
        id: `node_${stepObj.id}`,
        data: { label: intentObj.name, description: intentObj.description, intent_id: stepObj.intent_id, category: 'intent' },
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
        data: { label: intentObj.name, description: intentObj.description, intent_id: stepObj.intent_id, category: 'start' },
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
        id: `node_${stepObj.id}`,
        data: { label: actionObj.name, description: actionObj.description, action_id: stepObj.action_id, category: 'action' },
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
        id: `node_${stepObj.id}`,
        data: { label: actionObj.name, description: actionObj.description, action_id: stepObj.action_id, category: 'end' },
        position: { x: stepObj.x_coordinate, y: stepObj.y_coordinate },
        type: 'output'
    }
    result.push(node);
};

export const setSideIntentArr = intentArr => {
    return intentArr.map(intentObj => ({
        ...nodeConfig.node.intent,
        data: { label: intentObj.name, description: intentObj.description, intent_id: intentObj.id, category: 'intent' },
    }))
};

export const setSideActionArr = actionArr => {
    return actionArr.map(actionObj => ({
        ...nodeConfig.node.action,
        data: { label: actionObj.name, description: actionObj.description, action_id: actionObj.id, category: 'action' },
    }))
};

export const toggleNodeType = (node) => {
    const newNode = { ...node };
    switch (node.type) {
        case 'default': switch (node.data.category) {
            case 'intent':
                newNode.style = nodeConfig.node.start.style;
                newNode.type = 'input';
                newNode.data.category = 'start';
                break;
            case 'action':
                newNode.style = nodeConfig.node.end.style;
                newNode.type = 'output';
                newNode.data.category = 'end';
                break;
            default: throw Error(`Type of this category is not valid. Category : ${node.data.categroy}`);
        } break;
        case 'input':
            newNode.style = nodeConfig.node.intent.style;
            newNode.type = 'default';
            newNode.data.category = 'intent';
            break;
        case 'output':
            newNode.style = nodeConfig.node.action.style;
            newNode.type = 'default';
            newNode.data.category = 'action';
            break;
        default: throw Error(`Type of this node is not valid. Type : ${node.type}`);
    }
    return newNode;
};


export const validate = (elements, nodes, edges) => {
    if (!checkAllNodeLink(nodes, edges)) return false;
    if (!checkNoDoubleLinkedIntent(nodes, edges)) return false;
    if (!checkSingleStartNode(nodes)) return false;
    if (!checkIncompletedRoute(nodes, edges)) return false;
    return true;
};

const checkAllNodeLink = (nodes, edges) => {
    const nodeSet = new Set();
    for (let node of nodes) {
        nodeSet.add(node.id);
    }
    for (let edge of edges) {
        nodeSet.delete(edge.source);
        nodeSet.delete(edge.target);
    }
    return nodeSet.size === 0 ? true : false;
}

const checkNoDoubleLinkedIntent = (nodes, edges) => {
    const nodeMap = new Map(nodes.map(node => [node.id, node.data.category]));
    for (let edge of edges) {
        const tC = nodeMap.get(edge.target);
        const sC = nodeMap.get(edge.source);
        if ((tC === 'start' || tC === 'intent') && (sC === 'start' || sC === 'intent')) return false;
    }
    return true;
}

const checkSingleStartNode = (nodes) => {
    let num = 0;
    for (let node of nodes) {
        if (node.data.category === 'start') ++num;
    }
    return num === 1 ? true : false;
}

const checkIncompletedRoute = (nodes, edges) => {
    const noEndNodeSet = new Set(nodes
        .filter(node => node.data.category !== 'end')
        .map(node => node.id));

    for (let edge of edges) {
        noEndNodeSet.delete(edge.source);
    }
    return noEndNodeSet.size === 0 ? true : false;
}

export const parseToDatabaseObj = (nodes, edges, scenarioName, updateFlag, superiorId) => {
    const result = {
        name: scenarioName,
        steps: [],
    };
    updateFlag ? result.id = superiorId : result.bot_id = superiorId;
    for (let node of nodes) {
        const obj = {
            x_coordinate: node.position.x,
            y_coordinate: node.position.y,
            type: setObjType(node.data.category),
            intent_id: node.data.intent_id || null,
            action_id: node.data.action_id || null,
            next_steps: [],
            step_index: node.id
        }
        edges
            .filter(edge => edge.source === node.id)
            .forEach(edge => obj.next_steps.push({
                step_index: edge.target,
                condition_flag: 0
            }));
        result.steps.push(obj);
    }

    return setStepIndexes(result);
}

const setStepIndexes = (result) => {
    const idMap = new Map(result.steps.map(step => [step.step_index, uniqueId('') * 1]));
    for (let step of result.steps) {
        step.step_index = idMap.get(step.step_index);
        for (let next of step.next_steps) {
            next.step_index = idMap.get(next.step_index);
        }
    }
    return result;
}

const setObjType = (type) => {
    switch (type) {
        case 'intent': return 0;
        case 'action': return 1;
        case 'start': return 2;
        case 'end': return 3;
        default: throw Error(`Invalid Type : ${type}`);
    }
}

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