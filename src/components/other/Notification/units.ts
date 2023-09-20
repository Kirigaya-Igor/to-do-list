import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { CircleButton } from 'components/interactions';

import { theme } from 'styles';

import { ReactComponent as InfoSVG } from './images/info-icon.svg';

const background = (type: 'info' | 'warning' | 'error') => {
    return type === 'warning'
        ? theme.colors.orange15
        : type === 'error'
        ? theme.colors.red15
        : theme.colors.box7;
};

const color = (type: 'info' | 'warning' | 'error', globalTheme: Theme) => {
    return type === 'warning'
        ? theme.colors.orange
        : type === 'error'
        ? theme.colors.red
        : globalTheme.colors.text;
};

export const Wrapper = styled.div<{ type?: 'info' | 'warning' | 'error'; withButton: boolean }>`
    display: flex;
    align-items: ${({ withButton }) => withButton && 'center'};
    gap: 16px;

    width: 100%;
    padding: 16px;

    background-color: ${({ type = 'info' }) => background(type)};

    border-radius: ${theme.borderRadiusSecondary};

    & > p {
        color: ${({ type = 'info', ...props }) => color(type, props.theme)};
    }
`;

export const InfoIcon = styled(InfoSVG)`
    min-width: 24px;
    min-height: 24px;
`;

export const Text = styled.p`
    font-weight: ${theme.text.small.fontWeight};
    font-size: ${theme.text.small.fontSize};
`;

export const CircleButtonStyled = styled(CircleButton)`
    margin-left: auto;
`;
