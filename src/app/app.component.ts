import { Component,OnInit,ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[BaseChartDirective]
})
export class AppComponent implements OnInit{
  @ViewChild(BaseChartDirective) Chart:BaseChartDirective;  
  
  ngOnInit(){
    console.log(typeof(io));
    var socket = io('http://localhost:3000');
    socket.on('ChartsData',(data)=>{
      console.log(data);
      this.updateChartData(data);
    })
  }

  ChartLabels:Array<any>= ["January","February","March","April","May"];
  ChartData:Array<any>=[                
    { data: [32, 59, 80, 81, 28 ] , label: 'SeriesA' },
    { data: [28, 48, 40, 19, 65 ] , label: 'SeriesB' },
    { data: [18, 48, 77, 23, 32 ] , label: 'SeriesC' },
    { data: [48, 89, 80, 81, 48 ] , label: 'SeriesD' },
              ];
  
  ChartColors: Array<object> = [
        {     
          borderColor: '#86FF8C',
          pointBorderColor: '#86FF8C',
          pointBackgroundColor:'#86FF8C',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#86FF8C',
          backgroundColor:'transparent'
        },
        {     
          borderColor: '#FFE38B',
          pointBorderColor: '#FFE38B',
          pointBackgroundColor:'#FFE38B',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#FFE38B',
          backgroundColor:'transparent'
        },
        {     
          borderColor: '#393BFF',
          pointBorderColor: '#393BFF',
          pointBackgroundColor:'#393BFF',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#393BFF',
          backgroundColor:'transparent'
        },        
        {     
          borderColor: '#FF5347',
          pointBorderColor: '#FF5347',
          pointBackgroundColor:'#FF5347',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#FF5347',
          backgroundColor:'transparent'
        }       
  ];

  ChartLegend:boolean = true;
  ChartType:string = 'line';
  
  ChartOptions:any = {
    events:['click'],
    legend:{
      labels:{fontColor:'white'}
    },
    scales:{
      xAxes:[ {
                  scaleLabel:{
                    display:true,
                    labelString:"Month",
                    fontSize:16,
                    fontColor:"white"
                  },
                  ticks:{
                    fontColor:'#FFF'
                  }
            }],
      yAxes:[ {
                  scaleLabel:{
                    display:true,
                    labelString:"Percentage%",
                    fontSize:16,
                    fontColor:"white"
                  },
                  ticks:{
                    fontColor:'#FFF',
                    padding:10
                  }
            }]
    }

  }




  updateChartData(sample){
    sample = sample.ChartData;
            console.log(sample);
            this.ChartLabels.push(sample.month);
            
            for(var i=0;i<sample.Data.length;i++){     
                   var ChartIndex = this.ChartData.findIndex(p => p.label == sample.Data[i].series);
                   
                   this.ChartData[ChartIndex]["data"].push(sample.Data[i].percentage);    
            }
            
            this.ChartLabels.shift();
            for(var i=0;i<this.ChartData.length;i++){
                    this.ChartData[i]["data"].shift();
            }
            console.log(this.ChartData);

            this.Chart.chart.update();
  }

  printChange(){
    console.log(this.ChartType);
  }


}
