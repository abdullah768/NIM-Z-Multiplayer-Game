#!/usr/bin/expect
spawn "./esendmove.sh"
expect "password:"
send "l@b@123\n"
expect "password:"
send "l@b@123\n"
interact