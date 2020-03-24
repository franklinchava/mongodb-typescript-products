import mongoose = require("mongoose");
import {IProveedor, getProveedor} from "./Proveedores"
import {connectMongoDB} from "./helpers"

interface IProducts extends mongoose.Document { 
    descripcion: string;
    categoria: string;
    precio_venta: number;
    cantidad: number;
    proveedor: IProveedor
}

const ProductoSchema = new mongoose.Schema({
    descripcion: { type: String, required: true},
    categoria:{type: String, required: true},
    precio_venta: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor" }
});


export const Producto = mongoose.model<IProducts>("Producto", ProductoSchema);

export const CreateProduct = async function(nomProveedor:string, categoria:string, descripcion: string, precio_venta:number, cantidad:number){
    //Conectar con la base de datos
    await connectMongoDB;
    //Obtener el proveedor en funcion del nombre
    const prov:any = await getProveedor(nomProveedor);
    


    //persistencia de nuestro producto
    const p = new Producto();
    p.descripcion = descripcion;
    p.categoria = categoria;
    p.precio_venta = precio_venta;
    p.cantidad =  cantidad;
    p.proveedor = prov;

    p.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(p);
        }
    });
}

