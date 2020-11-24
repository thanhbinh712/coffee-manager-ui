import React from 'react';
import styled from '@emotion/styled'

const SlideContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 90%;
  width: ${props => props.width}px;
  display: flex;
  background-color: red;
`

export default SlideContent;