import styled from '@emotion/styled';

import { Paper } from 'components/containers';
import { Input, Link } from 'components/interactions';

import { theme } from 'styles';

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
`;

export const NotificationWrapper = styled.div`
    padding-bottom: 24px;
`;

export const PaperStyled = styled(Paper)`
    max-width: 500px;
    margin: 24px auto;
`;

export const InputStyled = styled(Input)`
    margin-bottom: 24px;
`;

export const LinkStyled = styled(Link)`
    font-weight: ${theme.text.normal.fontWeight};
    font-size: 20px;

    margin: 0 auto;
`;
