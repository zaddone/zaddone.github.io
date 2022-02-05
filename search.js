	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	}
	function dataToHtml(db){
		var h='<div class="bin col-6 col-md-2"><a class="card link-secondary text-decoration-none" href="/'+db.Dir+'/'+db.Name+'.html"><img class="card-img-top" src="'+db.Img+'" alt="'+db.Name+'">'
		h+='<div class="card-body">'
		h+='<p>'+db.Name+'</p>'
		h+='</div></a></div>'
			return h
	}

	$(document).ready(function() {
		let k = getUrlParam('q')
		if (k) {
			$(".search_word").val(k)
			$("title").text(k)
			$.get("https://zaddone.tk/search/?q=" + encodeURIComponent(k), function(res) {
				if (!res){
						return
				}
				var h = ''
				var list = JSON.parse(res)
				list.forEach(function(v){
					h+=dataToHtml(v)			
				})
				h+='<hr class="col">'
				$(".item").prepend(h)
			})
		}
	})
