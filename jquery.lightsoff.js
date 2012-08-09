/*
 * jQuery Lights Off Plugin
 * author: @tsevdos | http://phrappe.com
 * version: 0.8 (14/03/2011)
 * Further changes, comments: @tsevdos
 * Licensed under the MIT license
*/
;(function( $, window, document, undefined ){

$.fn.lightsOff = function(options) {  

    var defaults = {
        bgcolor: '#000',
        bgopacity: 0.7,
        duration: 300
    };

    var options = $.extend(defaults, options);

    return this.each(function() {
        var $elem = $(this);

        // create necessary elements
        // If there is no overlay div, create it
        if ( $('body .lightsoff-ovelay').length === 0 ) {
            $('<div></div>')
            .addClass('lightsoff-ovelay off')
            .css({
            'position' : 'relative',
            'z-index' : 1,
            'display' : 'none'
            })
            .appendTo('body');
        }

        // If there is no lights on/off button, create it
        if ( $elem.find('.lightsoffbtn a').length === 0 ) {
            $('<div class="lightsoffbtn"><a href="#">Lights Off</a></div>').appendTo($elem);    
        }

        console.log(document.body);

        var $overlay      = $('.lightsoff-ovelay' , document.body),
            $lightsoffbtn = $elem.find('.lightsoffbtn a');


        $lightsoffbtn.on( 'click' , function(e){
            
            e.preventDefault();

            if ( $overlay.hasClass('off') ) {

                $elem.css({
                    'position': 'relative',
                    'z-index': 4000
                });

                $(this).text('Lights On');

                $overlay.css({
                    'position': 'fixed',
                    'display': 'block',
                    'text-indent': -99999,
                    'background-color' :  options.bgcolor,
                    'width': '100%',
                    'height': '100%',
                    'top': 0,
                    'left': 0,
                    'z-index': 3000,
                    'opacity': 0.7,
                    'cursor': 'pointer'
                })
                .removeClass('off')
                .addClass('on')
                .fadeTo( options.duration , options.bgopacity );

            } else if ( $overlay.hasClass('on') ) {

                $(this).text('Lights Off');
                $elem.css({ 'z-index': 0 });
                $overlay.removeClass('on').addClass('off').fadeTo( options.duration , 0 ).hide();

            }

        });


    });

};


})( jQuery, window , document );