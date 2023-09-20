import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from 'firebaseInit';
import { observer } from 'mobx-react';
import { Language, Nullable } from 'types/common';

import { Expand, PivotArrow } from 'components/other';

import { useBlockBodyScroll, useDeviceType, useMountEffect, useOutsideClick } from 'hooks';
import { useRootStore } from 'stores/initStore';

import { LanguageIconWrapper, LanguageItemWrapper, LanguageText } from '../Header/units';

import { ReactComponent as EnSVG } from '../Header/images/en-icon.svg';
import { ReactComponent as MoonSVG } from '../Header/images/moon-icon.svg';
import { ReactComponent as PlSVG } from '../Header/images/pl-icon.svg';
import { ReactComponent as RuSVG } from '../Header/images/ru-icon.svg';
import { ReactComponent as SunSVG } from '../Header/images/sun-icon.svg';

import * as S from './units';

const languagesOptions = [
    { value: Language.EN, title: 'English', icon: <EnSVG /> },
    { value: Language.PL, title: 'Polski', icon: <PlSVG /> },
    { value: Language.RU, title: 'Русский', icon: <RuSVG /> },
];

export const MobileMenu = observer(() => {
    const { commonStore, authStore } = useRootStore();

    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

    const menuRef = useRef(null);
    const burgerRef = useRef<Nullable<HTMLElement>>(null);

    const {
        i18n: { language, changeLanguage },
    } = useTranslation();

    useOutsideClick(menuRef, commonStore.isMenuOpen, commonStore.setMenuOpen, burgerRef);

    useBlockBodyScroll(commonStore.isMenuOpen);

    const { isMobile } = useDeviceType();

    useMountEffect(() => {
        burgerRef.current = document.getElementById('burgerMenuButton');
    });

    useEffect(() => {
        !isMobile && commonStore.setMenuOpen(false);
    }, [isMobile]);

    const languageHandler = (lang: Language) => {
        changeLanguage(lang);

        setLanguageDropdownOpen(false);
    };

    const logoutHandler = () => {
        signOut(auth)
            .then(() => {
                authStore.setUserData(null);
            })
            .catch((error) => {
                console.log(error);
            });

        commonStore.setMenuOpen(false);
    };

    return (
        <S.Wrapper isOpen={commonStore.isMenuOpen}>
            <Expand isOpen={commonStore.isMenuOpen}>
                <S.ExpandContent ref={menuRef}>
                    <S.LanguagesWrapper isLight={commonStore.isLight}>
                        {authStore.isAuth && (
                            <>
                                <S.DisplayName>
                                    {authStore.userData?.displayName || authStore.userData?.email}
                                </S.DisplayName>

                                <S.ButtonStyled size="small" onClick={logoutHandler}>
                                    Logout
                                </S.ButtonStyled>
                            </>
                        )}

                        <S.SwitchWrapper onClick={commonStore.toggleTheme}>
                            <S.SwitchName>Switch theme</S.SwitchName>

                            <S.SwitchStyled
                                isActive={commonStore.isLight}
                                icon={commonStore.isLight ? <SunSVG /> : <MoonSVG />}
                            />
                        </S.SwitchWrapper>

                        <S.LanguageToggleWrapper
                            onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
                        >
                            <S.SwitchName>Change language</S.SwitchName>

                            <PivotArrow
                                isActive={isLanguageDropdownOpen}
                                isReverse={isLanguageDropdownOpen}
                            />
                        </S.LanguageToggleWrapper>

                        <Expand isOpen={isLanguageDropdownOpen}>
                            <S.LanguagesBlock>
                                {languagesOptions.map((item, index) => (
                                    <LanguageItemWrapper
                                        key={index}
                                        isLight={commonStore.isLight}
                                        isActiveItem={item.value === language}
                                        onClick={() => languageHandler(item.value)}
                                    >
                                        <LanguageIconWrapper>{item.icon}</LanguageIconWrapper>

                                        <LanguageText>{item.title}</LanguageText>
                                    </LanguageItemWrapper>
                                ))}
                            </S.LanguagesBlock>
                        </Expand>
                    </S.LanguagesWrapper>
                </S.ExpandContent>
            </Expand>
        </S.Wrapper>
    );
});
