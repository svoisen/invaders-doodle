import _ from 'underscore';
import THREE from 'three';

import Invader from './invader';

export default class Doodle {
    constructor(options) {
        this._bind('_animate');

        this._container = options.container;
        this._createScene();
        //this._addLights();
        this._addInvader();
        this._animate();
    }

    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    _animate() {
        var timer = 0.001 * Date.now();
        this._updateCameraAnimation(timer);

        requestAnimationFrame(this._animate);
    }

    _createScene() {
        var scene = this._scene = new THREE.Scene();
        var renderer = this._renderer = new THREE.WebGLRenderer();
        var camera = this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        var container = this._container;

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(new THREE.Color(0xFFFFFF));
        scene.add(camera);

        this._container.appendChild(renderer.domElement);
    }

    _addLights() {
        var light1 = new THREE.PointLight(0xFFFFFF);
        light1.position.set(this._container.clientWidth * 0.5, this._container.clientHeight * 0.5, 400);

        this._scene.add(light1);
    }

    _addInvader() {
        var invader = new Invader({
            seed: Math.random() * 32768
        });
        invader.position.set(0, 0, 0);

        this._scene.add(invader);
    }

    _updateCameraAnimation(timer) {
        this._camera.position.z = 300;
        this._camera.lookAt(new THREE.Vector3(0, 0, 0));
        this._renderer.render(this._scene, this._camera);
    }
}