'use server';
import {z , ZodSchema} from 'zod';
import { currentUser, getAuth } from '@clerk/nextjs/server';
import db from './db';
import { redirect } from 'next/navigation';
import { productSchema, validateWithZodSchema , imageSchema} from './schemas';
import { uploadImage } from './supabase';

const getAuthUser = async () => {
    const user = await currentUser();
    if(!user) redirect('/');
      return user;
}

const renderError = (error:unknown) : {message:string} => {
    console.log(error);
        return {message: error instanceof Error ? error.message : 'An error occured'}
}

export const fetchFeaturedProducts = async () => {
    const products = await db.product.findMany({
        where : {
            featured : true
        }
    }) 
    return products;
}

export const fetchAllProducts = async ({search = ''}: {search: string}) => {
    const products = await db.product.findMany({
        where: {
            OR: [
                {name: {contains: search , mode: 'insensitive'}},
                {company: {contains: search , mode: 'insensitive'}},
            ]
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    return products;
}

export const fetchSingleProduct = async (productId : string) => {
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) redirect('/products');
    return product;
}

export const createProductAction = async (prevState: any, formData:FormData):Promise<{message: string}> => {
    //// CLERK ID
    const user = await getAuthUser();
    try {
        
        const rawData = Object.fromEntries(formData);
        const file = formData.get('image') as File;
        const validatedFields = validateWithZodSchema(productSchema , rawData);
        const validateFile = validateWithZodSchema(imageSchema , {image: file});
       
        const fullPath = await uploadImage(validateFile.image);
        await db.product.create({
            data: {
                  ...validatedFields,
                  image: fullPath,
                  clerkId: user.id
            }
        })
              
    } catch (error) {
        return renderError(error);
    }
    redirect('/admin/products')
} 
