import React, { Component } from 'react';
import {pieChart, d3, units} from 'dc';
import './Pie.css';
import dc from 'dc';
class PieChart extends Component {
    constructor(props) {
        super(props);
        this.ctx = this.props.ctx;
        this.Counts = this.props.Counts;
        this.Dimension = this.props.Dimension;
        this.Host = this.props.Host;
        this.Colors = this.props.Colors;
        
        console.log("here");
    } 

    constructChart(){
         this.chart = pieChart("#"+ this.Host);
         var colorScale = d3.scale.ordinal().range(this.Colors);
         if(window.innerWidth < 750){
         this.chart
            .width(window.innerWidth)
            .height(window.innerHeight/2.1)
            .slicesCap(10)
            .innerRadius(window.innerWidth/4)            
              
            .legend(dc.legend().y(10).x(10))
            .colors(colorScale)
            .dimension(this.Dimension)
            .group(this.Counts)     
            .minAngleForLabel(5)           
            .on('pretransition', function(chart) {
                chart.selectAll('text.pie-slice').text(function(d) {
                    if((d.endAngle - d.startAngle) > 0.5){
                        return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
                    }
                })
            }); 
         }else{
            this.chart
            .width(window.innerWidth/2)
            .height(window.innerHeight/2.1)
            .slicesCap(10)
            .colors(colorScale)
            .innerRadius(window.innerWidth/10)
            .externalLabels(window.innerWidth/18)
            .externalRadiusPadding(window.innerWidth/18)            
            .dimension(this.Dimension)
            .group(this.Counts)            
            .legend(dc.legend().y(10).x(10))
            // workaround for #703: not enough data is accessible through .label() to display percentages
            .on('pretransition', function(chart) {
                chart.selectAll('text.pie-slice').text(function(d) {
                    if((d.endAngle - d.startAngle) > 0.5){
                        return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
                    }
                })
            }); 
         }
            this.chart.render();
    

    }

    componentDidMount(){
        this.constructChart();        
    }
    render() {      

        return (
            
            <div id={this.Host} className="pie col-xs-12 col-sm-6"></div>
            
        );
    }
}

export default PieChart;