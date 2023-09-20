import styled from '@emotion/styled';

import { Loader } from 'components/core';

import { toEnd } from 'styles';

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    min-height: 100%;
    width: 100%;

    padding: 8px 16px;

    ${toEnd('mobile')} {
        padding: 4px 8px 8px;
    }
`;

export const LoaderStyled = styled(Loader)`
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
`;
