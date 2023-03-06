import { Fragment, useEffect, useState } from "react";
import { useLangs } from "../../Contexts/Langs";
import { useUtils } from "../../Contexts/Utils";
import { BACKEND_URL, STATIC_URL } from "../../env";
import { InitialConfig } from "../../Types/Models";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";

import {
    Container,
    LangBoxContainer,
    SelectLang,
    OptLang,
    BoxLogin,
    LogoSchool,
    ImgLogos,
    LoginContainer
} from "./style";

import { TfiWorld } from "react-icons/tfi";

import Login from "../../Components/Forms/Login";
import ErrorPage from "../../Components/Forms/Error";

export default function AuthSSO(){

    const { langs, lang, changeLang } = useLangs();
    const { setLoading, isLoading }  = useUtils();

    const [actualBg, setActualBg] = useState(0);
    const [pageConfig, setPageConfig] = useState<InitialConfig>({} as InitialConfig);
    const [contextAuth, setContextAuth] = useState('login');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        setLoading(true);
        api.get('/initialConfig?clientId=' + searchParams.get('clientId') + '&redirectUri=' + searchParams.get('redirectUri') + '&scopes=' + searchParams.get('scopes')).then((pageConfigRes) => {
            setPageConfig(pageConfigRes.data);
            const link = document.createElement('link');
            link.href = STATIC_URL + "favicon.ico";
            link.rel = "icon";
            link.type = "image/svg+xml";
            document.getElementsByTagName('head')[0].appendChild(link);
            setLoading(false);
            setInterval(function() {
                setActualBg((atual) => {
                    if(atual === pageConfigRes.data.images.length-1){
                        atual = 0;
                        return atual;
                    }else{
                        atual++;
                        return atual;
                    }
                });
            }, 5000);
        }).catch((err) => {
            const link = document.createElement('link');
            link.href = STATIC_URL + "favicon.ico";
            link.rel = "icon";
            link.type = "image/svg+xml";
            document.getElementsByTagName('head')[0].appendChild(link);
            if(err.code === "ERR_NETWORK"){
                setContextAuth('serverError');
            }else{
                setPageConfig(err.response.data);
                setContextAuth(err.response.data.error);
            }
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if(Object.keys(pageConfig).length > 0){
            document.title = `${langs.pageTitle} - ${pageConfig.entity.smallName} | EduGuardian`;
        }else{
            document.title = `${langs.pageTitle} | EduGuardian`;
        }
    }, [langs, pageConfig]);

    return (
        <Fragment>
            { Object.keys(pageConfig).length > 0 ?
            <Container bgPath={pageConfig.images[actualBg]}>
                <LangBoxContainer>
                    <TfiWorld size={15} color="#333" />
                    <SelectLang value={lang} onChange={(selectOpt) => { changeLang(selectOpt.target.value); }}>
                        <OptLang value="pt">Português</OptLang>
                        <OptLang value="en">English</OptLang>
                    </SelectLang>
                </LangBoxContainer>
                <LoginContainer>
                    <BoxLogin>
                        <LogoSchool src={STATIC_URL + "logo.png"} title={pageConfig.entity.name} alt={pageConfig.entity.smallName} />
                        { contextAuth === "login" ? <Login preData={pageConfig} /> : <ErrorPage errorCode={contextAuth} /> }
                        <ImgLogos src={STATIC_URL + "logo-edu.png"} title="Logos EDU" alt="Logos EDU" />
                    </BoxLogin>
                </LoginContainer>
            </Container>
            :
            <Container bgPath="notLoaded">
                <LangBoxContainer>
                    <TfiWorld size={15} color="#333" />
                    <SelectLang value={lang} onChange={(selectOpt) => { changeLang(selectOpt.target.value); }}>
                        <OptLang value="pt">Português</OptLang>
                        <OptLang value="en">English</OptLang>
                    </SelectLang>
                </LangBoxContainer>
                <LoginContainer>
                    <BoxLogin>
                    <LogoSchool src={STATIC_URL + "logo.png"} title="EduGuardian" alt="EduGuardian" />
                        { !isLoading ? <ErrorPage errorCode="serverError" /> : null }
                        <ImgLogos src={STATIC_URL + "logo-edu.png"} title="Logos EDU" alt="Logos EDU" />
                    </BoxLogin>
                </LoginContainer>
            </Container>
            }
        </Fragment>
    );
}