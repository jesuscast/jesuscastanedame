run the server by using
sudo bash run_server.sh

# to start the pre compilers.
bash realtime_bundling.sh

# to kill the kill the precompilers.
sh kill_realtime.sh

# Follow the output of the precompilers by using
tail -f babel_logging.log
and
tail -f watchify_logging.log 