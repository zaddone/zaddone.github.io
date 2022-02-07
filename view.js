function play(url) {
	if (Hls.isSupported()) {
		var video = document.getElementById('my_video');
		var hls = new Hls();
		hls.attachMedia(video);
		hls.on(Hls.Events.MEDIA_ATTACHED, function() {
			hls.loadSource(url);
			hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
				video.play()
			});
		});
	} else {
		var video = document.getElementById('my_video');
		video.pause()
		video.setAttribute("src", url)
		video.setAttribute("x5-video-player-fullscreen", "true")
		video.setAttribute("x5-video-player-type", "h5")
		video.setAttribute("x5-playsinline", "true")
		video.setAttribute("webkit-playsinline", "true")
		video.setAttribute("playsinline", "true")
		video.setAttribute("x-webkit-airplay", "true")
		video.controls = true
		video.load()
		video.play()

	}
}

function showfirst() {
	$('#nav-tab button').first().click()
	$('.video-btn').first().click()
}
function addHistoryList(title){
	let list_db = localStorage.getItem('list');
	if (!list_db){
    	localStorage.setItem('list',title);
    }else{
        var li = list_db.split(",")
        li.push(title)
		li = Array.from(new Set(li))
		if (li.length>30){
			localStorage.removeItem(li.shift())
		}
    	localStorage.setItem('list',li.join(","))
    }
}
$(document).ready(function() {
	$(".video-btn").click(function() {
		$(".btn-dark").removeClass("btn-dark")
		$(this).addClass("btn-dark")
		$(".video-title > span").html($(this).html())
		var img = $("video").attr("poster")
		vinfo = {
			url: $(this).attr('video-url'),
			tag: $(this).parent().attr("id"),
			Img:img,
			Dir:window.location.pathname,
		}
		//console.log(vinfo.name)
		play(vinfo.url)
		let title = $('title').text().split("_")[0]
		$.get("https://zaddone.tk/set_hot", {
			name: title,
			img: img,
		})
		if (!window.localStorage)return
		localStorage.setItem(title, JSON.stringify(vinfo))
		addHistoryList(title)
	})
	if (window.localStorage) {
		let title = $('title').text().split("_")[0]
		let vinfo = localStorage.getItem(title);
		if (!vinfo) {
			showfirst()
			return
		};
		console.log(vinfo)
		let h = JSON.parse(vinfo)
		$(".nav-link").removeClass("active")
		$("#" + h.tag + "-tab").addClass("active")
		$(".tab-pane").removeClass("active show")
		$("#" + h.tag).addClass("active show")
		$(".video-btn").each(function() {
			if ($(this).attr("video-url") == h.url) {
				$(this).click()
			}
		})
	} else {
		showfirst()
	}
});
(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://iclickcdn.com/tag.min.js',4851771,document.body||document.documentElement)
