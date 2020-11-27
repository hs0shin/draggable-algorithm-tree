export const nodeConfig = {
    overAll: {
        start: {},
        end: {},
        link: {},
    },
    type: {
        action: {
            style: {
                color: '#ff0072',
                border: '1px solid #ff0072',
            }
        },
        intent: {
            style: {
                color: '#0041d0',
                border: '1px solid #0041d0',
            }
        },
        start: {
            style: {
                background: 'rgb(225,225,255)',
                color: '#0041d0',
            }
        },
        end: {
            style: {
                background: 'rgb(255,225,225)',
                color: '#ff0072',
            }
        },
        error: {
            style: {
                background: 'RGB(123,33,41)',
            },
            data: { label: 'Error! Invalid node information' },
        },
    }
}

export const scenarioData = {
    "id": 11,
    "bot_id": 3,
    "name": "Scenario1",
    "root_step_id": 2,
    "steps": [
        {
            "id": 1,
            "scenario_id": 11,
            "type": 0,
            "intent_id": 3,
            "action_id": null,
            "next_steps": [
                {
                    "step_id": 1,
                    "next_step_id": 2,
                    "condition_flag": 0,
                    "condition": null
                }
            ]
        },
        {
            "id": 2,
            "scenario_id": 11,
            "type": 1,
            "intent_id": null,
            "action_id": 3,
            "next_steps": []
        }
    ]
}

export const actionData = [
    {
        "id": 1,
        "bot_id": 3,
        "name": "myaction",
        "type": 0,
        "description": "설명",
        "url": "myaction"
    },
    {
        "id": 2,
        "bot_id": 3,
        "name": "myaction",
        "type": 0,
        "description": "설명",
        "url": "myaction"
    },
    {
        "id": 3,
        "bot_id": 3,
        "name": "myaction",
        "type": 0,
        "description": "설명",
        "url": "myaction"
    },
    {
        "id": 4,
        "bot_id": 3,
        "name": "myaction",
        "type": 0,
        "description": "설명",
        "url": "myaction"
    },
    {
        "id": 5,
        "bot_id": 3,
        "name": "myaction",
        "type": 0,
        "description": "설명",
        "url": "myaction"
    },
    {
        "id": 6,
        "bot_id": 3,
        "name": "myaction",
        "type": 0,
        "description": "설명",
        "url": "myaction"
    },
    {
        "id": 7,
        "bot_id": 3,
        "name": "myaction",
        "type": 0,
        "description": "설명",
        "url": "myaction"
    },
    {
        "id": 8,
        "bot_id": 3,
        "name": "myaction",
        "type": 0,
        "description": "설명",
        "url": "myaction"
    },
];
export const intentData = [
    { "id": 1, "bot_id": 1, "name": "test_intent", "description": "설명" },
    { "id": 2, "bot_id": 1, "name": "test_intent", "description": "설명" },
    { "id": 3, "bot_id": 1, "name": "test_intent", "description": "설명" },
    { "id": 4, "bot_id": 1, "name": "test_intent", "description": "설명" },
    { "id": 5, "bot_id": 1, "name": "test_intent", "description": "설명" },
    { "id": 6, "bot_id": 1, "name": "test_intent", "description": "설명" },
    { "id": 7, "bot_id": 1, "name": "Hello", "description": "설명" },
];