import { Component, ViewChild, ViewChildren } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";



import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ModalService } from "../modal/servicios/modal.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
};


@Component({
  selector: 'app-ingresos-gastos',
  templateUrl: './ingresos-gastos.component.html',
  styleUrls: ['./ingresos-gastos.component.css']
})



export class IngresosGastosComponent {

  ingresos = 5000
  gastos = 30000

 

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(

    private modal_service: ModalService

  ) {


    //Gráfica Ingresos - Gastos
    this.chartOptions = {

      series: [this.ingresos, this.gastos],

      chart: {
        type: "donut"
      },

      labels: ["Ingresos", "Gastos"],

      colors: ['#1CAC78', '#BA0021'],

      
  
   
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    //Fin Gráfica Ingresos - Gastos


  }

  
  //------------Menú desplegable Ingresos y Gastos--------------------


  ingresos_gatos_desplegable: {
    
    tipo: string,
    registros: any[],
    seleccionar: boolean,
    seleccionados: number[]

  }[]  = [

    {
      tipo: 'Ingreso',

      registros: [

        {

          id: 10,
          creador: 'Elon Musk',
          dinero: 10200,
          motivo: 'Aporte',
          descripcion: 'Un amigo me pagó lo que debía',
          fecha: '2020-10-05'
     

        },

        {

          id: 18,
          creador: 'Nikola Tesla',
          dinero: 369,
          motivo: 'Venta',
          descripcion: 'Venta común y corriente xd',
          fecha: '2021-10-05'
     

        }


     


      ],

      seleccionar: false,
      
      //Recoge ID
      seleccionados: []

    },

    {

      tipo: 'Gasto',

      registros: [

        {

          id: 25,
          creador: 'Bowser',
          dinero: 554545445,
          motivo: 'Productos',
          descripcion: 'Tuve que comprarle :(',
          fecha: '2025-10-05'
     

        },

        {

          id: 80,
          creador: 'Midulive',
          dinero: 3205454,
          motivo: 'Deuda',
          descripcion: 'Fue una deuda necesaria',
          fecha: '2025-10-05'
     

        }


     


      ],

      seleccionar: false,

      //Recoge ID
      seleccionados: []

    }

  ]


  //En el DropDown
  select_on_off(ingreso_gasto_obtenido: string){

    this.ingresos_gatos_desplegable.find(

      (ingreso_gasto)=>{

        
        if (ingreso_gasto.tipo == ingreso_gasto_obtenido){

            //Activar selección
            if(!ingreso_gasto.seleccionar){

              ingreso_gasto.seleccionar = true

            }   
            
            //Desactivar selección
            else{

              ingreso_gasto.seleccionar = false

              ingreso_gasto.seleccionados = []

            }

        }

      

      }

    )

  }

  //Fin En el DropDown

  //Acción de seleccionar los registros uno por uno
  elegir_registro(ingreso_gasto_obtenido: string, id_obtenido: number){

    this.ingresos_gatos_desplegable.find(

      (ingreso_gasto)=>{

        if (ingreso_gasto.tipo == ingreso_gasto_obtenido && ingreso_gasto.seleccionar){

          const indice = ingreso_gasto.seleccionados.indexOf(id_obtenido)

          //Agregar a seleccionados
          if (indice == -1){

            ingreso_gasto.seleccionados.push(id_obtenido)

          }

          //Quitar de seleccionados
          else{

            ingreso_gasto.seleccionados.splice(indice, 1)

          }

        
        }

      }

    )    

  }
  //Fin Acción de seleccionar los registros uno por uno

  
  elegir_todos_registro(ingreso_gasto_obtenido: string){


    this.ingresos_gatos_desplegable.find(

      (ingreso_gasto)=>{

        if (ingreso_gasto.tipo == ingreso_gasto_obtenido) {


          //Vaciar todo seleccionado
          ingreso_gasto.seleccionados = []

          //Obtener el ID de cada registro
          ingreso_gasto.registros.forEach(

            (actual)=>{

              ingreso_gasto.seleccionados.push(actual.id)

            }

          )


        }

      }

    )
    

  }

  
  //------------Fin Menú desplegable Ingresos y Gastos--------------------
  

  campos_modal: {campo: string, tipo: string} [] = [

    {campo: 'Creador', tipo: 'text'},

    {campo: 'Dinero', tipo: 'money'},

    {campo: 'Motivo', tipo: 'text'},

    {campo: 'Descripción', tipo: 'text_area'},

    {campo: 'Fecha', tipo: 'date'}

  ] 


  //-------------Modal-------------
  @ViewChildren('Modal') Modal!:any;
  

  abrir_modal(ingreso_gasto_obtenido: string){

    this.modal_service.nombre_registro = ingreso_gasto_obtenido
    this.modal_service.iniciar_componente = true
    this.modal_service.campos_modal = this.campos_modal

    //Abrir el modal pedido
    if (ingreso_gasto_obtenido == 'Ingreso'){

      this.Modal.toArray()[0].ngOnInit()

    }

    else{


      this.Modal.toArray()[1].ngOnInit()


    }

  
    
    

  }

  //-------------Fin Modal-------------





}
