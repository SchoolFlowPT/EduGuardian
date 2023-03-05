import { useLangs } from "../../../Contexts/Langs";
import { LangsProps } from "../../../Types/Langs";

import {
    Container,
    TxtError
} from "./style";

import { MdError } from "react-icons/md";

interface ErrorData {
    errorCode: string;
}

export default function ErrorPage(props: ErrorData){

    const { langs } = useLangs();

    return (
        <Container>
            <MdError size={120} color="#e84033" />
            <TxtError>{langs[props.errorCode as keyof LangsProps]}</TxtError>
        </Container>
    );
}