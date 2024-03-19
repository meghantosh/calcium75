/* jQuery tubular plugin
|* by Sean McCambridge
|* http://www.seanmccambridge.com/tubular
|* version: 1.0
|* updated: October 1, 2012
|* since 2010
|* licensed under the MIT License
|* Enjoy.
|* 
|* Thanks,
|* Sean */

;
( function( $, window ) {

    // test for feature support and return if failure

    // defaults
    var defaults = {
        ratio: 16 / 9, // usually either 4/3 or 16/9 -- tweak as needed
        videoId: 'ZCAnLxRvNNc', // toy robot in space is a good default, no?
        mute: true,
        repeat: true,
        width: $( window ).width(),
        wrapperZIndex: 99,
        playButtonClass: 'tubular-play',
        pauseButtonClass: 'tubular-pause',
        muteButtonClass: 'tubular-mute',
        volumeUpClass: 'tubular-volume-up',
        volumeDownClass: 'tubular-volume-down',
        increaseVolumeBy: 10,
        start: 0
    };

    // methods

    var tubular = function( node, options ) { // should be called on the wrapper div
        var options = $.extend( {}, defaults, options ),
            $body = $( 'body' ) // cache body node
        $node = $( node ); // cache wrapper node

        // build container
        var tubularContainer = '<div id="tubular-container" style="overflow: hidden; position: absolute; z-index: -2; width: 100%; height: 70%"><div id="tubular-player" style="position: absolute"></div></div><div id="tubular-shield" style="width: 100%; height: 100%; z-index: -1; position: absolute; left: 0; top: 0;"></div>';

        // set up css prereq's, inject tubular container and set up wrapper defaults
        $( 'html,body' ).css( {
            'width': '100%',
            'height': '100%'
        } );
        $body.prepend( tubularContainer );
        $node.css( {
            position: 'relative',
            'z-index': options.wrapperZIndex
        } );

        // set up iframe player, use global scope so YT api can talk
        window.player;
        window.onYouTubeIframeAPIReady = function() {
            player = new YT.Player( 'tubular-player', {
                width: options.width,
                height: Math.ceil( options.width / options.ratio ),
                videoId: options.videoId,
                playerVars: {
                    controls: 0,
                    showinfo: 0,
                    modestbranding: true,
                    rel: 0,
                    sowinfo: 0,
                    autoplay: 1,
                    theme: "light",
                    color: "white",
                    autohide: 2,
                    iv_load_policy: 3,
                    wmode: 'transparent'
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            } );
            resize();
        }

        window.onPlayerReady = function( e ) {
            if ( options.mute ) e.target.mute();
            e.target.seekTo( options.start );
            e.target.playVideo();
            resize();
            $( "#tubular-player" ).animate({ opacity: 1 }, 900);
        }

        window.onPlayerStateChange = function( state ) {
            if ( state.data === 0 && options.repeat ) { // video ended and repeat option is set true
                player.seekTo( options.start ); // restart
            }
        }

        // resize handler updates width, height and offset of player after resize/init
        var resize = function() {
            var $tubularContainer = $( '#tubular-container' ),
                $tubularPlayer = $( '#tubular-player' ),
                width = $( window ).width(),
                height = $( window ).height(),
                cWidth = $tubularContainer.width(),
                cHeight = $tubularContainer.height(),
                pWidth = $tubularPlayer.width(), // player width, to be defined
                pHeight = $tubularPlayer.height(); // player height, tbd

            // when screen aspect ratio differs from video, video must center and underlay one dimension

            if ( width / options.ratio < height ) { // if new video height < window height (gap underneath)
                pWidth = Math.ceil( height * options.ratio ); // get new player width
                $tubularPlayer.width( pWidth ).height( height ).css( {
                    left: ( width - pWidth ) / 2,
                    top: ( cHeight - pHeight ) / 2
                } ); // player width is greater, offset left; reset top
                // console.log(pHeight);
            } else { // new video width < window width (gap to right)
                pHeight = Math.ceil( width / options.ratio ); // get new player height
                $tubularPlayer.width( width ).height( pHeight ).css( {
                    left: 0,
                    top: ( cHeight - pHeight ) / 2
                } ); // player height is greater, offset top; reset left
            }

        }

        // events
        $( window ).on( 'resize.tubular', function() {
            resize();
        } )

        $( 'body' ).on( 'click', '.' + options.playButtonClass, function( e ) { // play button
            e.preventDefault();
            player.playVideo();
        } ).on( 'click', '.' + options.pauseButtonClass, function( e ) { // pause button
            e.preventDefault();
            player.pauseVideo();
        } ).on( 'click', '.' + options.muteButtonClass, function( e ) { // mute button
            e.preventDefault();
            ( player.isMuted() ) ? player.unMute(): player.mute();
        } ).on( 'click', '.' + options.volumeDownClass, function( e ) { // volume down button
            e.preventDefault();
            var currentVolume = player.getVolume();
            if ( currentVolume < options.increaseVolumeBy ) currentVolume = options.increaseVolumeBy;
            player.setVolume( currentVolume - options.increaseVolumeBy );
        } ).on( 'click', '.' + options.volumeUpClass, function( e ) { // volume up button
            e.preventDefault();
            if ( player.isMuted() ) player.unMute(); // if mute is on, unmute
            var currentVolume = player.getVolume();
            if ( currentVolume > 100 - options.increaseVolumeBy ) currentVolume = 100 - options.increaseVolumeBy;
            player.setVolume( currentVolume + options.increaseVolumeBy );
        } )
    }

    // load yt iframe js api

    var tag = document.createElement( 'script' );
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
    firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

    // create plugin

    $.fn.tubular = function( options ) {
        return this.each( function() {
            if ( !$.data( this, 'tubular_instantiated' ) ) { // let's only run one
                $.data( this, 'tubular_instantiated',
                    tubular( this, options ) );
            }
        } );
    }

} )( jQuery, window );