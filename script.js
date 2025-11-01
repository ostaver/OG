$(function () {
    $(window).on('scroll', function () {
        fromTop = $(window).scrollTop();
        // Calculate a subtle zoom effect - starts at 100% and slowly increases
        zoomLevel = 100 + (fromTop / 20); // Gentle zoom out

        $('.feature').css({
            '-webkit-background-size': zoomLevel + '%',
            '-moz-background-size': zoomLevel + '%',
            '-o-background-size': zoomLevel + '%',
            'background-size': zoomLevel + '%',
            '-webkit-filter': 'blur(' + (fromTop / 100) + 'px)',
            'filter': 'blur(' + (fromTop / 100) + 'px)',
            'opacity': 1 - ((fromTop / $('html').height()) * 1.3)
        });
    });
});

$(function () {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if (isChrome || isSafari) {
    } else {
        $('.feature').append('<div class="opaque"></div>');
        $(window).on('scroll', function () {
            var opacity = 0 + ($(window).scrollTop() / 5000);
            $('.opaque').css('opacity', opacity);
        });
    }
})

$(function() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var href = this.getAttribute('href');
        
        // Special case for OG_top class - scroll to top
        if ($(this).hasClass('OG_top') || href === '#header') {
            $('html, body').stop().animate({
                scrollTop: 0
            }, 800, 'easeInOutCubic');
            return;
        }
        
        var target = $(href);
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutCubic');
        }
    });
});

// Add easing function for smoother animation
$.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
};