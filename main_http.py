import os.path, sys
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir))
from bottle import get, post, request, route, run, static_file
import datetime
import hashlib
import time
import sys
import os

SECRET = 'gPN0xF21ui0IIFH8Ec3uqy9bCOu7k76f'
dateStr = lambda(x): datetime.date.fromtimestamp(int(x)).strftime('%Y-%m')
cleanAscii = lambda x: ''.join(filter(lambda y: ord(y) < 128, x))
# sys.stdout = open('web_server.log', 'a')
# sys.stderr = sys.stdout
testing = False

def obtainSignature(timestamp):
	hash_signature = hashlib.md5()
	dateString = dateStr(timestamp)
	hash_signature.update(SECRET + dateString)
	signature  = hash_signature.hexdigest()
	return signature




run(host='0.0.0.0', port=80, debug=True)