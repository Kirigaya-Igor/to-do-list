import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from 'firebaseInit';
import { observer } from 'mobx-react';

import { Button } from 'components/interactions';
import { Expand, Notification, Title } from 'components/other';

import * as ROUTER from 'router/const';
import { useRootStore } from 'stores/initStore';

import * as STYLE from '../units';

import * as S from './units';

export const SignUpPage = observer(() => {
    const { authStore } = useRootStore();

    const [displayName, setDisplayName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setLoading] = useState(false);

    const [errorText, setErrorText] = useState('');

    const { t } = useTranslation();

    const signUp = () => {
        setLoading(true);

        createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                authStore.setUserData({ ...userCredential.user, displayName });

                updateProfile(userCredential.user, { displayName });

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
                <Title>{t('SignUpPage.Sign up')}</Title>
            </S.TitleWrapper>

            <S.PaperStyled>
                <S.InputStyled
                    value={displayName}
                    setValue={setDisplayName}
                    label={t('SignUpPage.Display Name')}
                    disabled={isLoading}
                />

                <S.InputStyled
                    value={login}
                    setValue={setLogin}
                    label={t('SignInPage.Login')}
                    disabled={isLoading}
                />

                <S.InputStyled
                    value={password}
                    setValue={setPassword}
                    label={t('SignInPage.Password')}
                    type="password"
                    disabled={isLoading}
                />

                <Expand isOpen={!!errorText}>
                    <S.NotificationWrapper>
                        <Notification type="error">{errorText}</Notification>
                    </S.NotificationWrapper>
                </Expand>

                <Button
                    onClick={signUp}
                    disabled={isLoading || !login || !password}
                    {...{ isLoading }}
                >
                    {t('SignUpPage.Sign up')}
                </Button>
            </S.PaperStyled>

            <S.LinkStyled url={ROUTER.SIGN_IN_PATH}>{t('SignUpPage.Go to sign in')}</S.LinkStyled>
        </STYLE.PageWrapper>
    );
});
