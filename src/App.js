import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import {crossfilter,d3} from 'dc';

class App extends Component {
  constructor(props) {
    super(props);
    this.ctx = null;
    this.barChart = null;   
  }

  componentDidMount(){
    fetch('http://localhost:5000/database')
    .then((data)=> {
      return data.json();
    })
    .then((json) => {
      
      this.ctx = crossfilter(json);   
      this.regionDimension = this.ctx.dimension(function(d) { return d.State });
      this.relationDim = this.ctx.dimension(function(d){ return d.Relationship});
      this.relationDim2 = this.ctx.dimension(function(d){return d.Relationship});
      this.weaponDim = this.ctx.dimension(function(d){ return d.Weapon});
      this.regionCounts = this.regionDimension.group().reduceCount();
      this.relationCount = this.relationDim.group().reduceCount();   
      this.weaponCount = this.weaponDim.group().reduceCount();
      this.relColors = ["#78afdf","#8dccf2","#6eddcf","#33b2f0","#27d6b7","#36bff2","#9dddf1","#7edfca","#43b3f1","#27d7b8", "#44a171"];
      this.weaponColors = ["#56afab","#8dccb1","#89dd91","#67b2f0","#64d6b7","#78bff2","#9dddf1","#7edfca","#43b3f1","#27d7b8", "#4433A1"];
      this.barChart = <BarChart ctx={this.ctx} Counts={this.regionCounts} Dimension={this.regionDimension} Host={"bar"} yLabel={"Homicides"} xLabel={"State"} />;
      this.barChart2 = <BarChart ctx={this.ctx} Counts={this.weaponCount} Dimension={this.weaponDim} Host={"bar2"} yLabel={"Homicides"} xLabel={"Weapons"} />;
      this.pieChart = <PieChart ctx={this.ctx} Colors={this.relColors} Counts={this.relationCount} Dimension={this.relationDim} Host={"pie"} />

      this.pieChart2 = <PieChart ctx={this.ctx} Colors={this.weaponColors} Counts={this.weaponCount} Dimension={this.weaponDim} Host={"pie2"} />
      this.forceUpdate();
    });
  }
 
  render() {  
    
    return (        
          <div className="row">
          {this.barChart}
          {this.barChart2}
          {this.pieChart}
          {this.pieChart2}
          </div>        
      );
   
  }
}

export default App;
