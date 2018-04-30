function gen(){
	//np=Math.floor(Math.random()*13)+3;
	//console.log(n);
	st=readf("setting.txt");
	player=st[0];
	if(player=="1")
	{
		np=parseInt(st[1]);
		lt=15;
		var ht=[];
		text="";
		text+=np+"\n";
		for(i=1;i<=np;i++)
		{
			m=Math.floor(Math.random()*lt);
			m=lt-m;
			if(m==lt)
				m-=1;
			ht[i]=m;
			text+=m+" ";
		}
		//console.log(text);
		//writef("config.txt",text);
		$.ajax({
			type: 'POST',
	   		url: 'write.php',
	   		data: {fname: "config",mov: text},
	   		/*success: function(data) {
			   alert(data); // apple
			}*/
		});
	}
	window.location = "game.html";
}
