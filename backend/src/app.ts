import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import NoteModel from "./models/note";


const app = express();

app.get("/",async (req, res, next)=>{
    try {
        // throw Error("Bazzinga!!");
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
    
});

app.use((req, res, next)=>{
    next(Error("Endpoint not Found!!"));
});


app.use((error:unknown, req:Request, res:Response, next:NextFunction)=>{
    console.log(error);
    let errorMessage="An Unknown Error Occurred!";
    if(error instanceof Error){
        errorMessage=error.message;
    }
    res.status(500).json({error: errorMessage});
});

export default app;