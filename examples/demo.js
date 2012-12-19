//The following code is only used in the demo!
jQuery(function($) {
  $('#standard').bind('click', function() {
    $.notification({
      title: "This is the jQuery Notification plugin",
      content: "Pretty cool, huh?",
//      img: "static/demo/thumb.png",
//      icon
      border: false
    });
  });
  
  $('#text').bind('click', function() {
    $.notification({
      content: "This is a <strong>text notification</strong>."
    });
  });
  
  $('#time').bind('click', function() {
    $.notification({
      title: 'Notification with time',
      content: 'This notification have a time stamp.',
      showTime: true,
      icon: 'N'
    });
  });
  
  $('#timeout').bind('click', function() {
    $.notification({
      title: "Timeout notification",
      content: 'This notification will disappear in <strong>five seconds</strong>.',
      timeout: 5000,
      showTime: false,
      icon: 'N'
    });
  });
  
  $('#callback').bind('click', function() {
    $.notification({
      content: "Click on me to try the <strong>callback</strong> function",
      icon: "3",
      click: function() {
        $.notification({
          content: 'This notification was just created.',
          title: 'Callback!',
          icon: 'G'
        });
      }
    });
  });
  
  $('#error').bind('click', function() {
    $.notification({
      title: "Error notification",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
      type: 'error'
    });
  });

  $('#success').bind('click', function() {
    $.notification({
      title: "Success notification",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
      type: 'success'
    });
  });
  
  $('#fill').bind('click', function() {
    $.notification({
      title: "Hi, Jacques Halifax",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
      img: "static/demo/autumn.jpg",
      fill: true,
      showTime: true
    });
  });
  
  $('#vector').bind('click', function() {
    $.notification({
      title: "West Ham secures last-minute victory against Copenhagen",
      content: "West Ham's pre-season finally began in earnest last night, as the east London club triumphed over FC Copenhagen thanks to a solitary goal from Freddie Sears.",
      icon: "M"
    });
  });
  
  $('#custom').bind('click', function() { 
    var title = prompt("Please enter the title of the notification","Just another title");
    var text = prompt("Please enter the the text of the notification","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim massa, euismod id sollicitudin vitae, iaculis quis erat. Duis et ligula sapien, sed varius lectus. Sed quis urna orci. Phasellus sit amet condimentum magna. Praesent lorem enim, sodales nec scelerisque eu, ultricies ac neque.");
    var icon = prompt("Please specify a vecor icon (a-z, A-Z, 0-9)","");
    
    $.notification({
      content: text,
      title: title,
      icon: icon
    });
  });

});