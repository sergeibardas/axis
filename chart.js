var Chart = function(container,config) {
	renderCanvasContainer();
	
	this.ctx = document.getElementById('canvo').getContext('2d');
	config.height = config.height -20;
	
	var pointsHolder = config.data[0];
	var pointsNumber = pointsHolder.points.length;
	var marginAxisX = config.axisX.max - config.axisX.min;
	
	drawAxisX();
	drawAxisY();
	drawHorizontalDashedLines();

	for (var i = 0;i < pointsNumber;i++) {
		if (i < pointsNumber - 1){
			drawPlot(i,pointsHolder);
		}	
		
		var x1 = config.width*((pointsHolder.points[i].x-config.axisX.min)/(config.axisX.max-config.axisX.min));
		var y1 = config.height - config.height*(pointsHolder.points[i].y/config.axisY.max);
		
		drawHorizontalDashedLines();
		drawVerticalDashedLines(i,x1,y1,pointsHolder,marginAxisX);
		drawCirclePoint(i,x1,y1,pointsHolder,marginAxisX);
		drawTooltip(i,x1,y1,pointsHolder,marginAxisX);
	}
	
	
function renderCanvasContainer() {	
	$('#container').append("<canvas id='canvo'></canvas>");
	$('#canvo').attr('width',config.width);
	$('#canvo').attr('height',config.height);
}	

//core drawing function	
function drawPlot(i,pointsHolder){
	var xFrom = config.width*((pointsHolder.points[i].x-config.axisX.min)/(config.axisX.max-config.axisX.min));
	var yFrom = config.height -  config.height*(pointsHolder.points[i].y/config.axisY.max);
	var xTo = config.width*((pointsHolder.points[i+1].x-config.axisX.min)/(config.axisX.max-config.axisX.min));
	var yTo = config.height - config.height*(pointsHolder.points[i+1].y/config.axisY.max);
	ctx.beginPath();
	ctx.lineTo(xFrom,yFrom+20);
	ctx.lineTo(xTo,yTo+20);
	ctx.strokeStyle = pointsHolder.color;
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.closePath();
}
	
function drawAxisX(){
		var size = config.axisX.points.length;
		for (var y = 0; y < size; y++){
				ctx.fillStyle = "ccc";
				ctx.font = "18px verdana";
				ctx.fillText(config.axisX.points[y],(config.width/(size-1))*y,config.height);
				
				//small dashes
				ctx.beginPath();
				ctx.lineTo((config.width/(size-1))*y,config.height - 20);
				ctx.lineTo((config.width/(size-1))*y,config.height - 30);
				ctx.strokeStyle = "ccc";
				ctx.lineWidth = 1.5;
				ctx.stroke();
				ctx.closePath();
		}
		ctx.beginPath();
		//ctx.lineTo(100,config.height - 20);
		ctx.lineTo(0,config.height - 20);
		ctx.lineTo(config.width,config.height - 20);
		ctx.strokeStyle = "ccc";
		ctx.lineWidth = 1.5;
		ctx.stroke();
		ctx.closePath();
};
	
function drawAxisY(){
		//percentage axis values(Y)
		for (var t = 0,prc = 0;t < 100,prc < 6;t+=20,prc++){
				ctx.fillStyle = "ccc";
				ctx.font = "18px verdana";
				ctx.fillText(t==100?t+='%':t,config.width-45,config.height-(config.height/5)*(prc)+20);
		}
};
	
function drawHorizontalDashedLines(){
	for (var m = 0;m < config.axisY.max;m++){
			ctx.beginPath();
			ctx.strokeStyle = '0baee5';
			ctx.lineWidth = 1;
			ctx.fillStyle = "0baee5";
			ctx.font = "18px verdana";
			ctx.fillText(m+1,0,config.height-(config.height/3)*(m+1)+25);
			ctx.dashedLine(0,config.height-(config.height/3)*(m+1)+20,config.width,config.height-(config.height/3)*(m+1)+20,[1,1]);
			ctx.closePath();
			ctx.stroke();
	}
};	

function drawVerticalDashedLines(i,x1,y1,pointsHolder,marginAxisX){
		ctx.beginPath();
		ctx.dashedLine(x1,y1,x1,config.height-20,[1,1]);
		ctx.strokeStyle = 'cccccc';
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fillStyle = "#000";
		ctx.font = "18px verdana bold";
		ctx.fillText(pointsHolder.points[i].x,x1 - 20,config.height - 40);
		ctx.closePath();
};

function drawCirclePoint(i,x1,y1,pointsHolder,marginAxisX){
		ctx.fillStyle = pointsHolder.color;
		ctx.beginPath();
		ctx.arc(x1,y1+20,9,0,Math.PI*2,true);
		ctx.fill();
		ctx.closePath();
		ctx.fillStyle = "fff";
		ctx.beginPath();
		ctx.arc(x1,y1+20,6,0,Math.PI*2,true);
		ctx.fill();
		ctx.closePath();
};

function drawTooltip(i,x1,y1,pointsHolder,marginAxisX){
		var tooltipWidth = 70;
		var tooltipHeight = 50;
		var borderSize = 2;
		ctx.fillStyle = pointsHolder.color;
		ctx.fillRect(x1 -tooltipWidth/2,y1-86+20,tooltipWidth,tooltipHeight);
		ctx.fillStyle = "fff";
		ctx.fillRect(x1 - tooltipWidth/2 + borderSize,y1-82+20,tooltipWidth-borderSize*2,tooltipHeight-borderSize*2);
		
		//labels
		ctx.fillStyle = "#000";
		ctx.font = "22px verdana bold";
		ctx.fillText(pointsHolder.points[i].y,x1-10-borderSize*2,y1-60+20);
		ctx.font = "14px verdana";
		ctx.fillText(pointsHolder.points[i].percent + '%',x1-10-borderSize*2,y1-30+20);
		
		//triangle
		ctx.beginPath();  
		ctx.lineTo(x1 + tooltipWidth/2 - borderSize,y1-36+20);  
		ctx.lineTo(x1,y1-16+20);  
		ctx.strokeStyle = pointsHolder.color;
		ctx.lineWidth = 2;
		ctx.closePath();  
		ctx.stroke();  
		
		ctx.beginPath();  
		ctx.lineTo(x1,y1-16+20);  
		ctx.lineTo(x1-tooltipWidth/2,y1-36+20);  
		ctx.strokeStyle = pointsHolder.color;
		ctx.lineWidth = 2;
		ctx.closePath();  
		ctx.stroke();  
}
}