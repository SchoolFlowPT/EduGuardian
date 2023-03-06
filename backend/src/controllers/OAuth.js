import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getInitialConfig(req, res){
    const imagesBD = await prisma.backgroundImages.findMany({
        select: {
            uri: true
        }
    });
    const images = imagesBD.map(imageData => imageData.uri);
    const entity = await prisma.entityConfig.findFirst({
        select: {
            name: true,
            smallName: true
        }
    });
    if(req.query.clientId === "null" || req.query.redirectUri === "null" || req.query.scopes === "null"){
        return res.status(400).json({
            images,
            entity,
            appVersion: "v1.0",
            error: "bad-parameters"
        });
    }
    const { hostname, protocol } = new URL(req.query.redirectUri);
    if(protocol !== "https:"){
        return res.status(400).json({
            images,
            entity,
            appVersion: "v1.0",
            error: "not-secure-redirect"
        });
    }
    const oauthClient = await prisma.oAuthClients.findUnique({
        where: {
            id: req.query.clientId
        },
        select: {
            name: true,
            AllowedHosts: {
                select: {
                    host: true
                }
            },
            Scopes: {
                select: {
                    uri: true
                }
            }
        }
    });
    if(!oauthClient){
        return res.status(401).json({
            images,
            entity,
            appVersion: "v1.0",
            error: "oauth-not-found"
        });
    }
    if(oauthClient.AllowedHosts.findIndex((allowHost) => { return (allowHost.host === hostname); }) === -1){
        return res.status(401).json({
            images,
            entity,
            appVersion: "v1.0",
            error: "domain-not-allowed"
        });
    }
    const requestedScopes = req.query.scopes.split(",");
    const allScopesAllowed = requestedScopes.every(requestedScope => {
        return oauthClient.Scopes.some(allowedScope => allowedScope.uri === requestedScope);
    });
    if(!allScopesAllowed){
        return res.status(401).json({
            images,
            entity,
            appVersion: "v1.0",
            error: "scopes-not-allowed"
        });
    }
    res.status(200).json({
        images,
        entity,
        appVersion: "v1.0",
        oauthName: oauthClient.name
    });
}