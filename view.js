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
  }else{
	$("source").attr("src",url)
  }
}
function showfirst(){
 $('#nav-tab button').first().click()
}
$(document).ready(function(){
$('#search').attr('action','#')
  $('#search').submit(function(){
    let k = $('#search input').val()
    if (!k)return
    $.get("https://zaddone.tk/search/?q=" + encodeURIComponent(k), function(res) {
      if (res)window.location.href=res;
    })
  })
   $(".video-btn").click(function(){
        $(".btn-dark").removeClass("btn-dark")
     $(this).addClass("btn-dark")
     $(".video-title > span").html($(this).html())
     vinfo={url:$(this).attr('video-url'),name:$(this).parent().attr("id")}
       //console.log(vinfo.name)
     play(vinfo.url)
     if(window.localStorage){
       let title= $('.video-title').text()
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
