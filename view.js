function play(url){
  if (Hls.isSupported()) {
    var video = document.getElementById('my_video');
	var hls = new Hls();
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
       hls.loadSource(url);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        video.play()
      });
    });
  }else{
    var video = document.getElementById('my_video');
	video.pause()
	video.setAttribute("src",url)
	video.setAttribute("x5-video-player-fullscreen","true")
	video.setAttribute("x5-video-player-type","h5")
	video.setAttribute("x5-playsinline","true")
	video.setAttribute("webkit-playsinline","true")
	video.setAttribute("playsinline","true")
	video.setAttribute("x-webkit-airplay","true")
	video.controls = true
	video.load()
    video.play()
	
  }
}
function showfirst(){
 $('#nav-tab button').first().click()
 $('.video-btn').first().click()
}
$(document).ready(function(){
   $(".video-btn").click(function(){
        $(".btn-dark").removeClass("btn-dark")
     $(this).addClass("btn-dark")
     $(".video-title > span").html($(this).html())
     vinfo={url:$(this).attr('video-url'),name:$(this).parent().attr("id")}
       //console.log(vinfo.name)
     play(vinfo.url)
     let title= $('title').text().split("_")[0]
     if(window.localStorage){
		localStorage.setItem(title,JSON.stringify(vinfo))
       let list_db = localStorage.getItem('list');
       if (list_db  ){
         if (list_db.indexOf(title)<0){
           let list =  list_db.split(',')
           list.push(title)
           if (list.length>30)
             localStorage.removeItem(list.shift())

           list_db= list.join(',')
            localStorage.setItem('list',title)
         }
       }else{
         localStorage.setItem('list',title)

       }
     }
	 $.get("https://zaddone.tk/set_hot" , {name:title,img:$("video").attr("poster")})

  })
  if(window.localStorage){
    let vinfo = localStorage.getItem($('.video-title').text());
    if (!vinfo){
      showfirst()
      return
    };
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
    }else{
      showfirst()
    }
});
