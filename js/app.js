var cMouseDown = false, currentPT = 0, widthApp = 0, index = 0;
var app = {}, sound;
var config = {
	repeat: false,
	random: false,
	volume: 100
}
var playlist = 
	[{
		name : 'Reality',
		singer: 'Lost Frequencies, Janieck Devy',
		source: 'music/Reality.mp3',
		image: 'img/lost.jpg',
		howl: null

	},{
		name : 'Đã lỡ yêu em nhiều',
		singer: 'JustaTee',
		source: 'music/Da-Lo-Yeu-Em-Nhieu-JustaTee.mp3',
		image: 'img/tee.jpg',
		howl: null
	},{
		name : 'She Neva Knows',
		singer: 'JustaTee',
		source: 'music/She-Neva-Knows-JustaTee.mp3',
		image: 'img/tee.jpg',
		howl: null
	},{
		name : 'How Long',
		singer: 'Charlie Puth',
		source: 'music/HowLong-CharliePuth-5201892_hq.mp3',
		image: 'img/Charlie_Puth_2.jpg',
		howl: null
	},{
		name : 'Mặt trời của em',
		singer: 'Phương Ly',
		source: 'music/Mat-Troi-Cua-Em-Phuong-Ly-JustaTee.mp3',
		image: 'img/20150518-060824-q_520x405.jpg',
		howl: null
	}]

$(document).ready(function () {
	widthApp = $('.music-player').width();
	$('.progress-duration').click(function (e) {
		var phantram = e.offsetX /widthApp * 100;
			sound.seek(phantram * sound.duration() / 100);
			$('.play-progress-current')[0].style.width = phantram + '%';
	});
	$('.wrapper-info-song').mousedown(function (e) {
		cMouseDown = true;
		currentPT =  (e.offsetX / widthApp * 100);
	})
	$('body').mouseup(function (e) {
		cMouseDown = false;
		$('.wrapper-info-song')[0].style.left = '0%';
	})
	$('.wrapper-info-song').mousemove(function (e) {
		if (cMouseDown) {
			var phantram = (e.offsetX / widthApp * 100);
			phantram = phantram - currentPT;
			$('.wrapper-info-song')[0].style.left = Math.floor(phantram) +  '%';
		}
	});
	$('.btn-play-pause').click(function () {
		if (sound.playing()) {
			sound.pause();
			$('.btn-play-pause')[0].className = 'btn-play-pause fa fa-play';
		} else {
			sound.play();
			$('.btn-play-pause')[0].className = 'btn-play-pause fa fa-pause';
		}
	})
	app.init();
})

app.formatTime = function(secs) {
	var minutes = Math.floor(secs / 60) || 0;
	var seconds = (secs - minutes * 60) || 0;
	minutes = (minutes < 10) ? '0' + minutes : minutes;
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
app.step = function () {
	var seek = sound.seek() || 0;
	$('.play-progress-current')[0].style.width = (((seek / sound.duration()) * 100) || 0) + '%';
	$('.current-time').text(app.formatTime(Math.round(seek)));
	if (sound.playing()) {
		requestAnimationFrame(app.step);
	}
}
app.init = function () {
	playlist.forEach(function (e) {
		e.howl = new Howl({
			src: e.source,
			onplay: function () {
			$('.end-time').text(app.formatTime(Math.round(this.duration())));
			$('.btn-play-pause')[0].className = 'btn-play-pause fa fa-pause';
			$('.global-color').addClass('dark-color');
			$('.title-song').text(e.name);
			$('.singer').text(e.singer);
			$('.background-player').css({
				'backgroundImage' : 'url(' + e.image + ')'
			})
			app.step();
			},
			onend: function () {
				$('.btn-play-pause')[0].className = 'btn-play-pause fa fa-play';
			}
		})
	});
	sound = playlist[index].howl;
	// sound.play();
}
app.skip = function (i) {
	if (sound) {
		sound.stop();
	}
	sound = playlist[i].howl;
	console.log(playlist[i].howl)
	sound.play();
}