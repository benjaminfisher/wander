$(function(){
  //initialize sockets
  var socket = io.connect(location);

  // Create div in random location for new user
  socket.on('new', function(data){
    console.log(data);

    $('<div>')
    	.attr('class', 'user')
    	.css({
    		backgroundColor: data.color,
    		border:'1px solid white',
    		height:'50px',
    		width:'50px',
    		position: 'absolute',
    		marginTop: data.top,
    		marginLeft: data.left,
    	})
    	.text("YOU")
    	.appendTo($("#wasteland"));
  });
});