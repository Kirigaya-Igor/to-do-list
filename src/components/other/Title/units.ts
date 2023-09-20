import styled from '@emotion/styled';

import { theme } from 'styles';

export const Title = styled.h1<{ isSmall?: boolean }>`
    font-family: ${theme.fonts.gilroy} !important;
    font-weight: ${theme.text.normal.fontWeight};
    font-size: ${({ isSmall }) => (isSmall ? theme.text.extraHuge.fontSize : '30px')};

    color: ${({ theme }) => theme.colors.text};
`;
