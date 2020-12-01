import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { actionData, intentData, scenarioData } from './config';
import { flowArrFactory, toggleNodeType } from './scenario';
import ReactFlow, { addEdge, Background, removeElements, isEdge, getConnectedEdges } from 'react-flow-renderer';
import NodeMenu from './components/NodeMenu';
import { nodeConfig } from './config';
import _ from 'lodash-uuid';

const Wrapper = styled.div`
  display: flex;
  width: 1800px;
  height: 800px;
`;

const LeftDiv = styled.div`
  height: 100%;
  position: relative;
  width : ${props => props.editable ? '80%' : '100%'};
  background-color: rgb(250,250,250);
  border: 3px solid black;
  border-radius: 20px;
`;

const RightDiv = styled.div`
  height: 100%;
  width: ${props => props.editable ? '20%' : 0};
  background-color: rgb(240,240,240);
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  border-radius: 20px;
  overflow: hidden;
`;

const EditBar = styled.div`
  position: absolute;
  width : 12rem;
  height : 3rem;
  border-radius: 3rem;
  background-color: rgb(240,240,240);
  left: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  width : 12rem;
  height : 3rem;
  border-radius: 3rem;
  background-color: rgb(240,240,240);
  right: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const noop = (e) => e.preventDefault(); 
function App() {
  const [editable, setEditable] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [currentNodes, setCurrentNodes] = useState(null);
  const [nodeInfo, setNodeInfo] = useState(null);

  const _initialItem = useCallback(() => flowArrFactory(intentData, actionData)(scenarioData.steps), []);
  const [elements, setElements] = useState(_initialItem);

  const onLoad = (rf) => {
    setReactFlowInstance(rf);
  };

  const onClick = (e, elements) => {
    handleMenu(e, elements);
  };

  const handleDeleteClick = () => {
    const edges = elements.filter(e => isEdge(e));
    const connectedEdges = getConnectedEdges(currentNodes, edges);
    const elementsToRemove = [...currentNodes, ...connectedEdges];
    setElements((els) => removeElements(elementsToRemove, els));
    setAnchorEl(null);
  }

  const onConnect = (params) => setElements((els) => addEdge({ ...params, ...nodeConfig.edge.action }, els));

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const handleDragEnd = (objInfo) => (e) => {
    const position = reactFlowInstance.project({ x: e.clientX, y: e.clientY });
    setElements(elements.concat({ ...objInfo, position: position, id: 'node_' + _.uuid() }))
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event, elements) => {
    setAnchorEl(event.target);
    setCurrentNodes(Array.isArray(elements) ? elements : [elements]);
    setNodeInfo(Array.isArray(elements) ? null : elements);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentNodes(null);
  };

  const handleOpenSetting = () => {
    console.log('open node ');
    setAnchorEl(null);
  }

  const handleInit = () => {
    setElements(_initialItem);
    requestAnimationFrame(
      () => requestAnimationFrame(
        () => reactFlowInstance.fitView()
      )
    );
  }

  const handleSave = () => {

  };

  const setNodeType = () => {
    setElements(elements.map(el => el.id === nodeInfo.id ? toggleNodeType(el) : el));
    handleClose();
  };
  
  // reqeustAnimationFrame을 사용해 css 적용된 후 바로 한 프레임 뒤에서 fitView 실행
  useEffect(
    () => reactFlowInstance && requestAnimationFrame(
      () => requestAnimationFrame(
        () => reactFlowInstance.fitView()
      )
    ),
    [reactFlowInstance, editable]
  );

  return (
    <Wrapper>
      <LeftDiv onDrop={noop} onDragOver={noop}>
        <ButtonsContainer>
          <button>save</button>
          <button onClick={handleInit}>init</button>
        </ButtonsContainer>
        <EditBar>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>View</Grid>
              <Grid item>
                <Switch color='primary' checked={editable} onChange={() => setEditable(!editable)} name="checkedC" />
              </Grid>
              <Grid item>Edit</Grid>
            </Grid>
          </Typography>
        </EditBar>
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
          snapToGrid
          snapGrid={[100, 100]}>
          <Background gap={11} />
        </ReactFlow>
      </LeftDiv>
      <RightDiv editable={editable}>
        <SideBar actionData={actionData} intentData={intentData} handleDragEnd={handleDragEnd} />
      </RightDiv>
      <NodeMenu
        nodeType={nodeInfo ? nodeInfo.type : null}
        category={(nodeInfo && nodeInfo.data) ? nodeInfo.data.category : null}
        setNodeType={setNodeType}
        anchorEl={anchorEl}
        handleDeleteClick={handleDeleteClick}
        handleClose={handleClose}
        handleOpenSetting={handleOpenSetting}
        open={open} />
    </Wrapper>
  );
}
export default App;

const rightObj = [
  {
    id: 'sub_1',
    sourcePosition: 'right',
    type: 'input',
    className: 'dark-node',
    data: { label: 'Input' },
  },
  {
    id: 'sub_2',
    sourcePosition: 'right',
    type: 'input',
    className: 'dark-node',
    data: { label: 'Input' },
  },
  {
    id: 'sub_3',
    sourcePosition: 'right',
    type: 'input',
    className: 'dark-node',
    data: { label: 'Input' },
  },
  {
    id: 'sub_1',
    sourcePosition: 'right',
    type: 'input',
    className: 'dark-node',
    data: { label: 'Input' },
  },
  {
    id: 'sub_2',
    sourcePosition: 'right',
    type: 'output',
    className: 'dark-node',
    data: { label: 'Input' },
  },
  {
    id: 'sub_3',
    sourcePosition: 'right',
    type: 'output',
    className: 'dark-node',
    data: { label: 'Input' },
  }
]
const initialElements = [
  {
    id: 'horizontal-e1-2',
    source: '1',
    type: 'smoothstep',
    target: '2',
    animated: true,
  },
  {
    id: '1',
    type: 'input',
    category: 'start',
    className: 'dark-node',
    data: { label: 'start_intetn' },
    position: { x: 0, y: 80 },
    style: {
      background: 'rgb(225,225,255)',
      color: '#0041d0',
    },
  },
  {
    id: '2',
    className: 'dark-node',
    category: 'intent',
    data: { label: 'Intent' },
    position: { x: 0, y: 180 },
    style: {
      color: '#0041d0',
      border: '1px solid #0041d0',
    },
  },
  {
    id: '3',
    category: 'action',
    className: 'dark-node',
    data: { label: 'Action' },
    position: { x: 0, y: 280 },
    style: {
      color: '#ff0072',
      border: '1px solid #ff0072',
    },
  },
  {
    id: '4',
    type: 'output',
    category: 'end',
    className: 'dark-node',
    data: { label: 'end_action' },
    position: { x: 0, y: 380 },
    style: {
      background: 'rgb(255,225,225)',
      color: '#ff0072',
    },
  },
];