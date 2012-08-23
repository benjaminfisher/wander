$(function(){
  //initialize sockets
  var socket = io.connect(location);

  socket.on('connect', function(){	  	  
	  socket.emit('newuser');
	});
  
  socket.on('ready', function(data){
	  console.log(data.color);
	  
	  box = $('<div>')
		.attr('class', data.id)
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
  });
  
  socket.on('new', function(data){	  
	  $('<div>')
	  	.attr('class', data.id)
	  	.css({
	  		backgroundColor: data.color,
	  		border:'3px solid #333',
	  		top: data.top,
	  		left: data.left,
	  		position: 'absolute',
	  		padding:'1em',
	  	}).appendTo('body');
  });
  
  jwerty.key('w', function(){
	  box.css('top', (box.position().top-1) + 'px');
	  socket.emit('up', { position: box.position().top })
  });
  
  jwerty.key('a', function(){
	  box.css('left', (box.position().left-1) + 'px');
	  socket.emit('left', { position: box.position().left })
  });
  
  jwerty.key('s', function(){
	  box.css('top', (box.position().top+1) + 'px');
	  socket.emit('down', { position: box.position().top })
  });
  
  jwerty.key('d', function(){
	  box.css('left', (box.position().left+1) + 'px');
	  socket.emit('right', { position: box.position().left })
  });
  
  socket.on('up', function(data){
	  $('.' + data.user).css('top', data.pos);
  });
  
  socket.on('left', function(data){
	  $('.' + data.user).css('left', data.pos);
  });
  
  socket.on('down', function(data){
	  $('.' + data.user).css('top', data.pos);
  });
  
  socket.on('right', function(data){
	  $('.' + data.user).css('left', data.pos);
  });
});