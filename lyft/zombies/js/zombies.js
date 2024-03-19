$(function () {
        var videos = $(".YTvideo");

        $('#YTslider').on('afterChange', function () {
            videos.children('iframe').remove();
            videos.removeClass('player');
        });


        videos.on("click", function () {
            var that = $(this);

            setTimeout(function () {
                var YTid = that.data('yt_id');
                that.addClass("player").append('<iframe width="960" height="540" src="https://www.youtube.com/embed/skZMLDSOaQs" frameborder="0" allowfullscreen></iframe>');
            }, 400);
        });

    });