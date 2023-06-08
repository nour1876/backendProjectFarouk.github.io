import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {





  chart: any;
	
	chartOptions = {
		theme: "light2",
		animationEnabled: true,
		zoomEnabled: true,
		title: {
			text: ""
		},
		axisY: {
			labelFormatter: (e: any) => {
				var suffixes = ["", "K", "M", "B", "T"];
 
				var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
				if(order > suffixes.length - 1)
					order = suffixes.length - 1;
 
				var suffix = suffixes[order];
				return "$" + (e.value / Math.pow(1000, order)) + suffix;
			}
		},
		data: [{
			type: "line",
			xValueFormatString: "YYYY",
			yValueFormatString: "$#,###.##",
			dataPoints: [
			 
			 
			  { x: new Date(2010, 0, 1), y: 50941861580.9 },
			  { x: new Date(2011, 0, 1), y: 43956921719.4 },
			  { x: new Date(2012, 0, 1), y: 50655765599.9 },
			  { x: new Date(2013, 0, 1), y: 59629932862.7 },
			  { x: new Date(2014, 0, 1), y: 62837256171.1 },
			  { x: new Date(2015, 0, 1), y: 61894377981.9 },
			  { x: new Date(2016, 0, 1), y: 64998472607.9 },
			  { x: new Date(2017, 0, 1), y: 75233321687.8 },
			  { x: new Date(2018, 0, 1), y: 68650476424.8 }
			]
		}]
	}	





  chartOptions1 = {
	  animationEnabled: true,
	  title:{
		text: ""
	  },
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 20, name: "" },
		  { y: 10, name: "" },
		
		  { y: 12, name: "" }
		]
	  }]
	}	



	
  chartOptions3 = {
    title:{
      text: ""  
    },
    animationEnabled: true,
    data: [{        
      type: "column",
      dataPoints: [
        { x: 1, y: 71 },
        { x: 10, y: 55 },
        { x: 15, y: 50 },
        { x: 20, y: 65 },
        { x: 25, y: 65 },
        { x: 60, y: 65 },

        { x: 45, y: 95 }
       
      ]
    }]
  }






}



