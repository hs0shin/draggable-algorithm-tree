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

export default function SideBar({ rightObj, handleDragEnd }) {
    return <>
        {rightObj.map(val => <BoxDiv
            draggable
            onDragEnd={handleDragEnd(val)}
        >{val.id}</BoxDiv>)}
    </>
}