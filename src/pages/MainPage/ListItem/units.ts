import styled from '@emotion/styled';

import { Paper } from 'components/containers';
import { CircleButton } from 'components/interactions';
import { PivotArrow } from 'components/other';

import { theme, toEnd } from 'styles';

export const PaperStyled = styled(Paper)`
    padding: 16px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;

    cursor: pointer;

    ${toEnd('mobile')} {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const ListName = styled.p`
    font-weight: ${theme.text.normal.fontWeight};
    font-size: ${theme.text.extraHuge.fontSize};
`;

export const Progress = styled(ListName)`
    font-size: ${theme.text.small.fontSize};
`;

export const Date = styled(Progress)`
    color: ${theme.colors.gray};

    margin-left: auto;

    user-select: none;

    ${toEnd('mobile')} {
        margin-left: 0;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    ${toEnd('mobile')} {
        justify-content: space-between;

        width: 100%;
    }
`;

export const CircleButtonStyled = styled(CircleButton)`
    height: 32px;
    padding: 0px 16px;
    margin-left: 8px;
`;

export const PivotArrowStyled = styled(PivotArrow)`
    margin-left: 8px;
`;

export const ExpandContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding-top: 16px;
`;

export const CheckbowWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 8px;

    background-color: ${theme.colors.box13};

    border-radius: 8px;

    transition: background-color 0.2s ease-in-out;

    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            background-color: ${theme.colors.box24};
        }
    }
`;

export const CheckboxText = styled.p<{ isDone: boolean }>`
    font-weight: ${theme.text.small.fontWeight};
    font-size: ${theme.text.normal.fontSize};

    color: ${({ isDone }) => isDone && theme.colors.gray};

    text-decoration: ${({ isDone }) => isDone && 'line-through'};
`;
