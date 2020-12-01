import React, { useState } from 'react';
import styled from 'styled-components';
import { setSideActionArr, setSideIntentArr } from '../scenario';
import TextField from '@material-ui/core/TextField';

const BoxDiv = styled.div`
    box-shadow: 0 0.1rem 0.4rem 0.1rem rgba(0,0,0,0.08);
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 0.3rem;
    width: 15rem;
    font-size: 1.2rem;
    color: #222;
    text-align: center;
    border-width: 0.1rem;
    border-style: solid;
    cursor: grab;
`;

const LabelDiv = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    overflow: hidden;
    padding: 0.5rem 0 0.5rem 0;
    `;

const ContainerDiv = styled.div`  
    width: 100%;
    height: calc(50% - 3rem);
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0 0.5rem 0;

    &::-webkit-scrollbar { 
      display: none;
    }

`;

export default function SideBar({ actionData, intentData, handleDragEnd }) {
    const [keyWord, setKeyWord] = useState('');

    return <>
        <TextField label="Search field" type="search" value={keyWord} onChange={(e) => setKeyWord(e.target.value)} />
        <LabelDiv>Intent</LabelDiv>
        <ContainerDiv>
            {setSideIntentArr(intentData)
                .filter(val => val.data.label.includes(keyWord))
                .map(val => <BoxDiv
                    draggable
                    onDragEnd={handleDragEnd(val)}
                >{val.data.label}</BoxDiv>)}
        </ContainerDiv>
        <LabelDiv>Action</LabelDiv>
        <ContainerDiv>
            {setSideActionArr(actionData)
                .filter(val => val.data.label.includes(keyWord))
                .map(val => <BoxDiv
                    draggable
                    onDragEnd={handleDragEnd(val)}
                >{val.data.label}</BoxDiv>)}
        </ContainerDiv>
    </>
}