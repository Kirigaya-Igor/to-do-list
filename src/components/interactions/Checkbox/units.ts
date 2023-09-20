import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    width: fit-content;

    font-weight: ${theme.text.small.fontWeight};
    font-size: ${theme.text.normal.fontSize};

    user-select: none;

    cursor: pointer;
`;

export const Checkbox = styled.div<{ value: boolean }>`
    position: relative;

    width: 18px;
    height: 18px;

    background-color: ${({ value }) => (value ? theme.colors.green : theme.colors.white)};

    border-radius: 2px;
`;
