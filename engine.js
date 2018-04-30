function readf(file)
{
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                arr=allText.split("\n");
            }
        }
    }
    rawFile.send(null);
    return arr;
}

function init()
{
			outdiv='<div id="tmp" class="out"> </div>';
			indiv='<div id="temp" class="in"> </div>';
			mip=readf("config.txt");
			pldet=$("#logo").text();
			pldet+=player;
			$("#logo").text(pldet);
			np=parseInt(mip[0]);
			ipp=mip[1].split(" ");
			//console.log(ipp);
			for(i=1;i<=np;i++)
			{
				oid="id";
				if(i<10)
					oid+="0";
				oid+=i;
				$("#game").append($(outdiv));
				$("#tmp").attr('id',oid);
				ht[i]=parseInt(ipp[i-1]);
				m=ht[i];
				//console.log(m);
				for(j=1;j<=m;j++)
				{
					iid=oid+'x'+j;
					//console.log(oid,iid);
					$('#'+oid).append($(indiv));
					//console.log($("#tmp"));
					$("#temp").attr('id',iid);
					$('#' +iid).addClass('dn');	
				}
				for(j=m+1;j<=lt;j++)
				{
					iid=oid+'x'+j;
					//console.log(oid,iid);
					$('#'+oid).append($(indiv));
					//console.log($("#tmp"));
					$("#temp").attr('id',iid);
				}
			}

			wd=75*np;
			htdv=30*(lt+3)+10;
			$("#game").css('width',wd+'px');
			$("#game").css('height',htdv+'px');
			$("#turn").css('width',wd+'px');
			$("#logo").css('width',wd+'px');
}

		function apply(pile,amount)
		{
			k=pile+amount;
			if($(k).css('background-color')==bg)
				return;
			for(i=amount;i>0;i--)		
			{
				k=pile+i;
				$(k).css('background-color','#EFEFEF');
				//console.log(k);
			}
			chng=document.getElementById("toMove");
			cur=parseInt(chng.textContent);
			//console.log(cur);
			oc=cur;
			cur=(((cur-1)+1)%2)+1;
			//console.log(cur);
			chng.textContent=cur;
			pl=parseInt(pile.substr(3,2));
			//console.log(pile,pl,amount);
			ht[pl]=amount;
			//console.log(ht);
			for(i=1;i<=np;i++)
			{
				//console.log(i,ht[i]);
				if(ht[i]!=lt)
					break;
			}
			if(i==np+1)
				return 1;
			else
				return 0;
		}

		function makemove(e) {

			tmp=$(e.target).attr('id');
			//console.log(n);
			col=$('#'+tmp).css("background-color");
			chng=document.getElementById("toMove");
			cur=parseInt(chng.textContent);

			if(cur!=player)
			{
				alert("Please wait for the other player to make a move");
				return;
			}
			//console.log(col);
			if(col==bg)
			{
				alert("Please make a valid move");
				return;
			}
			amount=parseInt(tmp.substr(5));
			n="\n"
			pile=$(e.target).parent().attr('id');
			pile="#"+pile+"x";

			text=player+n+pile+n+amount;
			res=apply(pile,amount);
			//console.log(text);
			$.ajax({
				type: 'POST',
			   	url: 'write.php',
			   	data: {fname: "move",mov: text},
			 	/*success: function(data) {
			   alert(data); // apple
			}*/
			});
			if(res==1)
			{
				alert("GAME OVER!\n PLAYER "+oc+" WINS");
				document.getElementById("turn").textContent="GAME OVER! PLAYER "+oc+" WINS";
				window.location="home.html";
			}
			//writef("play.txt",text);
		}

		function status()
		{	
			ip=readf("move.txt");
		    //console.log(ip);
            		if(ip[0]!=player)
			       	apply(ip[1],parseInt(ip[2]));
		}
