import { Router } from "express";
import prisma from "./prisma"

const router = Router()

// return a 6 digit ranodm short code 
function shortCodeGen(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for(let i = 0; i < 6; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

// in frontend user sends a long url, here we save it and give a short url
router.post('/links', async (req, res) => {
    const {originalUrl} = req.body

    if(!originalUrl){
        return res.status(400).json({message: 'URL required'})
    }

    //generate a short code
    const shortCode = shortCodeGen()

    //in the dtaabse we save the short code and the url as the other colusm already get data automatically set in them
    const link = await prisma.link.create({
        data: {
            shortCode,
            originalUrl
        }
    })

    //wghat we send back to frontend
    return res.status(201).json({
        shortCode: link.shortCode,
        originalUrl: link.originalUrl,
        //need to change this when i deploy 
        shortUrl: `http://localhost:3000/${link.shortCode}`
        
    })
})

//getting url from the short url 
router.get('/:shortCode', async (req, res) => {

    // get whatever was in short url shoudl just be a 6 ditit id that we made before
    const {shortCode} = req.params

    //find the row matching the 6 digits we have
    const link = await prisma.link.findUnique({
        where: {shortCode}
    })

    if(!link){
        return res.status(404).json({message: 'No link found'})
    }

    await prisma.link.update({
        //find row with short code
        where: {shortCode},
        //increment the click count
        data: {clickCount: {increment: 1}}
    })

    //go to the original url
    return res.redirect(link.originalUrl)
})

export default router