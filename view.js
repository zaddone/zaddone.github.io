var video = document.getElementById('my_video');
var hls = new Hls();
function play(url){
  if (Hls.isSupported()) {
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {     
       hls.loadSource(url);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        video.play()
      });
    });
  }
}
$(document).ready(function(){
   $(".video-btn").click(function(){
        $(".btn-dark").removeClass("btn-dark")
     $(this).addClass("btn-dark")
     $(".video-title > span").html($(this).html())
     vinfo={url:$(this).attr('video-url'),name:$(this).parent().attr("id")}
       //console.log(vinfo.name) 
     play(vinfo.url)
     if(window.localStorage)localStorage.setItem("videoInfo",JSON.stringify(vinfo))
  })   
  if(window.localStorage){
    let vinfo = localStorage.getItem("videoInfo");
    if (!vinfo)return; 
     console.log(vinfo)  
    let h = JSON.parse(vinfo)   
   $(".nav-link").removeClass("active")
   $("#"+h.name+"-tab").addClass("active")
   $(".tab-pane").removeClass("active show")
   $("#"+h.name).addClass("active show")
   $(".video-btn").each(function(){
     if ($(this).attr("video-url")==h.url){
       $(this).click()
     }
   })
    }
});  
