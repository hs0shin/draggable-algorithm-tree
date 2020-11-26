import React from 'react';
import styled from 'styled-components';

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
    height: calc(50% - 2rem);
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0 0.5rem 0;

    &::-webkit-scrollbar { 
      display: none;
    }

`;

export default function SideBar({ rightObj, handleDragEnd }) {
    return <>
        <LabelDiv>Intent</LabelDiv>
        <ContainerDiv>
            {rightObj.filter(val => val.type === 'input').map(val => <BoxDiv
                draggable
                onDragEnd={handleDragEnd(val)}
            >{val.id}</BoxDiv>)}
        </ContainerDiv>
        <LabelDiv>Action</LabelDiv>
        <ContainerDiv>
            {rightObj.filter(val => val.type === 'output').map(val => <BoxDiv
                draggable
                onDragEnd={handleDragEnd(val)}
            >{val.id}</BoxDiv>)}
        </ContainerDiv>
    </>
}