<?php

	$lt=15;
	$pl=$_POST['player'];
	$np=$_POST['numpile'];
	$ip=$_POST['ip'];
	$usr=$_POST['usr'];
	$pss=$_POST['pass'];

	$file=fopen("setting.txt","w");
	if($np==0)
		$np=rand(3,16);
	$np=min($np,16);
	$np=max($np,3);
	fwrite($file,$pl[strlen($pl)-1]."\n".$np);

	$address=$usr."@".$ip.":/var/www/html/NIM-Z";
	$file=fopen("esendconfig.sh","w");
	fwrite($file,"scp config.txt ".$address);
	$file=fopen("esendmove.sh","w");
	fwrite($file,"scp move.txt ".$address);

	$st='#!/usr/bin/expect'."\n".
	'spawn "./esendconfig.sh"'."\n".
	'expect "(yes/no)?"'."\n".
	'send "yes\n"'."\n";

	$pass='expect "password:"'."\n".
			'send "'.$pss.'\n"'."\n";
	$pass=$st.$pass.$pass.'interact';
	//echo $pass;
	$file=fopen("sendconfig.sh","w");
	fwrite($file,$pass);

	$st='#!/usr/bin/expect'."\n".
	'spawn "./esendmove.sh"'."\n"/*.
	'expect "(yes/no)?"'."\n".
	'send "yes\n"'."\n";*/;

	$pass='expect "password:"'."\n".
			'send "'.$pss.'\n"'."\n";
	$pass=$st.$pass.$pass.'interact';
	$file=fopen("sendmove.sh","w");
	fwrite($file,$pass);

	$file=fopen("move.txt","w");
	fwrite($file,$pl[strlen($pl)-1]);

	$ran=uniqid();
	echo '<script src="gen.js?rand='.$ran.'"></script>
	<script src="engine.js"></script>
	<script src="jquery.js"></script>
	<script type="text/javascript"> gen();</script>';
?>