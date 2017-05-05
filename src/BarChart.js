import React, { Component } from 'react';
import {barChart, d3, units} from 'dc';
import './Bar.css';
import dc from 'dc';
class BarChart extends Component {
    constructor(props) {
        super(props);
        this.ctx = this.props.ctx;
        this.Counts = this.props.Counts;
        this.Dimension = this.props.Dimension;
        this.Host = this.props.Host;
        this.xLabel = this.props.xLabel;
        this.yLabel = this.props.yLabel;
        console.log("here");
    } 

    constructChart(){
         this.chart = barChart("#"+ this.Host);
         this.chart
         .height(window.innerHeight/(2.1))
            .x(d3.scale.ordinal().domain(this.Counts.top(Infinity)
            .map((s)=>{
                return s.key
            })))
            .margins({top: 10, right: 50, bottom: 30, left: 80})
            .xAxisLabel(this.xLabel)        
            .brushOn(false)
            .yAxisLabel(this.yLabel, 25)        
            .dimension(this.Dimension)
            .group(this.Counts)        
            .xUnits(units.ordinal)
            .on('renderlet', function(chart) {
                chart.selectAll('rect').on("click", function(d) {
                    this.Dimension = this.Dimension.filter(d.x);
                    this.chart.x(d3.scale.ordinal().domain(this.Counts.top(Infinity)
                    .map((s)=>{
                        return s.key
                    })))
                    
                    dc.redrawAll();
                }.bind(this));
            }.bind(this))
            .on('preRedraw', function(chart){
                this.chart.y(d3.scale.linear().domain([0,this.Counts.top(1)[0].value]));
                
            }.bind(this));
            
         if(window.innerWidth < 750){
            this.chart
            .width(window.innerWidth)    
            
         }else{
            this.chart
            .width(window.innerWidth/2)
            
         }
            this.chart.render();
    

    }

    componentDidMount(){
        this.constructChart();        
    }
    render() {      

        return (
            
            <div id={this.Host} className="bar col-xs-12 col-sm-6"></div>
            
        );
    }
}

export default BarChart;