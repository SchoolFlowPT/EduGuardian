import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { FlagsProps, LangsProps } from "../Types/Langs";

interface LangsData {
    changeLang: React.Dispatch<React.SetStateAction<string>>;
    langs: LangsProps;
    lang: string;
}

const LangsContext = createContext<LangsData>({} as LangsData);

interface ProviderProps {
    children: React.ReactNode;
}

export const LangsProvider: React.FC<ProviderProps> = ({ children }) => {

    const [lang, setLang] = useState(naviLang());
    const [langTxt, setLangTxt] = useState<LangsProps>({} as LangsProps);
    const [langsTxt, setLangsTxt] = useState<FlagsProps>({} as FlagsProps);

    function naviLang(){
        const langNavigator = navigator.language;
        if(langNavigator === "pt-PT"){
            return "pt";
        }else{
            return "en";
        }
    }

    useEffect(() => {
        async function loadLang(){
            if(langsTxt[lang as keyof FlagsProps]){
                setLangTxt(langsTxt[lang as keyof FlagsProps]);
            }else{
                const langReq = (await axios.get('/langs/' + lang + '.json')).data;
                setLangsTxt(function(lastLangs){
                    let listLangsTxt = lastLangs;
                    listLangsTxt[lang as keyof FlagsProps] = langReq;
                    return listLangsTxt;
                });
                setLangTxt(langReq);
            }
        }
        loadLang();
    }, [lang]);

    return (
        <LangsContext.Provider value={{ changeLang: setLang, langs: langTxt, lang }}>
            {children}
        </LangsContext.Provider>
    );
};

export function useLangs(){
    const context = useContext(LangsContext);
    return context;
}