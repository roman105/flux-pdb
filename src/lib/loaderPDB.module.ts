import {
    Context, expectAnyOf, expectAttribute, expect as expect_, expectCount,
    BuilderView, Flux, Property, RenderView, Schema, ModuleFlux, Pipe, freeContract, expectInstanceOf
} from '@youwol/flux-core'
import { attr$, render } from "@youwol/flux-view"
import { pack } from './main'
import { Scene } from 'three'
import { loadPDB } from './PDBLoader'
import {
    Object3D, MeshPhongMaterial, Mesh, Group, Vector3, Color, BoxGeometry,
    IcosahedronGeometry, DirectionalLight
} from 'three'
import { CSS2DObject, CSS2DRenderer } from './CSS2Sobject'
import { map } from 'rxjs/operators'
import * as FluxThree from '@youwol/flux-three'
import * as FluxFiles from '@youwol/flux-files'

/**
  ## Presentation
This brick enables to load a Protein Data Bank object to visualize with three.js.
<center><img style="width:40%; height:40%;" src="media://protein.png" alt="alt text"></center>

 */
export namespace LoadPDB {
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
    </g>`
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
    @Schema({
        pack
    })

    export class PersistentData extends FluxThree.Schemas.SimpleObject3DConfiguration {

        constructor(forwardParams) {
            super({
                ...forwardParams,
                ...{
                    objectId: forwardParams && forwardParams['objectId'] ? forwardParams['objectId'] : 'PDBLoaded',
                    objectName: forwardParams && forwardParams['objectName'] ? forwardParams['objectName'] : 'PDBLoaded'
                }
            })
        }
    }

    export let fileExpectation = expectInstanceOf<FluxFiles.Interfaces.File>({
        typeName: 'File', Type: FluxFiles.Interfaces.File, attNames: ['file', 'data']
    })

    @Flux({
        pack: pack,
        namespace: LoadPDB,
        id: "brickLoaderPDB",
        displayName: "Loader PDB",
        description: "Create PDB 3D object from Protein Data Bank data format ",
        resources: {
            'technical doc': `${pack.urlCDN}/dist/docs/modules/lib_simple_module_module.simplemodule.html`
        }
    })
    @BuilderView({
        namespace: LoadPDB,
        icon: svgIcon
    })
    export class Module extends ModuleFlux {
        /**
         * This is the output, you can use it to emit messages using *this.result$.next(...)*.
         *
         */
        output$: Pipe<Object3D>
        constructor(params) {
            super(params)

            this.addInput({
                id: 'input',
                description: 'load from a file (.pdb)',
                contract: freeContract(),
                onTriggered: ({ data, configuration, context }) => this.loadPDBObject(data, configuration, context)
            })
            this.output$ = this.addOutput({ id: 'result' })
        }
        /**
        * Processing function triggered when a message is received
        */
        loadPDBObject(file: FluxFiles.Interfaces.File, configuration: PersistentData, context: Context) {


            /* const pdb =  file.readAsText().map((buffer) => {
                 return loadPDB(buffer)
                 
            }) */

            file.readAsText().pipe(
                map((buffer: string) => {
                    return loadPDB(buffer)
                }),
                map((pdb) => {
                    return createMolecule3DObject(pdb)
                }),
            ).subscribe((root) => {
                this.output$.next({ data: root, context })
                context.terminate()
            })
        }
    }

    function createMolecule3DObject(pdb) {

        const root = new Group()
        const offset = new Vector3();
        const geometryAtoms = pdb.geometryAtoms;
        const geometryBonds = pdb.geometryBonds;
        const json = pdb.json;
        const boxGeometry = new BoxGeometry(1, 1, 1);
        const sphereGeometry = new IcosahedronGeometry(1, 3);
        geometryAtoms.computeBoundingBox();
        geometryAtoms.boundingBox.getCenter(offset).negate();
        geometryAtoms.translate(offset.x, offset.y, offset.z);
        geometryBonds.translate(offset.x, offset.y, offset.z);
        let positions = geometryAtoms.getAttribute('position');
        const colors = geometryAtoms.getAttribute('color');
        const position = new Vector3();
        const color = new Color();
        for (let i = 0; i < positions.count; i++) {
            position.x = positions.getX(i);
            position.y = positions.getY(i);
            position.z = positions.getZ(i);
            color.r = colors.getX(i);
            color.g = colors.getY(i);
            color.b = colors.getZ(i);
            const material = new MeshPhongMaterial({ color: color });
            const object = new Mesh(sphereGeometry, material);
            object.position.copy(position);
            object.position.multiplyScalar(75);
            object.scale.multiplyScalar(25);
            root.add(object);

            const atom = json.atoms[i];
            const text = document.createElement('div');
            text.className = 'label';
            text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
            text.textContent = atom[4];
            const label = new CSS2DObject(text);
            label.copyPosition(object.position);
            //label.super.position(object.position)
            //label.copyPosition( object.position )
            root.add(label);
        }
        positions = geometryBonds.getAttribute('position');
        const start = new Vector3();
        const end = new Vector3();
        for (let i = 0; i < positions.count; i += 2) {
            start.x = positions.getX(i);
            start.y = positions.getY(i);
            start.z = positions.getZ(i);
            end.x = positions.getX(i + 1);
            end.y = positions.getY(i + 1);
            end.z = positions.getZ(i + 1);
            start.multiplyScalar(75);
            end.multiplyScalar(75);
            const object = new Mesh(boxGeometry, new MeshPhongMaterial());
            object.position.copy(start);
            object.position.lerp(end, 0.5);
            object.scale.set(5, 5, start.distanceTo(end));
            object.lookAt(end);
            root.add(object);
        }
        const light1 = new DirectionalLight(0xffffff, 0.8);
        light1.position.set(1, 1, 1);
        root.add(light1);
        const light2 = new DirectionalLight(0xffffff, 0.5);
        light2.position.set(- 1, - 1, 1);
        root.add(light2);

        return root
    }
}
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