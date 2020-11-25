import './App.css';
import Test from './components/ReactFlow';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.div`
  display: flex;
  width: 1800px;
  height: 800px;
`;

const LeftDiv = styled.div`
  height: 100%;
  width : ${props => props.editable ? '80%' : '100%'};
  background-color: rgb(250,250,250);
`;

const RightDiv = styled.div`
  height: 100%;
  width: ${props => props.editable ? '20%' : 0};
  overflow: auto;
  background-color: rgb(240,240,240);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::-webkit-scrollbar { 
    display: none;
  }
`;

const Toolbar = styled.div`
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

function App() {
  const [editable, setEditable] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  const onLoad = (rf) => {
    setReactFlowInstance(rf);
  };

  const handleDragEnd = (objInfo) => (e) => {
    const position = reactFlowInstance.project({ x: e.clientX, y: e.clientY });
    setElements(elements.concat({ ...objInfo, position: position }))
  }

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
      <LeftDiv>
        <Test initialElements={elements} onLoad={onLoad} editable={editable}></Test>
      </LeftDiv>
      <RightDiv editable={editable}>
        <SideBar rightObj={rightObj} handleDragEnd={handleDragEnd} />
      </RightDiv>
      <Toolbar>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>View</Grid>
            <Grid item>
              <Switch color='primary' checked={editable} onChange={() => setEditable(!editable)} name="checkedC" />
            </Grid>
            <Grid item>Edit</Grid>
          </Grid>
        </Typography>
      </Toolbar>
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
  }
]
const initialElements = [
  {
    id: '1',
    type: 'input',
    className: 'dark-node',
    data: { label: 'start_intent' },
    position: { x: 0, y: 80 },
    style: {
      background: 'rgb(225,225,255)',
      color: '#0041d0',
    },
  },
  {
    id: '2',
    className: 'dark-node',
    data: { label: 'Intent' },
    position: { x: 0, y: 180 },
    style: {
      color: '#0041d0',
      border: '1px solid #0041d0',
    },
  },
  {
    id: '3',
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
    className: 'dark-node',
    data: { label: 'end_action' },
    position: { x: 0, y: 380 },
    style: {
      background: 'rgb(255,225,225)',
      color: '#ff0072',
    },
  },
];