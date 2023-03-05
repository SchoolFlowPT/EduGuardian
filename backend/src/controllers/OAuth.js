import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getInitialConfig(req, res){
    const imagesBD = await prisma.backgroundImages.findMany({
        select: {
            uri: true
        }
    });
    let images = [];
    for(let i = 0; i <= imagesBD.length-1; i++){
        images.push(imagesBD[i].uri);
    }
    res.status(200).json({
        images
    });
}