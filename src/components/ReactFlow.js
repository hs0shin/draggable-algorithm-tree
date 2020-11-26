import React, { useState, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';

const onClick = (event, elements) => {
    console.log('context menu:', elements);
};

const HorizontalFlow = ({ initialElements, onLoad, editable }) => {
    const [elements, setElements] = useState(initialElements);
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    return (
        <ReactFlow
            elementsSelectable={editable}
            nodesConnectable={editable}
            nodesDraggable={editable}
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            selectNodesOnDrag={false}
            onElementClick={editable ? onClick : null}
        />
    );
};
export default HorizontalFlow;