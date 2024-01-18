export interface VerProducto{

   id: number,
   producto: string,
   precio: number,
   cantidad_disponible: number,
   creador: {
      id: number,
      nombre: string,
      cargo: string
   },
   fecha_creacion: string,
   fecha_actualizacion: string

}