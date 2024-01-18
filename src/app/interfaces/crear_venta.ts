import { ElegirProducto } from "./elegir_producto"

export interface CrearVenta{

    productos: ElegirProducto[],
    mesa: number,
    venta_finalizada: boolean

}