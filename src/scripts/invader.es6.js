import _ from 'underscore';
import THREE from 'three';
import Util from './util';

const SIZE = 5;
const CUBE_SIZE = 10;
const COLOR_POOL = [0x333333, 0x66CCFF, 0xCC0000, 0x66CC00, 0xFF6600];

function createMaterial() {
    return new THREE.MeshPhongMaterial({
        color: COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)],
        shininess: 100.0,
        specular: 0xFFFFFF
    });
}

function createCube(size, material) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        material
    );
}

function generateCubeConfiguration(seed) {
    var configuration = [];
    var seedStr = Util.dec2BinString(seed, SIZE * Math.ceil(SIZE * 0.5));
    var seedPos = 0;

    console.log('Generating new invader configuration with seed: ' + seedStr);

    for (let i = 0; i < SIZE; i++) {
        if (_.isUndefined(configuration[i])) {
            configuration[i] = [];
        }

        for (let j = 0; j < SIZE; j++) {
            if (j < Math.ceil(SIZE * 0.5)) {
                configuration[i][j] = seedStr[seedPos++];
            }
            else {
                configuration[i][j] = configuration[i][SIZE - j - 1];
            }
        }
    }

    return configuration;
}

function buildCubes(configuration, size, material) {
    var cubes = [];
    var offset = configuration.length * size * 0.5;

    for (var i = 0; i < configuration.length; i++) {
        let row = configuration[i];
        for (var j = 0; j < row.length; j++) {
            let val = configuration[i][j];
            if (val === '1') {
                let cube = createCube(size, material);
                cube.position.x = j * size - offset;
                cube.position.y = i * size - offset;
                cubes.push(cube);
            }
        }
    }

    return cubes
}

function printConfiguration(configuration) {
    console.log('--- Invader Configuration ---');
    for (let i = 0; i < SIZE; i++) {
        console.log(configuration[i].join());
    }
    console.log('--- Invader Configuration ---');
}

export default class Invader extends THREE.Object3D {
    constructor(options) {
        options = _.defaults(options || {
            seed: Math.random() * 32768
        });

        super(options);

        var configuration = this._configuration = generateCubeConfiguration(options.seed);
        var material = this._material = createMaterial();
        var cubes = this._cubes = buildCubes(configuration, CUBE_SIZE, material);

        this.add(cubes);

        printConfiguration(this._configuration);
    }

    add(object) {
        if (_.isArray(object)) {
            for (var i = 0, len = object.length; i < len; i++) {
                super.add(object[i]);
            }
        }
        else {
            super.add(object);
        }
    }
}