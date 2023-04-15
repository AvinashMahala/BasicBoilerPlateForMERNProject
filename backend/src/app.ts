import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use((req, res, next)=>{
    next(createHttpError(404,"Endpoint not Found!!"));
});


app.use((error:unknown, req:Request, res:Response, next:NextFunction)=>{
    //console.log(error);
    let errorMessage="An Unknown Error Occurred!";
    let statusCode=500;
    if(isHttpError(error)){
        statusCode=error.status;
        errorMessage=error.message;
    }
    res.status(statusCode).json({error: errorMessage});
});

export default app;