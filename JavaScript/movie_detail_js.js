$('body').scrollspy({ target: '#navbar' });
$().ready(()=>{
    let id=window.location.href.split("?")[1].split("=")[1];
    $.get(`/movie?movieId=${id}`,(movieInfo)=>{
        display(movieInfo);
        $.get(`/search_movie_class?search_keywords=${movieInfo[0].MovieName}`, (movies)=>{
            displayTypeInfo(movies);
        });
    });
});

$("#search_btn").click(function () {
    let keywords=document.getElementById('search_input').value;
    $.get(`/search_movie?search_keywords=${keywords}`,(movieInfo) => {
        display(movieInfo);
    });
    $.get(`/search_movie_class?search_keywords=${keywords}`, (movies)=>{
        displayTypeInfo(movies);
    });
});

function display(movieInfo) {
    let movie_name=document.getElementsByClassName("movie_name");
    for(let i=0;i<movie_name.length;i++){
        movie_name[i].innerHTML=movieInfo[0].MovieName;
    }
    let movie_img=document.getElementById("movie_img").setAttribute("src", movieInfo[0].ImgUrl);
    let director=document.getElementById("director");
    director.innerHTML=movieInfo[0].Direcrtor;
    let writers=document.getElementById("writers");
    writers.innerHTML=movieInfo[0].Writers;
    let stars=document.getElementById("stars");
    stars.innerHTML=movieInfo[0].Starring;
    let type=document.getElementById("type");
    type.innerHTML=movieInfo[0].Type;
    let areas=document.getElementById("areas");
    areas.innerHTML=movieInfo[0].Area;
    let language=document.getElementById("language");
    language.innerHTML=movieInfo[0].Language;
    let release_data=document.getElementById("release_data");
    release_data.innerHTML=movieInfo[0]['Release date'];
    let time=document.getElementById("time");
    time.innerHTML=movieInfo[0].Time;
    let words=document.getElementById("introduction-words");
    words.innerHTML=movieInfo[0].Introduction;
    let movieComment=document.getElementById("movieComment");
    movieComment.innerHTML=movieInfo[0].comment;
    let score=document.getElementById("score");
    score.innerHTML=`<h4>豆瓣评分:</h4>
                <div id="scores"></div>`;
    let scores=document.getElementById("scores");
    scores.innerHTML=movieInfo[0].MovieGrade;
    let star=parseInt(movieInfo[0].MovieGrade/2);
    for(let i=0;i<star;i++){
        let span=document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-star");
        score.appendChild(span);
    }
    if(movieInfo[0].MovieGrade-star*2>=1){
        let span=document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-star-empty");
        score.appendChild(span);
    }
}

function displayTypeInfo(movies) {
    let len=movies.length;
    let tr=document.getElementById('similar-movies-info');
    tr.innerHTML='';
    for(let i=1;i<len;i++){
        let td = document.createElement("td"),
            img = document.createElement("img"),
            a = document.createElement('a'),
            div = document.createElement("div");
        img.setAttribute("src", movies[i].ImgUrl);
        a.setAttribute("href", "movie_detail.html?MovieId="+movies[i].MovieId);
        img.style.cursor = "pointer";
        div.setAttribute("class", "name");
        div.innerHTML = movies[i].MovieName;
        a.appendChild(img);
        td.appendChild(a);
        td.appendChild(div);
        tr.appendChild(td);
    }
}

