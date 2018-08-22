let chart = document.getElementById('canvas');
let ctx = chart.getContext('2d');
let x = chart.width;
let y = chart.height-30;
let max_temp = 50;
let min_temp = -40;
let zero_yaxis;
let temp_space = 10;
let line_count = (max_temp-min_temp)/temp_space;
let space_height = y/(line_count+1);
let temp_height = y/(max_temp-min_temp+10);



let initData = (citys) =>{
    let i = 0;
    setInterval(()=>{
        if(i<citys.length){
            $(".spinner").show();
            $("#canvas").hide();
            new Promise((resolve,reject)=>{
                $.ajax({
                    url : '/location',
                    type: "POST",
                    dataType: "json",
                    data:{
                        city : citys[i]
                    },
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(error){
                        reject(error)
                    }
                })
            }).then((res)=>{
                addData(res,citys[i]);
                i++;
            })            
        }else{
            $(".spinner").hide();
            $("#canvas").show();
        }  
    },5000+i*1200)
}

let initChart = () =>{
    let y_axis = y;
    ctx.clearRect(0, 0, x, chart.height);
    min_temp = -40;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.moveTo(30,5);
    ctx.lineTo(30,y);
    ctx.lineTo(x,y);
    
    while(y_axis!==0){
        if(min_temp==0){
            zero_yaxis = y_axis;
        }
        ctx.font = "15px Arial";
        ctx.fillText(min_temp,0,y_axis);
        ctx.moveTo(30,y_axis);
        ctx.lineTo(x,y_axis);
        y_axis-=space_height;
        min_temp+=temp_space;
    }
    ctx.stroke();
}

let chartHeight = (temp) =>{
    if(temp>0){
        return -( temp * temp_height );
    }else{
        return temp*temp_height;
    }
}

let addData = (temp,city) =>{
    data[city] = temp
    console.log(data);
    drawChart();
}

let randerColor = (temp) =>{
    let r,g,b;
    if(temp>=0){
        r = 255;
        g = 255-temp*6;
        b = 255-temp*6;
    }else{
        r = 255+temp*6;
        g = 255+temp*6;
        b = 255;
    }   
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

let drawChart = () =>{
    initChart();
    let chart_data = Object.keys(data);
    let chart_width = x/chart_data.length;
    let center_width = chart_width/4;
    let x_begin = 30;
    chart_data.map((index)=>{
        let height = chartHeight(data[index]);
        let text = index +" "+ data[index] + "°C";
        let y_position = data[index]>0 ? zero_yaxis+height-10 : zero_yaxis-height+10;

        ctx.fillText(text,x_begin+center_width,y_position);
        ctx.fillStyle= randerColor(data[index]);
        ctx.fillRect(x_begin,zero_yaxis,chart_width,height);
        x_begin+=chart_width;
    })
}