
$(document).ready(function(){
    jQuery('.feedBack').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
});
});

$(document).ready(function() {
    $("a.scroll").click(function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 1500,
            easing: "swing"
        });
        return false;
    });
});

$(document).ready(function(){
    $('body').append('<a href="#" id="go-top" title="up"><i class="fas fa-chevron-up"></i></a>');
});

$(function() {
    $.fn.scrollToTop = function() {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() >= "350") $(this).fadeIn("slow")
        var scrollDiv = $(this);
        $(window).scroll(function() {
            if ($(window).scrollTop() <= "350") $(scrollDiv).fadeOut("slow")
            else $(scrollDiv).fadeIn("slow")
        });
        $(this).click(function() {
            $("html, body").animate({scrollTop: 0}, "slow")
        })
    }
});

$(function() {
    $("#go-top").scrollToTop();
});



$(window).on('mousemove', function(e) {
    var w = $(window).width();
    var h = $(window).height();
    var offsetX = 0.5 - e.pageX /w;
    var offsetY = 0.5 - e.pageY /h;
    $(".parallax").each(function(i,el){
        var offset = parseInt($(el).data('offset'));
        var translate = "translate3d(" + Math.round(offsetX*offset) + "px," + Math.round(offsetY * offset) + "px, 0px";
        $(el).css({
            'transform':translate
        })
    })
})
