ps aux | grep "[b]abel" | awk '{ print $2 }' | xargs kill

ps aux | grep "[w]atchify" | awk '{ print $2 }' | xargs kill