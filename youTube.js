window.addEventListener("load", ()=>{
    trend();
});

let trend = async () =>{
    try{
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?regionCode=IN&bp=6gQJRkVleHBsb3Jl&key=AIzaSyAsyNYflq_1PECvt3FC1z5xEJc5qNdmA_o&part=snippet&maxResults=20&relevanceLanguage=en-US`);
        let {items} = await res.json();
        // let data = await res.json();
        // console.log(items);
        // console.log(data);
        disp(items);
    }  catch(err){
        console.log(err);
    }
}

let it;
let display = async () =>{
    document.querySelector("#filtr").style.display="block";
    document.querySelector("#ln").style.display="block";
    try{
        let sc = document.querySelector("#daTa").value;

        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${sc}&key=AIzaSyAsyNYflq_1PECvt3FC1z5xEJc5qNdmA_o&part=snippet&maxResults=20&relevanceLanguage=en-US`);
        let {items} = await res.json();
        console.log(items);
        it=items;
        disp(items);
    }  catch(err){
        console.log(err);
    }
}

let disp = (arr) =>{
    document.querySelector("#container").innerHTML=null;
    arr.forEach(({id:{videoId}, snippet:{title}, snippet:{publishedAt}, snippet:{thumbnails:{high:{url}}}}) => {
        console.log(publishedAt.length);
        let div=document.createElement("div");
        div.style.width="250px";
        div.style.height="235px";
        div.addEventListener("click", ()=>{
            play(videoId,title);
        })
        let img=document.createElement("img");
        img.src=url;
        img.style.width="100%";
        let h5=document.createElement("h3");
        h5.innerText=title;
        h5.style.overflow="hidden";
        h5.style.width="100%";
        h5.style.height="45px";
        h5.style.marginTop="-5px";
        h5.style.marginBottom="15px";
        div.append(img,h5);
        document.querySelector("#container").append(div);
    });
}

let play = (x,y) =>{
    localStorage.setItem("id",`${x}`);
    localStorage.setItem("title",`${y}`);
    window.location.assign("video.html");
}


let filtr = () =>{
    document.querySelector("#optns").style.display="block";
}

let srthrs  = () =>{
    console.log(" Sort By Hours");
    let h=new Date().getHours();
    let m=new Date().getMinutes();
    let xr =it.filter(function (el){
        if(Number((el.snippet.publishedAt[11])+(el.snippet.publishedAt[12]))>=(h-1)){
            return el;
        }
    });
    console.log(xr);
    disp(xr);
    document.querySelector("#optns").style.display="none";
}
let srttdy  = () =>{
    console.log(" Sort By Today");
    let d=new Date().getDate();
    let xr =it.filter(function (el){
        if(Number((el.snippet.publishedAt[8])+(el.snippet.publishedAt[9]))==d){
            return el;
        }
    });
    console.log(xr);
    disp(xr);
    document.querySelector("#optns").style.display="none";
}
let srtmnth = () =>{
    console.log(" Sort By Month");
    console.log(" Sort By Today");
    let m=new Date().getMonth();
    let xr =it.filter(function (el){
        if(Number((el.snippet.publishedAt[5])+(el.snippet.publishedAt[6]))==m){
            return el;
        }
    });
    console.log(xr);
    disp(xr);
    document.querySelector("#optns").style.display="none";
}
let srtyrs  = () =>{
    console.log(" Sort By Years");
    console.log(" Sort By Today");
    let y=new Date().getFullYear;
    let xr =it.filter(function (el){
        if(Number((el.snippet.publishedAt[0])+(el.snippet.publishedAt[1])+(el.snippet.publishedAt[2])+(el.snippet.publishedAt[3]))==y){
            return el;
        }
    });
    console.log(xr);
    disp(xr);
    document.querySelector("#optns").style.display="none";
}
