import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"

export interface IProveedor extends mongoose.Document { 
    nombre: string;
    direccion: string;
    correo: string;
    telefono: number;

}

const ProveedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: {type: String, required: true},
    direccion: { type: String, required: true },
    telefono: {type: Number, required: true},
});

export const Proveedor = mongoose.model<IProveedor>("Proveedor", ProveedorSchema);

export const CreateProveedor = async function(nom: string, direccion: string, correo: string, telefono: number){
    await connectMongoDB;

    const newProveedor = new Proveedor();
    newProveedor.nombre = nom;
    newProveedor.direccion = direccion;
    newProveedor.correo = correo;
    newProveedor.telefono = telefono;

    newProveedor.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newProveedor);
        }
    } );
}

export function getProveedor(_name: string):Promise<any>{
    return new Promise<any>( resolve => {
        Proveedor.findOne({ nombre: _name}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}


