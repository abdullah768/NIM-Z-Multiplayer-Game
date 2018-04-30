#!/usr/bin/expect
spawn "./esendconfig.sh"
expect "(yes/no)?"
send "yes\n"
expect "password:"
send "l@b@123\n"
expect "password:"
send "l@b@123\n"
interact