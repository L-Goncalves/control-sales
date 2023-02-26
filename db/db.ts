import { PrismaClient } from ".prisma/client";
import { Prisma, Seller } from "@prisma/client";
import * as CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

const prisma = new PrismaClient()


dotenv.config();



export async function createSeller(seller: Omit<Seller, "id">){

    try {
        await prisma.seller.create({data: { ...seller }})
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
           throw 'Ocorreu uma violação, este vendedor não pode ser cadastrado '
          }
        }
        throw e
      }
}

export async function getSellerCode(code: string){
    try {
      
    } catch (error) {
      
    }


}

export async function getSeller(discord_id: string){
  try {
     const foundSeller = await prisma.seller.findUnique({
      where: {
        discordId: discord_id
      },
      select: {
        nickname: true,
        code: true
      }
    })

    if(!foundSeller){
      throw "Not Found"
    }
    console.log(foundSeller)
    return foundSeller;

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
       throw 'Ocorreu uma violação, este vendedor não pode ser cadastrado '
      }
    }
    throw e
  }
}

export async function saveDetailsAccount(account: any) {
  
  try {

    const encryptedPassword = CryptoJS.AES.encrypt(account.password, process.env.ENCRYPTEDPASSWORD as string).toString(); 

    const accountData = {
      ...account,
      password: encryptedPassword
    }


    await prisma.account.create({data: { ...accountData }})
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
       throw 'Ocorreu uma violação, essa conta não pode ser cadastrada'
      }
    }
    throw e
  }
}


export async function getAccountsByDiscordId(discord_id: string){
  try {
    const foundAccountsByDiscordId =await prisma.seller.findMany({
     where: {
       discordId: discord_id
     },
     select: {
       accounts: true
     }
   })

   if(!foundAccountsByDiscordId){
     throw "Not Found"
   }
   console.log(foundAccountsByDiscordId)
   return foundAccountsByDiscordId;

 } catch (e) {
   if (e instanceof Prisma.PrismaClientKnownRequestError) {
     // The .code property can be accessed in a type-safe manner
     if (e.code === 'P2002') {
      throw 'Ocorreu uma violação, este vendedor não pode ser cadastrado '
     }
   }
   throw e
 }
}