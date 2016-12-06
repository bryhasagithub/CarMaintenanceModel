// Define Margin
var margin = {top: 50, right: 80, bottom: 50, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Define Ranges of X-Y Axis Scale
var xScale = d3.scale.linear().range([0,width]),
    yScale = d3.scale.linear().range([height,0]);

// Define X-Y Axis
var xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// Define Tooltip
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Define SVG
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define Color
var colors = d3.scale.category20();

// Get Data
d3.csv("scatter/scatterdata.csv", function(error, data) {
    
    data.forEach(function(d) {
        d.carpart = d.carpart;
        d.miles = +d.miles;
        d.milestwo = +d.milestwo;
        d.carnumber = +d.carnumber;
        d.milesthree - +d.milesthree;
    })

    // Scale Range of Data
    xScale.domain([d3.min(data, function(d) { return d.carnumber;})-1, d3.max(data, function(d) { return d.carnumber;})+1]);
    yScale.domain([d3.min(data, function(d) { return d.miles-10000;}), d3.max(data, function(d) { return d.miles+10000;})+1]);
 

    
    // Draw Country Names
    svg.selectAll(".text")
        .data(data)
        .enter().append("text")
        .attr("class","text")
        .style("text-anchor", "start")
        .attr("x", function(d) {return xScale(d.carnumber);})
        .attr("y", function(d) {return yScale(d.miles);})
        .attr("dx", ".5em")
        .attr("dy", "1.7em")
        .style("fill", "black")
        .text(function(d) {return d.carpart; });


    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
       .append("text")
        .attr("class", "label")
        .attr("x", width/2)
        .attr("y", 40)
        .style("text-anchor", "end")
        .text("Car Part");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
       .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)" )
        .attr("x", -170)
        .attr("y", -70)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Miles");


    // Graph Title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text("Zoomable Scatterplot");

    // Draw scatterplot
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return Math.sqrt(d.milestwo/2); })
        .attr("cx", function(d) { return xScale(d.carnumber);})
        .attr("cy", function(d) { return yScale(d.miles);})
        .style("fill", function(d) { return colors(d.carpart); })
        .on("mouseover", function(d) {
            tooltip.transition()
            .duration(600)
            .style("opacity", .9);
            tooltip.html("Name: " + d.carpart + "<br/>" + "Range: " + d.milesthree 
            + " Miles - " + d.miles + " miles" + "<br/> ")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(600)
            .style("opacity", 0);
        });

    // Scale Changes as we zoom
    svg.call(d3.behavior.zoom().x(xScale).y(yScale).on("zoom", zoom));  // Call funtion zoom

    // Zoom into data (.dot)
    function zoom() {
        svg.selectAll(".dot")
            .attr("cx", function(d) { return xScale(d.carnumber); })
            .attr("cy", function(d) { return yScale(d.miles); })
        svg.selectAll(".text")
            .attr("x", function(d) {return xScale(d.carnumber);})
            .attr("y", function(d) {return yScale(d.miles);})
        d3.select('.x.axis').call(xAxis);
        d3.select('.y.axis').call(yAxis);
    }



    });