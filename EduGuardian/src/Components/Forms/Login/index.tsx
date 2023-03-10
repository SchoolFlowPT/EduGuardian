import { Fragment } from "react";
import { useLangs } from "../../../Contexts/Langs";
import { InitialConfig } from "../../../Types/Models";

import {
    BoxServiceName,
    TxtMainTxt,
    TxtServiceName,
    LoginForm,
    LineLogin,
    BoxIcon,
    InptTxt,
    TxtAuth,
    BtnBox,
    LineBoxs,
    LinkHelper
} from "./style";

import { FaUserAlt } from "react-icons/fa";
import { GoKey } from "react-icons/go";

interface FormPreData {
    preData: InitialConfig;
}

export default function Login(props: FormPreData){

    const { langs } = useLangs();

    return (
        <Fragment>
            <BoxServiceName>
                <TxtMainTxt>{langs.accessingTxt}</TxtMainTxt>
                <TxtServiceName>{props.preData.oauthName}</TxtServiceName>
            </BoxServiceName>
            <LoginForm method="post">
                <LineLogin>
                    <BoxIcon>
                        <FaUserAlt size={18} color="#fff" />
                    </BoxIcon>
                    <InptTxt type="text" autoCapitalize="off" autoComplete="email" autoCorrect="off" placeholder={langs.usernamePl} required />
                </LineLogin>
                <LineLogin>
                    <BoxIcon>
                        <GoKey size={18} color="#fff" />
                    </BoxIcon>
                    <InptTxt type="password" autoCapitalize="off" autoComplete="password" autoCorrect="off" placeholder={langs.passwordPl} required />
                </LineLogin>
                <BtnBox isMain={true} type="submit">
                    <TxtAuth>{langs.authBtn}</TxtAuth>
                </BtnBox>
            </LoginForm>
            <BtnBox isMain={false}>
                <TxtAuth>{langs.cmdCCAuth}</TxtAuth>
            </BtnBox>
            <LineBoxs>
                <LinkHelper href="#">{langs.recoverBtn}</LinkHelper>
                <LinkHelper href="https://github.com/SchoolFlowPT" target="_blank">{props.preData.appVersion}</LinkHelper>
            </LineBoxs>
        </Fragment>
    );
}