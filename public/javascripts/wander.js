$(function(){
  //initialize sockets
  var socket = io.connect(location);

  // Create div in random location for new user
  socket.on('new', function(data){
    var user = 'user' + data.user;
    
    box = $('<div>')
    	.attr('class', user)
    	.css({
    		backgroundColor: data.color,
    		border:'1px solid black',
    		position: 'absolute',
    		top: data.top,
    		left: data.left,
    		textAlign:'center',
    		padding:'1em',
    	})
    	.text("YOU")
    	.appendTo($('body'));
    
    return box;
  });
  
  jwerty.key('w', function(){
	  box.css('top', (box.position().top-1) + 'px');
	  socket.emit('up', {user: box.attr('class'), position: box.position().top })
  });
  
  socket.on('up', function(data){
	  console.log(data);
  })
});