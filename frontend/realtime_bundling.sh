./node_modules/.bin/babel --presets react,es2015 --watch scripts-jsx --out-dir scripts >& babel_logging.log &

watchify -o scripts/bundle.js scripts/main_component.js >& watchify_logging.log &