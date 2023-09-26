import styled from '@emotion/styled';

import { Button, CircleButton } from 'components/interactions';

import { theme } from 'styles';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    width: 100%;
`;

export const DeleteButton = styled(CircleButton)`
    background-color: ${theme.colors.red};

    @media (hover: hover) {
        &:not(:disabled):hover {
            background-color: ${theme.colors.red50};
        }
    }
`;

export const CircleButtonStyled = styled(CircleButton)`
    margin-left: auto;

    background-color: ${theme.colors.green};

    @media (hover: hover) {
        &:not(:disabled):hover {
            background-color: ${theme.colors.green50};
        }
    }
`;

export const ButtonStyled = styled(Button)`
    margin-top: 24px;
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
