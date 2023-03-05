import { useEffect, useState } from "react";
import { useLangs } from "../../Contexts/Langs";
import { useUtils } from "../../Contexts/Utils";
import { BACKEND_URL } from "../../env";
import { InitialConfig } from "../../Types/Models";
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

    const { lang, changeLang } = useLangs();
    const { setLoading }  = useUtils();

    const [actualBg, setActualBg] = useState(0);
    const [pageConfig, setPageConfig] = useState<InitialConfig>({} as InitialConfig);
    const [contextAuth, setContextAuth] = useState('login');

    useEffect(() => {
        async function loadOAuth(){
            setLoading(true);
            api.get('/initialConfig').then((pageConfigRes) => {
                setPageConfig(pageConfigRes.data);
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
                if(err.code === "ERR_NETWORK"){
                    setContextAuth('serverError');
                }else{
                    setContextAuth(err.response.data.status);
                }
            })
            setLoading(false);
        }
        loadOAuth();
    }, []);

    function loadBackground(){
        if(Object.keys(pageConfig).length > 0){
            return pageConfig.images[actualBg];
        }else{
            return "notLoaded";
        }
    }

    function loadSchoolImage(){
        if(Object.keys(pageConfig).length > 0){
            return BACKEND_URL + "static/logo.png"
        }else{
            return "/images/logo.svg";
        }
    }

    return (
        <Container bgPath={loadBackground()}>
            <LangBoxContainer>
                <TfiWorld size={15} color="#333" />
                <SelectLang value={lang} onChange={(selectOpt) => { changeLang(selectOpt.target.value); }}>
                    <OptLang value="pt">Português</OptLang>
                    <OptLang value="en">English</OptLang>
                </SelectLang>
            </LangBoxContainer>
            <LoginContainer>
                <BoxLogin>
                    <LogoSchool src={loadSchoolImage()} title="Nome Escola" alt="Nome Escola" />
                    { contextAuth === "login" ? <Login /> : <ErrorPage errorCode={contextAuth} /> }
                    <ImgLogos src="/images/logo-edu.png" title="Logos EDU" alt="Logos EDU" />
                </BoxLogin>
            </LoginContainer>
        </Container>
    );
}