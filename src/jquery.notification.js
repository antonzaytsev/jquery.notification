;(function ($, window, undefined) {

  var Notification = function(settings){
    _this = this;
    var o, notification, container, left, right, htmlTitle, htmlContent, timeHTML,
        image, iconType, icon;

    o = jQuery.extend(true, {}, $.notification.options);

    settings = $.extend(o, settings);

    container = $("#notifications");
    if (!container.length) {
      container = $("<div>", {id: "notifications"}).appendTo($("body"));
    }
    this.container = container;

    _this.id = Number(new Date);

    notification = $("<div>",{
      'class': 'notification',
      id: 'notification-'+_this.id
    });

    notification.data('notification', this);

    this.block = notification;

    if (settings.error == true) {
      notification.addClass("error");
    }

    $("<a>", {
      click: function () {
        $(this).closest('.notification').data('notification').hide();
      },
      'class': 'close'
    }).appendTo(notification);

    left = $("<div class='left'>");
    right = $("<div class='right'>");

    htmlTitle = "";
    if(settings.title != undefined) {
      htmlTitle = '<div class="title">' + settings.title + '</div>';
      notification.addClass("with-title");
    }

    htmlContent = "";
    if(settings.content != undefined) {
      htmlContent = '<div class="text">' + settings.content + '</div>';
    }

    $("<div>", {
      html: htmlTitle + htmlContent,
      'class': 'inner'
    }).appendTo(right);

    if (settings.img != undefined) {
      image = $("<div>", {
        style: "background-image: url('"+settings.img+"')",
        'class': 'img'
      });

      image.appendTo(left);

      if (settings.border == false) {
        image.addClass("no-border")
      }

      if (settings.fill == true) {
        image.addClass("fill");
      }
    }
    else {
      if (settings.icon != undefined) {
        iconType = settings.icon;
      }
      else {
        if(settings.error!=true) {
          iconType = '"';
        }
        else {
          iconType = 'c';
        }
      }
      icon = $('<div class="icon">').html(iconType);

      if (settings.color != undefined) {
        icon.css("color", settings.color);
      }

      icon.appendTo(left);
    }

    left.appendTo(notification);
    right.appendTo(notification);

    if (settings.showTime != false) {
      timeHTML = $("<div>", {
        'class': 'time',
        html: '<span class="timeago"></span> ago',
        data: {
          posted: Number(new Date())
        }
      });
      timeHTML.appendTo(right.find('.inner'));

      _this.timePlaceholder = timeHTML;
      _this.update_timepast();

      setInterval(function(){
        _this.update_timepast();
      }, 5000);
    }

    notification.prependTo(container);

    if (settings.timeout) {
      setTimeout(function() {
        _this.hide();
      }, settings.timeout);
    }

    if (typeof settings.click != 'undefined') {
      notification.addClass("clickable");
      notification.bind("click", function (e) {
        var target = $(e.target);
        if(!target.is(".close")) {
          settings.click.call(this)
        }
      });
    }
  };

  Notification.prototype.show = function(){
    _this = this;

    if ($(".notification", this.container).length == 0) {
      this.block.addClass("flipInX");
    }
    this.block.addClass("animated fadeInLeftMiddle fast");

    setTimeout(function(){
      _this.block.removeClass("flipInX animated fadeInLeftMiddle fast");
    }, 500);
  };

  Notification.prototype.hide = function(){
    this.block.removeClass("flipInX animated fadeInLeftMiddle fast");
    this.block.fadeOut('normal', function(){
      $(this).remove();
    });
  };

  Notification.prototype.update_timepast = function(){
    _this = this;
    _this.timePlaceholder.find('.timeago').text(timeSince(_this.timePlaceholder.data('posted')));
  }

  $.notification = function(settings) {
    var notification = new Notification(settings);
    notification.show();
    return this;
  };

  $.notification.options = {
    title: undefined,
    content: undefined,
    timeout: 0,
    img: undefined,
    border: true,
    fill: false,
    showTime: false,
    click: undefined,
    icon: undefined,
    color: undefined,
    error: false
  };

  function timeSince(time){
    var time_formats, seconds;

    time_formats = [
      [2, "One second", "1 second from now"], // 60*2
      [60, "seconds", 1], // 60
      [120, "One minute", "1 minute from now"], // 60*2
      [3600, "minutes", 60], // 60*60, 60
      [7200, "One hour", "1 hour from now"], // 60*60*2
      [86400, "hours", 3600], // 60*60*24, 60*60
      [172800, "One day", "tomorrow"], // 60*60*24*2
      [604800, "days", 86400], // 60*60*24*7, 60*60*24
      [1209600, "One week", "next week"], // 60*60*24*7*4*2
      [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "One month", "next month"], // 60*60*24*7*4*2
      [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "One year", "next year"], // 60*60*24*7*4*12*2
      [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, "One century", "next century"], // 60*60*24*7*4*12*100*2
      [58060800000, "centuries", 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];

    seconds = Math.round((new Date - time) / 1000);

    // Remove this ?
    if (seconds < 0)
      seconds = 0

    for(var i in time_formats){
      format = time_formats[i];

      if (seconds < format[0]) {
        if (typeof format[2] == "string")
          return format[1];
        else
          return Math.floor(seconds / format[2]) + " " + format[1];
      }
    }

    return time;
  }

})(jQuery, window);