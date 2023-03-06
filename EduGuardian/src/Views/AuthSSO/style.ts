import styled from "styled-components";
import { BACKEND_URL } from "../../env";

interface ContainerBox {
    bgPath: string;
}

export const Container = styled.div`
    background: ${(props: ContainerBox) => props.bgPath !== "notLoaded" ? "url(" + BACKEND_URL + "static/" + props.bgPath + ")" : "#ccc"};
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 8px;
    transition: all 1s ease-in-out;
`;

export const LangBoxContainer = styled.div`
    background: #fff;
    display: flex;
    align-items: center;
    padding: 7px;
    border-radius: 10px;
`;

export const SelectLang = styled.select`
    margin-left: 7px;
    border: none;
    outline: none;
    color: #333;
`;

export const OptLang = styled.option``;

export const BoxLogin = styled.div`
    padding: 14px;
    min-width: 400px;
    max-width: 400px;
    background: #fff;
    border-radius: 5px;
`;

export const LogoSchool = styled.img`
    width: 140px;
`;

export const ImgLogos = styled.img`
    width: 160px;
    margin-top: 15px;
`;

export const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;