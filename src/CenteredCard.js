import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

export const CardView = styled.View`
    display: flex;
    align-items: center;
    margin: 20px 0 0 0;
`;

export const CenteredCard = styled(Card)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 299px;
    width: 299px;
    padding: 10px;
`;