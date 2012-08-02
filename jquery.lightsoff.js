/*!
 * jQuery Lights Off Plugin
 * author: @tsevdos | http://phrappe.com
 * version: 0.8 (14/03/2011)
 * Further changes, comments: @tsevdos
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'lightsOff',
        defaults = {
            bgcolor: '#000',
            bgopacity: 0.7,
            duration: 300
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        
        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and 
            // call them like so: this.yourOtherFunction(this.element, this.options).
            
            this.addElements(this.element, this.options);
            
            var $element = $(this.element),
                $overlay = $('.lightsoff-ovelay'),
                $lightsOnOffbtn = $(this.element).find('.lightsoffbtn a'),
                options = this.options;
            
            $lightsOnOffbtn.on('click' , function(e) {
                e.preventDefault();


                if ( $overlay.hasClass('off') ) {

                    $element.css({
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
                    $element.css({ 'z-index': 0 });
                    $overlay.removeClass('on').addClass('off').fadeTo( options.duration , 0 ).hide();
    
                }

            });

        }, 
        
        addElements: function(el, options) {
            
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
            if ( $(el).find('.lightsoffbtn a').length === 0 ) {
                $('<div class="lightsoffbtn"><a href="#">Lights Off</a></div>').appendTo($(el));    
            }

        },
        
        // triggerCallback: function(el, options) {
//   
        // }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );