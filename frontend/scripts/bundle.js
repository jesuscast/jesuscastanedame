(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// const atv = require('./atvImg.js');
// // App wrapper.

// Just to make it look nice. In fact everything could be in the main container.
// But this is a better organization.

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var RADIUS = 300;

var RADIUS_SCALE = 1;
var RADIUS_SCALE_MIN = 1;
var RADIUS_SCALE_MAX = 1.5;

var QUANTITY = 25;

var canvas = undefined;
var context = undefined;
var particles = undefined;

var mouseX = SCREEN_WIDTH * 0.5;
var mouseY = SCREEN_HEIGHT * 0.5;
var mouseIsDown = false;
var speedRatio = 0.04;

var createParticles = function createParticles() {
    particles = [];

    for (var i = 0; i < QUANTITY; i++) {
        var particle = {
            size: 1,
            position: { x: mouseX, y: mouseY },
            offset: { x: 0, y: 0 },
            shift: { x: mouseX, y: mouseY },
            speed: 0.01 + Math.random() * speedRatio,
            targetSize: 1,
            fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
            orbit: RADIUS * .5 + RADIUS * .5 * Math.random()
        };

        particles.push(particle);
    }
};

var windowResizeHandler = function windowResizeHandler() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
};

var loopAnimation = function loopAnimation() {

    RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

    context.fillStyle = 'rgba(255,255,255,0.15)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for (var i = 0, len = particles.length; i < len; i++) {
        var particle = particles[i];

        var lp = { x: particle.position.x, y: particle.position.y };

        // Rotation
        particle.offset.x += particle.speed;
        particle.offset.y += particle.speed;

        // Apply position
        particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
        particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);

        // Limit to screen bounds
        particle.position.x = Math.max(Math.min(particle.position.x, SCREEN_WIDTH), 0);
        particle.position.y = Math.max(Math.min(particle.position.y, SCREEN_HEIGHT), 0);

        particle.size += (particle.targetSize - particle.size) * 0.05;

        if (Math.round(particle.size) == Math.round(particle.targetSize)) {
            particle.targetSize = 1 + Math.random() * 7;
        }

        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.strokeStyle = particle.fillColor;
        context.lineWidth = particle.size;
        context.moveTo(lp.x, lp.y);
        context.lineTo(particle.position.x, particle.position.y);
        context.stroke();
        context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
        context.fill();
    }
};

var App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
        return {
            screen: 'index'
        };
    },
    handleClick: function handleClick(requested_screen) {
        this.setState({
            screen: requested_screen
        });
    },
    componentDidMount: function componentDidMount() {
        // atvImg();
        var startAnimation = function startAnimation() {

            canvas = document.getElementById('canvas-animation');

            if (canvas && canvas.getContext) {
                context = canvas.getContext('2d');

                // Register event listeners
                window.addEventListener('resize', windowResizeHandler, false);

                createParticles();

                windowResizeHandler();

                setInterval(loopAnimation, 1000 / 60);
            }
        };
        //$('#canvas-animation').css('margin-left', parseInt( (window.innerWidth - $('#canvas-animation').width())/2.0 ).toString() + 'px');
        var titleElement = $('.giantTitle').eq(0);
        titleElement.css('left', parseInt((window.innerWidth - titleElement.width()) / 2.0 + 50).toString() + 'px');
        titleElement.css('top', parseInt((window.innerHeight - titleElement.height()) / 2.0 - 15).toString() + 'px');
        startAnimation();
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement('canvas', { id: 'canvas-animation' }),
            React.createElement(
                'div',
                { className: 'giantTitle' },
                React.createElement(
                    'h1',
                    null,
                    'Jesus Castaneda'
                ),
                React.createElement(
                    'a',
                    { className: 'githubLink', href: 'https://github.com/jesuscast' },
                    'Github'
                ),
                React.createElement('br', null),
                React.createElement('img', { src: 'http://www.2001words.com/img/arrow_down.png', className: 'scrollBtn bounce' })
            )
        );
    }
});

//
//
// Render
//
//
React.render(React.createElement(App, null), document.getElementById('master'));
},{}]},{},[1]);
