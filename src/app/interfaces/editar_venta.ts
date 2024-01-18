import { ElegirProducto } from "./elegir_producto";
import { Mesa } from "./mesa";

export interface EditarVenta{

    productos: ElegirProducto[],
    mesa: number,
    venta_finalizada: boolean, 

}   