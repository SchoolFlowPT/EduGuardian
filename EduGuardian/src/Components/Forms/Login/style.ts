import styled from "styled-components";

interface BtnActions {
    isMain: boolean;
}

export const BoxServiceName = styled.div`
    margin-top: 30px;
    color: #333;
`;

export const TxtMainTxt = styled.p`
    font-weight: 400;
`;

export const TxtServiceName = styled.p`
    font-weight: bold;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
`;

export const LineLogin = styled.div`
    display: flex;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

export const BoxIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f5f97;
    padding: 8px;
    border-radius: 3px;
`;

export const InptTxt = styled.input`
    outline: none;
    width: 100%;
    border: none;
    padding-left: 5px;
    color: #666;
    border-radius: 3px;
    font-size: 13px;
    &::placeholder{
        color: #666;
    }
`;

export const BtnBox = styled.button`
    background: ${(props: BtnActions) => props.isMain ? '#0083cb' : '#fff'};
    border-left: ${(props: BtnActions) => props.isMain ? 'none' : '1px solid #0083cb'};
    border-top: ${(props: BtnActions) => props.isMain ? 'none' : '1px solid #0083cb'};
    border-right: ${(props: BtnActions) => props.isMain ? 'none' : '1px solid #0083cb'};
    border-bottom: ${(props: BtnActions) => props.isMain ? '3px solid #0f5f97' : '1px solid #0083cb'};
    padding: 8px;
    display: flex;
    border-radius: 3px;
    outline: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: ${(props: BtnActions) => props.isMain ? '#fff' : '#0083cb'};
    margin-top: 10px;
    &:hover{
        cursor: pointer;
        background: ${(props: BtnActions) => props.isMain ? '#027abd' : '#fff'};
        border-left: ${(props: BtnActions) => props.isMain ? 'none' : '1px solid #027abd'};
        border-top: ${(props: BtnActions) => props.isMain ? 'none' : '1px solid #027abd'};
        border-right: ${(props: BtnActions) => props.isMain ? 'none' : '1px solid #027abd'};
        border-bottom: ${(props: BtnActions) => props.isMain ? '3px solid #0f5f97' : '1px solid #027abd'};
        color: ${(props: BtnActions) => props.isMain ? '#fff' : '#027abd'};
    }
`;

export const TxtAuth = styled.p`
    font-size: 18px;
`;

export const LineBoxs = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

export const LinkHelper = styled.a`
    color: #777;
    font-size: 15px;
    &:last-child{
        text-decoration: none;
    }
    &:hover{
        color: #555;
    }
`;