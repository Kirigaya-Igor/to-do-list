import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebaseInit';
import { observer } from 'mobx-react';

import { Button } from 'components/interactions';
import { Expand, Notification, Title } from 'components/other';

import * as ROUTER from 'router/const';
import { useRootStore } from 'stores/initStore';

import * as STYLE from '../units';

import * as S from './units';

export const SignInPage = observer(() => {
    const { authStore } = useRootStore();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setLoading] = useState(false);

    const [errorText, setErrorText] = useState('');

    const signIn = () => {
        setLoading(true);

        signInWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                authStore.setUserData(userCredential.user);

                setLogin('');
                setPassword('');
                setErrorText('');
            })
            .catch((error) => {
                setErrorText(`${error.message} (code: ${error.code})`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <STYLE.PageWrapper>
            <S.TitleWrapper>
                <Title>Sign in</Title>
            </S.TitleWrapper>

            <S.PaperStyled>
                <S.InputStyled
                    value={login}
                    setValue={setLogin}
                    label="Login"
                    disabled={isLoading}
                />

                <S.InputStyled
                    value={password}
                    setValue={setPassword}
                    label="Password"
                    type="password"
                    disabled={isLoading}
                />

                <Expand isOpen={!!errorText}>
                    <S.NotificationWrapper>
                        <Notification type="error">{errorText}</Notification>
                    </S.NotificationWrapper>
                </Expand>

                <Button
                    onClick={signIn}
                    disabled={isLoading || !login || !password}
                    {...{ isLoading }}
                >
                    Sign in
                </Button>
            </S.PaperStyled>

            <S.LinkStyled url={ROUTER.SIGN_UP_PATH}>Create a new account</S.LinkStyled>
        </STYLE.PageWrapper>
    );
});
