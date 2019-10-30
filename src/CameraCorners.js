import React from 'react';
import styled from 'styled-components/native';

import colors from './colors';

const WIDTH = '4px';

const Corners = styled.View`
    position: absolute;
    padding-top: 100%;
    width: 100%;
`;
const Base = styled.View`
    position: absolute;
    height: 60px;
    width: 60px;
    border-color: ${({ color }) => color};
    margin: 2px;
`;
const TopLeft = styled(Base)`
    top: ${({ padding }) => padding};
    left: ${({ padding }) => padding};
    border-left-width: ${WIDTH};
    border-top-width: ${WIDTH};
`;
const TopRight = styled(Base)`
    top: ${({ padding }) => padding};
    right: ${({ padding }) => padding};
    border-right-width: ${WIDTH};
    border-top-width: ${WIDTH};
`;
const BottomLeft = styled(Base)`
    bottom: ${({ padding }) => padding};
    left: ${({ padding }) => padding};
    border-left-width: ${WIDTH};
    border-bottom-width: ${WIDTH};
`;
const BottomRight = styled(Base)`
    bottom: ${({ padding }) => padding};
    right: ${({ padding }) => padding};
    border-right-width: ${WIDTH};
    border-bottom-width: ${WIDTH};
`;

export default ({ color = colors.secondary, height, padding = 0 }) => {
    return (
        <Corners pointerEvents="none">
            <TopLeft color={color} padding={padding} />
            <TopRight color={color} padding={padding} />
            <BottomLeft color={color} padding={padding} />
            <BottomRight color={color} padding={padding} />
        </Corners>
    );
}
