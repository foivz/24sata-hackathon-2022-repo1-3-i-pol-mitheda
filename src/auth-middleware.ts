import Express from 'express'
import jwt_decode from "jwt-decode";
 


export default function authMiddleware(req: any, res: any, next: any) {
    const token = req.body.token ?? null
    if(token) {
        const decoded = jwt_decode(token)
        // iz nekog razloga res.locals nije defined, a trebal bi bit
        // kreiranje praznog objekta za svaki slucaj ako treba
        res.locals = res.locals ?? {}
        res.locals.user = decoded
    }

    
 
    next()
}