import styled, { keyframes } from "styled-components";

const loadAnime = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

export const ContainerLoad = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
`;

export const BoxLoad = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 12px;
    border-radius: 8px;
`;

export const LoadAnimation = styled.div`
    animation: ${loadAnime} 2s linear infinite;
`;

export const TxtLoad = styled.p`
    margin-top: 5px;
    font-weight: 400;
    color: #333;
`;