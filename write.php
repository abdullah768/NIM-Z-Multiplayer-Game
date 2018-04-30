<?php
	
	$fn=$_POST['fname'];
	$fname=$fn.".txt";
	$sfname="./send".$fn.".sh";
	$file=fopen($fname,"w");
	$move=$_POST['mov'];
	fwrite($file,$move);
	//echo "dsad";
	//$sfname="./sendconfig.sh";
	$sh=shell_exec($sfname);
	echo $sh;
?>
