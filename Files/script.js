var allText;
//read text files from the server
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;             
            }
        }
    }
    rawFile.send(null);
}
var namesSMI = ['Date','SM30', 'SM40', 'SM50', 'SM60', 'SM70', 'SM80', 'SM90', 'SM100']; 
//convert text strings into arrays for plotting, this is for temperature and moisture data
function readlongdata()
{
    var t1 = allText.split("\n");
    var array = [];
    for (var i=0;i<t1.length;i++)
    {
        array[i] = t1[i].split(",");
    }                
    var length = array.length;          
    var d = [];
    for (var i=0;i<100;i++)
    {
        d[i] = [];
        /*if (array[i][0] != "")
        {
            var parts = array[i][0].split('/');
            var parts1 = array[i][1].split(':');    
            var x = Date.UTC(parts[2], parts[1]-1, parts[0],parts1[0],parts1[1]);                     
        }*/
        var x = String(array[i][0]);
        
        var y = [];
        for (var j=0;j<8;j++)
        {
            y[j] = Number(array[i][j+2]);             
        }
        d[i].push([x,y]);
        alert(d[i]);
    }
    return d;    
}
readTextFile("Files/b1moist.csv");
var moist = readlongdata();  


//draw charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
var data = google.visualization.arrayToDataTable([
          namesSMI,
          moist
        ]);
var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
};

var chart = new google.visualization.LineChart(document.getElementById('moist'));

chart.draw(data, options);
}

   
