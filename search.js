function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg); 
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
function dataToHtml_(db){
	var h='<div class="bin col-6 col-md-2"><a class="card link-secondary text-decoration-none" href="'+db.Dir+'"><img class="card-img-top" src="'+db.Img+'" alt="'+db.Name+'">'
	h+='<div class="card-body">'
	h+='<p>'+db.Name+'</p>'
	h+='</div></a></div>'
	return h
}
function getHistoryList(){

	if (!window.localStorage) return
	let list_db = localStorage.getItem('list');
	if (!list_db)return
	let hdb = ""
	list_db.split(",").forEach(function(v){
		let db = localStorage.getItem(v);
		if (!db)return
		let h = JSON.parse(db)
		h.Name = v
		hdb += dataToHtml_(h)
	})
	$(".item").prepend(hdb)

}

$(document).ready(function() {
	getHistoryList()
	let k = getUrlParam('q')
	if (k) {
		$(".search_word").val(k)
		$("title").text(k)

		$.get("https://zaddone.tk/search/?q=" + encodeURIComponent(k), function(res) {
			if (!res)return
			var h = ''
			var list = JSON.parse(res)
			list.forEach(function(v){
				h+=dataToHtml(v)			
			})
			h+='<hr class="col">'
			$(".item").prepend(h)
		})
	}
});
