(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@youwol/flux-core"), require("three"));
	else if(typeof define === 'function' && define.amd)
		define("pdbloader", ["@youwol/flux-core", ], factory);
	else if(typeof exports === 'object')
		exports["pdbloader"] = factory(require("@youwol/flux-core"), require("three"));
	else
		root["pdbloader"] = factory(root["@youwol/flux-core"], root["THREE"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__youwol_flux_core__, __WEBPACK_EXTERNAL_MODULE_three__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./auto_generated.ts":
/*!***************************!*\
  !*** ./auto_generated.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AUTO_GENERATED": () => (/* binding */ AUTO_GENERATED)
/* harmony export */ });
let AUTO_GENERATED = {
    name: "pdbloader",
    namespace: "",
    version: "0.0.0-next",
    description: ""
};


/***/ }),

/***/ "./lib/CSS2Sobject.ts":
/*!****************************!*\
  !*** ./lib/CSS2Sobject.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSS2DObject": () => (/* binding */ CSS2DObject),
/* harmony export */   "CSS2DRenderer": () => (/* binding */ CSS2DRenderer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

class CSS2DObject extends three__WEBPACK_IMPORTED_MODULE_0__.Object3D {
    constructor(element) {
        super();
        this.isCSS2DObject = true;
        this.element = element || document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.userSelect = 'none';
        this.element.setAttribute('draggable', false);
        super.addEventListener('removed', function () {
            this.traverse(function (object) {
                if (object.element instanceof Element && object.element.parentNode !== null) {
                    object.element.parentNode.removeChild(object.element);
                }
            });
        });
    }
    copyPosition(pos) {
        this['position'].copy(pos);
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.element = source.element.cloneNode(true);
        return this;
    }
}
CSS2DObject.prototype.isCSS2DObject = true;
const _vector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _viewMatrix = new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4();
const _viewProjectionMatrix = new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4();
const _a = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _b = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
class CSS2DRenderer {
    constructor() {
        this._width = 0;
        this._height = 0;
        this._widthHalf = 0;
        this._heightHalf = 0;
        this.cache = {
            objects: new WeakMap()
        };
        const cache = {
            objects: new WeakMap()
        };
        const domElement = document.createElement('div');
        domElement.style.overflow = 'hidden';
        this.domElement = domElement;
    }
    getSize() {
        return {
            width: this._width,
            height: this._height
        };
    }
    render(scene, camera) {
        if (scene.autoUpdate === true)
            scene.updateMatrixWorld();
        if (camera.parent === null)
            camera.updateMatrixWorld();
        _viewMatrix.copy(camera.matrixWorldInverse);
        _viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, _viewMatrix);
        this.renderObject(scene, scene, camera);
        this.zOrder(scene);
    }
    ;
    setSize(width, height) {
        this._width = width;
        this._height = height;
        this._widthHalf = this._width / 2;
        this._heightHalf = this._height / 2;
        this.domElement.style.width = width + 'px';
        this.domElement.style.height = height + 'px';
    }
    renderObject(object, scene, camera) {
        if (object.isCSS2DObject) {
            object.onBeforeRender(this, scene, camera);
            _vector.setFromMatrixPosition(object.matrixWorld);
            _vector.applyMatrix4(_viewProjectionMatrix);
            const element = object.element;
            if (/apple/i.test(navigator.vendor)) {
                // https://github.com/mrdoob/three.js/issues/21415
                element.style.transform = 'translate(-50%,-50%) translate(' + Math.round(_vector.x * this._widthHalf + this._widthHalf) + 'px,' + Math.round(-_vector.y * this._heightHalf + this._heightHalf) + 'px)';
            }
            else {
                element.style.transform = 'translate(-50%,-50%) translate(' + (_vector.x * this._widthHalf + this._widthHalf) + 'px,' + (-_vector.y * this._heightHalf + this._heightHalf) + 'px)';
            }
            element.style.display = (object.visible && _vector.z >= -1 && _vector.z <= 1) ? '' : 'none';
            const objectData = {
                distanceToCameraSquared: this.getDistanceToSquared(camera, object)
            };
            this.cache.objects.set(object, objectData);
            if (element.parentNode !== this.domElement) {
                this.domElement.appendChild(element);
            }
            object.onAfterRender(this, scene, camera);
        }
        for (let i = 0, l = object.children.length; i < l; i++) {
            this.renderObject(object.children[i], scene, camera);
        }
    }
    getDistanceToSquared(object1, object2) {
        _a.setFromMatrixPosition(object1.matrixWorld);
        _b.setFromMatrixPosition(object2.matrixWorld);
        return _a.distanceToSquared(_b);
    }
    filterAndFlatten(scene) {
        const result = [];
        scene.traverse(function (object) {
            if (object.isCSS2DObject)
                result.push(object);
        });
        return result;
    }
    zOrder(scene) {
        const sorted = this.filterAndFlatten(scene).sort(function (a, b) {
            const distanceA = this.cache.objects.get(a).distanceToCameraSquared;
            const distanceB = this.cache.objects.get(b).distanceToCameraSquared;
            return distanceA - distanceB;
        });
        const zMax = sorted.length;
        for (let i = 0, l = sorted.length; i < l; i++) {
            sorted[i].element.style.zIndex = zMax - i;
        }
    }
}



/***/ }),

/***/ "./lib/loaderPDB.module.ts":
/*!*********************************!*\
  !*** ./lib/loaderPDB.module.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadPDB": () => (/* binding */ LoadPDB)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @youwol/flux-core */ "@youwol/flux-core");
/* harmony import */ var _youwol_flux_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ "./lib/main.ts");
/* harmony import */ var _PDBLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PDBLoader */ "./lib/PDBLoader.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CSS2Sobject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CSS2Sobject */ "./lib/CSS2Sobject.ts");






/**
  ## Presentation
This brick enables to load a Protein Data Bank object to visualize with three.js.
<center><img style="width:40%; height:40%;" src="media://protein.png" alt="alt text"></center>

 */
var LoadPDB;
(function (LoadPDB) {
    let svgIcon = `<g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)"
    fill="#000000" stroke="none">
    <path d="M4910 7384 c-95 -41 -151 -123 -152 -224 l-1 -59 -111 -64 c-61 -35
    -222 -128 -358 -206 l-247 -142 -44 26 c-93 54 -203 43 -284 -28 -58 -52 -82
    -105 -83 -180 0 -96 47 -174 133 -218 l37 -19 0 -293 -1 -292 -52 -30 c-73
    -42 -110 -106 -115 -195 l-4 -67 -358 -207 -359 -207 -40 27 c-30 19 -58 28
    -106 31 -87 8 -141 -13 -198 -77 -72 -80 -87 -176 -41 -268 27 -54 83 -109
    122 -118 l22 -6 0 -419 0 -419 -37 -19 c-115 -59 -164 -200 -109 -316 62 -132
    202 -180 333 -115 l60 30 356 -206 357 -206 0 -57 c0 -66 24 -123 70 -169 46
    -46 85 -64 155 -70 117 -9 218 62 251 177 9 29 14 68 11 86 l-5 32 361 208
    c292 168 363 206 376 196 55 -38 79 -46 151 -46 72 0 96 8 151 46 13 10 84
    -28 376 -196 l361 -208 -5 -32 c-3 -18 2 -57 11 -86 33 -115 134 -186 251
    -177 70 6 109 24 155 70 46 46 70 103 70 170 l0 56 338 195 c185 107 346 199
    358 205 16 9 32 5 79 -19 128 -64 269 -15 331 116 55 116 6 257 -108 316 l-38
    19 0 419 0 419 23 6 c38 9 94 64 121 118 46 92 31 188 -41 268 -57 64 -111 85
    -198 77 -48 -3 -76 -12 -106 -31 l-40 -27 -359 207 -358 206 -4 68 c-5 89 -42
    153 -115 195 l-52 30 -1 292 0 293 38 19 c85 44 132 122 132 218 -1 75 -25
    128 -83 180 -81 71 -191 82 -284 28 l-44 -26 -358 206 -358 206 -1 59 c-2 137
    -108 241 -244 240 -29 -1 -69 -8 -88 -16z m-42 -433 c81 -56 181 -53 278 9 20
    12 50 -3 382 -195 l360 -208 -5 -32 c-9 -57 23 -141 72 -190 24 -25 55 -47 69
    -51 l26 -6 0 -299 0 -299 -37 -19 c-81 -41 -127 -116 -127 -207 l-1 -61 -358
    -206 -357 -206 -56 30 c-43 22 -69 29 -114 29 -45 0 -71 -7 -114 -29 l-56 -30
    -357 206 -358 206 -1 61 c0 93 -48 168 -131 210 l-33 17 0 298 0 299 26 6 c14
    4 45 26 69 51 49 49 81 133 72 190 l-5 32 356 206 c197 114 361 207 365 207 5
    0 21 -8 35 -19z m-1048 -1741 c56 -15 111 -6 171 27 27 14 54 23 61 20 7 -3
    168 -95 358 -205 l345 -200 1 -49 c1 -27 7 -66 14 -87 16 -48 72 -111 122
    -137 l38 -19 0 -415 0 -415 -26 -10 c-84 -32 -145 -124 -146 -220 l-1 -60
    -336 -193 c-185 -107 -346 -199 -358 -205 -18 -10 -31 -7 -74 16 -75 38 -163
    38 -235 -2 l-52 -28 -353 204 -354 204 -7 66 c-10 101 -55 171 -135 212 l-33
    17 0 419 c0 346 2 420 13 420 27 0 96 60 123 105 19 34 28 65 32 113 l5 67
    356 206 356 205 35 -22 c19 -12 55 -28 80 -34z m3192 -422 c4 -48 13 -79 32
    -113 27 -45 96 -105 123 -105 11 0 13 -74 13 -420 l0 -419 -32 -17 c-81 -41
    -126 -111 -136 -212 l-7 -66 -354 -204 -353 -204 -52 28 c-72 40 -160 40 -235
    2 -43 -23 -56 -26 -74 -17 -12 7 -173 99 -358 206 l-336 193 -1 60 c-1 96 -62
    188 -146 220 l-26 10 0 415 0 415 38 19 c50 26 106 89 122 137 7 21 13 60 14
    87 l1 49 345 200 c190 110 351 202 358 205 7 3 34 -6 61 -20 26 -15 65 -29 88
    -33 46 -7 135 15 172 44 l23 19 358 -206 357 -206 5 -67z"/>
    </g>`;
    /**
     * ## Persistent Data  🔧
     *
     * The persistent data (or configuration) defines the property *operation type*, see [[Operations]].
     *
     * To learn more:
     * [@Schema decorator](/api/assets-gateway/raw/package/QHlvdXdvbC9mbHV4LWNvcmU=/latest/dist/docs/modules/lib_models_decorators.html#schema),
     * [configuration](/api/assets-gateway/raw/package/QHlvdXdvbC9mbHV4LWNvcmU=/latest/dist/docs/classes/core_concepts.moduleconfiguration.html)
     *
     */
    let PersistentData = class PersistentData {
        constructor() {
            this.load = "fileloaded";
        }
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
        (0,_youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__.Property)({
            description: "beginning simulation",
            //type: "date"
        }),
        (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__metadata)("design:type", String)
    ], PersistentData.prototype, "load", void 0);
    PersistentData = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
        (0,_youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__.Schema)({
            pack: _main__WEBPACK_IMPORTED_MODULE_1__.pack
        })
    ], PersistentData);
    LoadPDB.PersistentData = PersistentData;
    let Module = class Module extends _youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__.ModuleFlux {
        constructor(params) {
            super(params);
            this.addInput({
                id: 'input',
                description: 'trigger an operation between 2 numbers',
                contract: (0,_youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__.freeContract)(),
                onTriggered: ({ data, configuration, context }) => this.loadPDBObject(data, configuration, context)
            });
            this.result$ = this.addOutput({ id: 'result' });
        }
        /**
        * Processing function triggered when a message is received
        */
        loadPDBObject(data, configuration, context) {
            const pdb = (0,_PDBLoader__WEBPACK_IMPORTED_MODULE_2__.loadPDB)(data);
            const root = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
            const offset = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3();
            const geometryAtoms = pdb.geometryAtoms;
            const geometryBonds = pdb.geometryBonds;
            const json = pdb.json;
            const boxGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(1, 1, 1);
            const sphereGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.IcosahedronGeometry(1, 3);
            geometryAtoms.computeBoundingBox();
            geometryAtoms.boundingBox.getCenter(offset).negate();
            geometryAtoms.translate(offset.x, offset.y, offset.z);
            geometryBonds.translate(offset.x, offset.y, offset.z);
            let positions = geometryAtoms.getAttribute('position');
            const colors = geometryAtoms.getAttribute('color');
            const position = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3();
            const color = new three__WEBPACK_IMPORTED_MODULE_3__.Color();
            for (let i = 0; i < positions.count; i++) {
                position.x = positions.getX(i);
                position.y = positions.getY(i);
                position.z = positions.getZ(i);
                color.r = colors.getX(i);
                color.g = colors.getY(i);
                color.b = colors.getZ(i);
                const material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshPhongMaterial({ color: color });
                const object = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(sphereGeometry, material);
                object.position.copy(position);
                object.position.multiplyScalar(75);
                object.scale.multiplyScalar(25);
                root.add(object);
                const atom = json.atoms[i];
                const text = document.createElement('div');
                text.className = 'label';
                text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
                text.textContent = atom[4];
                const label = new _CSS2Sobject__WEBPACK_IMPORTED_MODULE_4__.CSS2DObject(text);
                label.copyPosition(object.position);
                //label.super.position(object.position)
                //label.copyPosition( object.position )
                root.add(label);
            }
            positions = geometryBonds.getAttribute('position');
            const start = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3();
            const end = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3();
            for (let i = 0; i < positions.count; i += 2) {
                start.x = positions.getX(i);
                start.y = positions.getY(i);
                start.z = positions.getZ(i);
                end.x = positions.getX(i + 1);
                end.y = positions.getY(i + 1);
                end.z = positions.getZ(i + 1);
                start.multiplyScalar(75);
                end.multiplyScalar(75);
                const object = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(boxGeometry, new three__WEBPACK_IMPORTED_MODULE_3__.MeshPhongMaterial(0xffffff));
                object.position.copy(start);
                object.position.lerp(end, 0.5);
                object.scale.set(5, 5, start.distanceTo(end));
                object.lookAt(end);
                root.add(object);
            }
            const light1 = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 0.8);
            light1.position.set(1, 1, 1);
            root.add(light1);
            const light2 = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 0.5);
            light2.position.set(-1, -1, 1);
            root.add(light2);
            this.result$.next({ data: root, context });
            context.terminate();
        }
    };
    Module = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
        (0,_youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__.Flux)({
            pack: _main__WEBPACK_IMPORTED_MODULE_1__.pack,
            namespace: LoadPDB,
            id: "brickLoaderPDB",
            displayName: "Loader PDB",
            description: "A brick that loads .pdb format for protein  :/ ",
            resources: {
                'technical doc': `${_main__WEBPACK_IMPORTED_MODULE_1__.pack.urlCDN}/dist/docs/modules/lib_simple_module_module.simplemodule.html`
            }
        }),
        (0,_youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__.BuilderView)({
            namespace: LoadPDB,
            icon: svgIcon
        }),
        (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__metadata)("design:paramtypes", [Object])
    ], Module);
    LoadPDB.Module = Module;
})(LoadPDB || (LoadPDB = {}));
// ----------------------------------------------------
/* class CSS2DObject extends Object3D {

    element: any
    isCSS2DObject = true

    constructor( element: any ) {
        super();

        this.element = element || document.createElement( 'div' );

        this.element.style.position = 'absolute';
        this.element.style.userSelect = 'none';

        this.element.setAttribute( 'draggable', false );

        super.addEventListener( 'removed', function () {

            this.traverse( function ( object ) {

                if ( object.element instanceof Element && object.element.parentNode !== null ) {

                    object.element.parentNode.removeChild( object.element );

                }

            } );

        } );

    }

    copy( source: any, recursive: any ) {

        super.copy( source, recursive );

        this.element = source.element.cloneNode( true );

        return this;

    }
    copyPosition( pos: any ) {
        this.position.copy( pos );

    }

}


const _vector = new Vector3();
const _viewMatrix = new Matrix4();
const _viewProjectionMatrix = new Matrix4();
const _a = new Vector3();
const _b = new Vector3();

class CSS2DRenderer {

    domElement: any
    _width = 0
    _height = 0
    _widthHalf = 0
    _heightHalf = 0


    cache = {
        objects: new WeakMap()
    };

    getSize() {
        return {
            width: this._width,
            height: this._height
        }
    }

    constructor() {
        const cache = {
            objects: new WeakMap()
        }
        const domElement = document.createElement( 'div' );
        domElement.style.overflow = 'hidden';
        this.domElement = domElement
    }

    render( scene: any, camera: any ) {
        if ( scene.autoUpdate === true ) scene.updateMatrixWorld();
        if ( camera.parent === null ) camera.updateMatrixWorld();

        _viewMatrix.copy( camera.matrixWorldInverse );
        _viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, _viewMatrix );

        this.renderObject( scene, scene, camera );
        this.zOrder( scene );

    };

    setSize( width: number, height: number ) {

        this._width = width;
        this._height = height;

        this._widthHalf = this._width / 2;
        this._heightHalf = this._height / 2;

        this.domElement.style.width = width + 'px';
        this.domElement.style.height = height + 'px';
    }

    renderObject( object: any, scene: any, camera: any ) {

        if ( object.isCSS2DObject ) {

            object.onBeforeRender( this, scene, camera );

            _vector.setFromMatrixPosition( object.matrixWorld );
            _vector.applyMatrix4( _viewProjectionMatrix );

            const element = object.element;

            if ( /apple/i.test( navigator.vendor ) ) {

                // https://github.com/mrdoob/three.js/issues/21415
                element.style.transform = 'translate(-50%,-50%) translate(' + Math.round( _vector.x * this._widthHalf + this._widthHalf ) + 'px,' + Math.round( - _vector.y * this._heightHalf + this._heightHalf ) + 'px)';

            } else {

                element.style.transform = 'translate(-50%,-50%) translate(' + ( _vector.x * this._widthHalf + this._widthHalf ) + 'px,' + ( - _vector.y * this._heightHalf + this._heightHalf ) + 'px)';

            }

            element.style.display = ( object.visible && _vector.z >= - 1 && _vector.z <= 1 ) ? '' : 'none';

            const objectData = {
                distanceToCameraSquared: this.getDistanceToSquared( camera, object )
            };

            this.cache.objects.set( object, objectData );

            if ( element.parentNode !== this.domElement ) {

                this.domElement.appendChild( element );

            }

            object.onAfterRender( this, scene, camera );

        }

        for ( let i = 0, l = object.children.length; i < l; i ++ ) {

            this.renderObject( object.children[ i ], scene, camera );

        }

    }

    getDistanceToSquared( object1: any, object2: any ) {

        _a.setFromMatrixPosition( object1.matrixWorld );
        _b.setFromMatrixPosition( object2.matrixWorld );

        return _a.distanceToSquared( _b );

    }

    filterAndFlatten( scene: any ) {

        const result = [];

        scene.traverse( function ( object ) {

            if ( object.isCSS2DObject ) result.push( object );

        } );

        return result;

    }

    zOrder( scene: any ) {

        const sorted = this.filterAndFlatten( scene ).sort( function ( a, b ) {

            const distanceA = this.cache.objects.get( a ).distanceToCameraSquared;
            const distanceB = this.cache.objects.get( b ).distanceToCameraSquared;

            return distanceA - distanceB;

        } );

        const zMax = sorted.length;

        for ( let i = 0, l = sorted.length; i < l; i ++ ) {

            sorted[ i ].element.style.zIndex = zMax - i;

        }

    }

} */ 


/***/ }),

/***/ "./lib/main.ts":
/*!*********************!*\
  !*** ./lib/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "install": () => (/* binding */ install),
/* harmony export */   "pack": () => (/* binding */ pack)
/* harmony export */ });
/* harmony import */ var _youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @youwol/flux-core */ "@youwol/flux-core");
/* harmony import */ var _youwol_flux_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auto_generated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auto_generated */ "./auto_generated.ts");


function install(environment) {
    return;
}
let pack = new _youwol_flux_core__WEBPACK_IMPORTED_MODULE_0__.FluxPack({
    ..._auto_generated__WEBPACK_IMPORTED_MODULE_1__.AUTO_GENERATED,
    ...{
        install
    }
});


/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ "./lib/PDBLoader.js":
/*!**************************!*\
  !*** ./lib/PDBLoader.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadPDB": () => (/* binding */ loadPDB)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);




	function loadPDB( text ) {

		function buildGeometry() {

			const build = {
				geometryAtoms: new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry(),
				geometryBonds: new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry(),
				json: {
					atoms: atoms
				}
			};

			const geometryAtoms = build.geometryAtoms;
			const geometryBonds = build.geometryBonds;

			const verticesAtoms = [];
			const colorsAtoms = [];
			const verticesBonds = [];

			// atoms

			for ( let i = 0, l = atoms.length; i < l; i ++ ) {

				const atom = atoms[ i ];

				const x = atom[ 0 ];
				const y = atom[ 1 ];
				const z = atom[ 2 ];

				verticesAtoms.push( x, y, z );

				const r = atom[ 3 ][ 0 ] / 255;
				const g = atom[ 3 ][ 1 ] / 255;
				const b = atom[ 3 ][ 2 ] / 255;

				colorsAtoms.push( r, g, b );

			}

			// bonds

			for ( let i = 0, l = _bonds.length; i < l; i ++ ) {

				const bond = _bonds[ i ];

				const start = bond[ 0 ];
				const end = bond[ 1 ];

				const startAtom = _atomMap[ start ];
				const endAtom = _atomMap[ end ];

				let x = startAtom[ 0 ];
				let y = startAtom[ 1 ];
				let z = startAtom[ 2 ];

				verticesBonds.push( x, y, z );

				x = endAtom[ 0 ];
				y = endAtom[ 1 ];
				z = endAtom[ 2 ];

				verticesBonds.push( x, y, z );

			}

			// build geometry

			geometryAtoms.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( verticesAtoms, 3 ) );
			geometryAtoms.setAttribute( 'color', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( colorsAtoms, 3 ) );
			geometryBonds.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( verticesBonds, 3 ) );

			return build;

		}

		const CPK = { h: [ 255, 255, 255 ], he: [ 217, 255, 255 ], li: [ 204, 128, 255 ], be: [ 194, 255, 0 ], b: [ 255, 181, 181 ], c: [ 144, 144, 144 ], n: [ 48, 80, 248 ], o: [ 255, 13, 13 ], f: [ 144, 224, 80 ], ne: [ 179, 227, 245 ], na: [ 171, 92, 242 ], mg: [ 138, 255, 0 ], al: [ 191, 166, 166 ], si: [ 240, 200, 160 ], p: [ 255, 128, 0 ], s: [ 255, 255, 48 ], cl: [ 31, 240, 31 ], ar: [ 128, 209, 227 ], k: [ 143, 64, 212 ], ca: [ 61, 255, 0 ], sc: [ 230, 230, 230 ], ti: [ 191, 194, 199 ], v: [ 166, 166, 171 ], cr: [ 138, 153, 199 ], mn: [ 156, 122, 199 ], fe: [ 224, 102, 51 ], co: [ 240, 144, 160 ], ni: [ 80, 208, 80 ], cu: [ 200, 128, 51 ], zn: [ 125, 128, 176 ], ga: [ 194, 143, 143 ], ge: [ 102, 143, 143 ], as: [ 189, 128, 227 ], se: [ 255, 161, 0 ], br: [ 166, 41, 41 ], kr: [ 92, 184, 209 ], rb: [ 112, 46, 176 ], sr: [ 0, 255, 0 ], y: [ 148, 255, 255 ], zr: [ 148, 224, 224 ], nb: [ 115, 194, 201 ], mo: [ 84, 181, 181 ], tc: [ 59, 158, 158 ], ru: [ 36, 143, 143 ], rh: [ 10, 125, 140 ], pd: [ 0, 105, 133 ], ag: [ 192, 192, 192 ], cd: [ 255, 217, 143 ], in: [ 166, 117, 115 ], sn: [ 102, 128, 128 ], sb: [ 158, 99, 181 ], te: [ 212, 122, 0 ], i: [ 148, 0, 148 ], xe: [ 66, 158, 176 ], cs: [ 87, 23, 143 ], ba: [ 0, 201, 0 ], la: [ 112, 212, 255 ], ce: [ 255, 255, 199 ], pr: [ 217, 255, 199 ], nd: [ 199, 255, 199 ], pm: [ 163, 255, 199 ], sm: [ 143, 255, 199 ], eu: [ 97, 255, 199 ], gd: [ 69, 255, 199 ], tb: [ 48, 255, 199 ], dy: [ 31, 255, 199 ], ho: [ 0, 255, 156 ], er: [ 0, 230, 117 ], tm: [ 0, 212, 82 ], yb: [ 0, 191, 56 ], lu: [ 0, 171, 36 ], hf: [ 77, 194, 255 ], ta: [ 77, 166, 255 ], w: [ 33, 148, 214 ], re: [ 38, 125, 171 ], os: [ 38, 102, 150 ], ir: [ 23, 84, 135 ], pt: [ 208, 208, 224 ], au: [ 255, 209, 35 ], hg: [ 184, 184, 208 ], tl: [ 166, 84, 77 ], pb: [ 87, 89, 97 ], bi: [ 158, 79, 181 ], po: [ 171, 92, 0 ], at: [ 117, 79, 69 ], rn: [ 66, 130, 150 ], fr: [ 66, 0, 102 ], ra: [ 0, 125, 0 ], ac: [ 112, 171, 250 ], th: [ 0, 186, 255 ], pa: [ 0, 161, 255 ], u: [ 0, 143, 255 ], np: [ 0, 128, 255 ], pu: [ 0, 107, 255 ], am: [ 84, 92, 242 ], cm: [ 120, 92, 227 ], bk: [ 138, 79, 227 ], cf: [ 161, 54, 212 ], es: [ 179, 31, 212 ], fm: [ 179, 31, 186 ], md: [ 179, 13, 166 ], no: [ 189, 13, 135 ], lr: [ 199, 0, 102 ], rf: [ 204, 0, 89 ], db: [ 209, 0, 79 ], sg: [ 217, 0, 69 ], bh: [ 224, 0, 56 ], hs: [ 230, 0, 46 ], mt: [ 235, 0, 38 ], ds: [ 235, 0, 38 ], rg: [ 235, 0, 38 ], cn: [ 235, 0, 38 ], uut: [ 235, 0, 38 ], uuq: [ 235, 0, 38 ], uup: [ 235, 0, 38 ], uuh: [ 235, 0, 38 ], uus: [ 235, 0, 38 ], uuo: [ 235, 0, 38 ] };

		const atoms = [];

		const _bonds = [];
		const _bhash = {};
		const _atomMap = {};
		
		function parseBond( start, length, satom, i ) {

			const eatom = parseInt( lines[ i ].substr( start, length ) );
		
			if ( eatom ) {
		
				const h = hash( satom, eatom );
		
				if ( _bhash[ h ] === undefined ) {
		
					_bonds.push( [ satom - 1, eatom - 1, 1 ] );
					_bhash[ h ] = _bonds.length - 1;
		
				} else {
		
					// doesn't really work as almost all PDBs
					// have just normal bonds appearing multiple
					// times instead of being double/triple bonds
					// bonds[bhash[h]][2] += 1;
		
				}
		
			}
		
		}
		
		// parse
		const lines = text.content.split( '\n' );

		for ( let i = 0, l = lines.length; i < l; i ++ ) {

			if ( lines[ i ].substr( 0, 4 ) === 'ATOM' || lines[ i ].substr( 0, 6 ) === 'HETATM' ) {

				const x = parseFloat( lines[ i ].substr( 30, 7 ) );
				const y = parseFloat( lines[ i ].substr( 38, 7 ) );
				const z = parseFloat( lines[ i ].substr( 46, 7 ) );
				const index = parseInt( lines[ i ].substr( 6, 5 ) ) - 1;

				let e = trim( lines[ i ].substr( 76, 2 ) ).toLowerCase();

				if ( e === '' ) {

					e = trim( lines[ i ].substr( 12, 2 ) ).toLowerCase();

				}

				const atomData = [ x, y, z, CPK[ e ], capitalize( e ) ];

				atoms.push( atomData );
				_atomMap[ index ] = atomData;

			} else if ( lines[ i ].substr( 0, 6 ) === 'CONECT' ) {

				const satom = parseInt( lines[ i ].substr( 6, 5 ) );

				parseBond( 11, 5, satom, i );
				parseBond( 16, 5, satom, i );
				parseBond( 21, 5, satom, i );
				parseBond( 26, 5, satom, i );

			}

		}

		// build and return geometry

		return buildGeometry();

	}

// ---------------------------------------------

function trim( text ) {

	return text.replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' );

}

function capitalize( text ) {

	return text.charAt( 0 ).toUpperCase() + text.substr( 1 ).toLowerCase();

}

function hash( s, e ) {

	return 's' + Math.min( s, e ) + 'e' + Math.max( s, e );

}



/***/ }),

/***/ "@youwol/flux-core":
/*!************************************!*\
  !*** external "@youwol/flux-core" ***!
  \************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__youwol_flux_core__;

/***/ }),

/***/ "three":
/*!************************************************************************!*\
  !*** external {"commonjs":"three","commonjs2":"three","root":"THREE"} ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_three__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "install": () => (/* reexport safe */ _lib_main__WEBPACK_IMPORTED_MODULE_0__.install),
/* harmony export */   "pack": () => (/* reexport safe */ _lib_main__WEBPACK_IMPORTED_MODULE_0__.pack),
/* harmony export */   "LoadPDB": () => (/* reexport safe */ _lib_loaderPDB_module__WEBPACK_IMPORTED_MODULE_1__.LoadPDB),
/* harmony export */   "loadPDB": () => (/* reexport safe */ _lib_PDBLoader__WEBPACK_IMPORTED_MODULE_2__.loadPDB)
/* harmony export */ });
/* harmony import */ var _lib_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/main */ "./lib/main.ts");
/* harmony import */ var _lib_loaderPDB_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/loaderPDB.module */ "./lib/loaderPDB.module.ts");
/* harmony import */ var _lib_PDBLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/PDBLoader */ "./lib/PDBLoader.js");
/*
 * Public API Surface of pdbloader
 */




})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=pdbloader.js.map