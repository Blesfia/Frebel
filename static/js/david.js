var lastLink = '';
/*----------  PRELOADER  ----------*/

setTimeout(function(){
    $('#preloader').animate({'opacity' : '0'},300,function(){
        $('#preloader').hide();
        $('#haeder').css('top', $('#home .flexslider').height());
    });
    $('.left-menu, .right-content').animate({'opacity' : '1'},500);
},800);
/*---------- ALEATORIZAR PORTAFOLIO -----------*/
imagenes = []
$('#portafolio .scroller ul li').each(function(){
	imagenes.push(this);
});
$('#portafolio .scroller ul').html("");
shuffleArray(imagenes);
for(i in imagenes){
    $('#portafolio .scroller ul').append(imagenes[i]);
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
/*---------- OTRAS -----------*/
$('.images-bg').each(function(){
	$(this).css({
		'background-image': 'url(' +$('img', this).hide().attr('src') +')',
		'height': $(window).height()
	});
});
/*----------  BIG SLIDER  ----------*/
$('.portfolio-with-details .flexslider, .service .flexslider').flexslider({slideshowSpeed: 5000});
$('.portfolio-image.flexslider').flexslider({slideshow: false});
$('.flexslider.home-page').flexslider({
    slideshowSpeed: 5000,
    after : function(slider){
        var next = $('.flex-active-slide', slider).find('.home-title');
        var className = '';
        if(next.hasClass('left')){
            className = 'bounceInLeft';
        }else if(next.hasClass('top')){
            className = 'flipInX';
        }else if(next.hasClass('zoom')){
            className = 'bounceIn';
        }
        next.addClass(className + ' animated');
        next.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            next.removeClass(className + ' animated');
        });
    }
});
/*----------  CLICK ON HOME PAGE BUTTON  ----------*/
$('.linkPortafolio').on('click', function(e){
    if(!$('.home-page').hasClass('animate') || $(e.target).hasClass('button-down')){
        $('.home-page').addClass('animate');
        $('.main-navi a').removeClass('active');
        $('#linkPortafolio').addClass('active');

        setTimeout(function(){
            $('.portfolio').removeClass('animate');
        });
        if($(".player").length){
            $('.mb_YTVPPlaypause').trigger('click');
        }
        return false            
    }
});
$('#linkInicio').on('click', function(){
	$('.home-page').removeClass('animate');
    lastLink = $('.main-navi a.active, .main-navi > div.active');
	$('.main-navi a, .main-navi > div').removeClass('active');
	$(this).addClass('active');
    
    if($(".player").length){
        $('.mb_YTVPPlaypause').trigger('click');
    }
    return false;
});
/*----------  SHOW HIDE MAIN MENU  ----------*/
$('.main-navi').on('click', '#showHideMenu', function(){
    if($('.left-menu').hasClass('animate')){
        $('.left-menu').removeClass('animate');
        if($(window).width() <= 480){
            $('.left-menu').css('left', -180);
        }else if($(window).width() <= 640){
            $('.left-menu').css('left', -200);
        }else{                
            $('.left-menu').css('left', -280);
        }
        
        $('.main-navi').css('margin-right', 15);
    }else{
        $('.left-menu').addClass('animate');
        $('.left-menu').css('left', 0);
        $('.main-navi').css('margin-right', 0);
    }

    return false
});
setTimeout(function(){
	/*----------  PORTFOLIO ----------*/
	$('#portafolio .scroller').gridrotator( {
	    columns : 4,
	    rows : 999,
	    animType : 'fadeInOut',
	    animSpeed : 1000,
	    interval : 2000,
	    step : 1,
	    w1024 : { rows : 999, columns : 3 },
	    w768 : {rows : 999,columns : 3 },
	    w480 : {rows : 999,columns : 2 },
	    w320 : {rows : 999,columns : 1 },
	});
	baron({
        root: '.portfolio',
        scroller: '.scroller',
        bar: '.scroller__bar',
        barOnCls: 'baron'
    });
}, 500);
/*----------  FILTER  ----------*/
$('.filter a').on('click', function(){
	$('.filter a').removeClass('active');
	$(this).addClass('active');
	$('.portfolio li').addClass('unactive');

	if($(this).text().toLowerCase() == 'todos'){
		$('.portfolio li').removeClass('unactive');
	}else{
		$('.portfolio li[data-class="' + $(this).text().toLowerCase() + '"]').removeClass('unactive');
	}
	return false
});
/*----------  HOVER ANIMATE ON PORTFOLIO PAGE  ----------*/
$('.portfolio').on('mouseenter', 'li', function(){
    if(!$(this).hasClass('unactive')){
        $(this).parent().addClass('animate');
    }
}).on('mouseleave', 'li', function(){
    $(this).parent().removeClass('animate');
});
