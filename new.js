const API_key= "4161eff6dc674085bfa0ad6fd7a81d46";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=> fetchnews("pakistan"));
function reload(){
    window.location.reload();
}
async function fetchnews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_key}`)
    const data= await res.json();
    console.log(data);
    binddata(data.articles);
}

function binddata(articles){
    const card_container=document.getElementById("card_container");
    const template_card=document.getElementById("template_card");
    card_container.innerHTML="";
    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const card_clone=template_card.content.cloneNode(true);
        filldataincard(card_clone,article);
        card_container.appendChild(card_clone);
    })
}
 function filldataincard(card_clone,article){
    const news_img= card_clone.querySelector("#news_img");
    const news_title= card_clone.querySelector("#news_title");
    const news_date= card_clone.querySelector("#news_date");
    const news_descrip= card_clone.querySelector("#news_desc");
    news_img.src=article.urlToImage;
    news_title.innerHTML=article.title;
    news_descrip.innerHTML=article.description;
    const date=new  Date(article.publishedAt).toLocaleString("en-US",
    {timeZone:"Asia/Jakarta"});


    news_date.innerHTML=`${article.source.name} . ${date}`;

    card_clone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url), "_blank";
    })
 }
 let curs_nav=null;
 function navclick(id)
 {
    fetchnews(id);
    const navitem =document.getElementById(id);
    curs_nav?.classList.remove("active");
    curs_nav=navitem;
    curs_nav.classList.add("active");
 }
 const search_text=document.getElementById("search_text");
 const search_bt=document.getElementById("search_bt");
 search_bt.addEventListener("click", ()=>{
    const query=search_text.value;
    if(!query) return;
    fetchnews(query);
    curs_nav?.classList.remove("active");
    curs_nav=null;
 })

