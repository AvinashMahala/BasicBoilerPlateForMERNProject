import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

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