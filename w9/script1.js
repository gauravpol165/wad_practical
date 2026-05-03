function get(){
    let city=document.getElementById("city").value.toLowerCase();
    let xhr=new XMLHttpRequest();
    xhr.open("GET","weather.json",true);

    xhr.onload=function(){
        if(this.status===200){
            let data=JSON.parse(this.responseText);

            if(data[city]){
                document.getElementById("result").innerHTML=
                "<h3>Weather in: "+city.toUpperCase()+" </h3>"+
                "<p><b>Teperature: </b>"+data[city].temperature+ " </p>"+
                "<p><b>Humidity: </b>"+data[city].humidity+ " </p>"+
                "<p><b>Condition: </b>"+data[city].condition+ " </p>";
            }else{
                document.getElementById("result").innerHTML=
                "<p style='color:red'>City Not Found!!!!</p>";
            }
        }
    };
    xhr.send();
}