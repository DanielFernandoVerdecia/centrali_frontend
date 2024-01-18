import { ElegirProducto } from "./elegir_producto";
import { Mesa } from "./mesa";

export interface VerVenta {

    id: number,
    productos: ElegirProducto[],
    mesa: Mesa,
    info_ventas: {id: number, descripcion: string}[],
    ganancia_total: number,
    venta_finalizada: boolean,
    fecha_creacion: string,
    fecha_actualizacion: string


}