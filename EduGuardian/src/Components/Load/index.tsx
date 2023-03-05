import { Fragment } from "react";
import { useUtils } from "../../Contexts/Utils";
import { useLangs } from "../../Contexts/Langs";

import {
    ContainerLoad,
    BoxLoad,
    LoadAnimation,
    TxtLoad
} from "./style";

import { BiLoaderCircle } from "react-icons/bi";

export default function Load(){

    const { isLoading } = useUtils();
    const { langs } = useLangs();

    return (
        <Fragment>
            { isLoading ?
            <ContainerLoad>
                <BoxLoad>
                    <LoadAnimation>
                        <BiLoaderCircle size={40} color="#333" />
                    </LoadAnimation>
                    <TxtLoad>{langs.processingTxt}</TxtLoad>
                </BoxLoad>
            </ContainerLoad> : null }
        </Fragment>
    );
}