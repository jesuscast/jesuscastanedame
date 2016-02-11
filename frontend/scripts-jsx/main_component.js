// const atv = require('./atvImg.js');
// // App wrapper.

// Just to make it look nice. In fact everything could be in the main container.
// But this is a better organization.


let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;

let RADIUS = 300;

let RADIUS_SCALE = 1;
let RADIUS_SCALE_MIN = 1;
let RADIUS_SCALE_MAX = 1.5;

let QUANTITY = 25;

let canvas;
let context;
let particles;

let mouseX = SCREEN_WIDTH * 0.5;
let mouseY = SCREEN_HEIGHT * 0.5;
let mouseIsDown = false;
let speedRatio = 0.04;

let createParticles = function() {
    particles = [];
    
    for (let i = 0; i < QUANTITY; i++) {
        let particle = {
            size: 1,
            position: { x: mouseX, y: mouseY },
            offset: { x: 0, y: 0 },
            shift: { x: mouseX, y: mouseY },
            speed: 0.01+Math.random()*speedRatio,
            targetSize: 1,
            fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
            orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
        };
        
        particles.push( particle );
    }
}

let windowResizeHandler = function() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
}

let loopAnimation = function(){
    
    
    RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );
    
    context.fillStyle = 'rgba(255,255,255,0.15)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    
    for (let i = 0, len = particles.length; i < len; i++) {
        let particle = particles[i];
        
        let lp = { x: particle.position.x, y: particle.position.y };
        
        // Rotation
        particle.offset.x += particle.speed;
        particle.offset.y += particle.speed;
        
        
        // Apply position
        particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit*RADIUS_SCALE);
        particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit*RADIUS_SCALE);
        
        // Limit to screen bounds
        particle.position.x = Math.max( Math.min( particle.position.x, SCREEN_WIDTH ), 0 );
        particle.position.y = Math.max( Math.min( particle.position.y, SCREEN_HEIGHT ), 0 );
        
        particle.size += ( particle.targetSize - particle.size ) * 0.05;
        
        if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
            particle.targetSize = 1 + Math.random() * 7;
        }
        
        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.strokeStyle = particle.fillColor;
        context.lineWidth = particle.size;
        context.moveTo(lp.x, lp.y);
        context.lineTo(particle.position.x, particle.position.y);
        context.stroke();
        context.arc(particle.position.x, particle.position.y, particle.size/2, 0, Math.PI*2, true);
        context.fill();
    }
}


let App = React.createClass({
    getInitialState: function(){
        return {
            screen: 'index'
        }
    },
    handleClick: function(requested_screen) {
        this.setState({
            screen: requested_screen
        });
    },
    componentDidMount: function(){
      // atvImg();
      let startAnimation = function() {

          canvas = document.getElementById( 'canvas-animation' );
          
          if (canvas && canvas.getContext) {
                context = canvas.getContext('2d');
                
                // Register event listeners
                window.addEventListener('resize', windowResizeHandler, false);
                
                createParticles();
                
                windowResizeHandler();
                
                setInterval( loopAnimation, 1000 / 60 );
            }
        }
        //$('#canvas-animation').css('margin-left', parseInt( (window.innerWidth - $('#canvas-animation').width())/2.0 ).toString() + 'px');
        let titleElement = $('.giantTitle').eq(0);
        titleElement.css('left',  parseInt( (window.innerWidth - titleElement.width() )/2.0 + 50 ).toString() + 'px');
        titleElement.css('top',  parseInt( (window.innerHeight - titleElement.height())/2.0 - 15).toString() + 'px');
        startAnimation();
    },
    render: function(){
        return (
            <div>
            <canvas id='canvas-animation'></canvas>
            <div className='giantTitle'>
              <h1><i>Jesus Castaneda</i></h1>
              <a className='githubLink' href='https://github.com/jesuscast'>Github</a><br />
              <img src='http://www.2001words.com/img/arrow_down.png' className='scrollBtn bounce' />
            </div>
            Helooo
            </div>
        );
    }
});

//
//
// Render
//
//
React.render(<App />, document.getElementById('master'));