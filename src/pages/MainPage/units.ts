import styled from '@emotion/styled';

import { Button, SearchInput } from 'components/interactions';

import { theme } from 'styles';

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    width: 100%;
    margin-bottom: 32px;
`;

export const SearchInputStyled = styled(SearchInput)`
    max-width: 400px;
`;

export const ButtonInputStyled = styled(Button)`
    max-width: max-content;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
`;

export const InfoText = styled.p`
    font-weight: ${theme.text.small.fontWeight};
    font-size: ${theme.text.tiny.fontSize};

    color: ${({ theme }) => theme.colors.text};

    text-align: center;
`;