import { Object3D, Vector3, Matrix4} from 'three' 

class CSS2DObject extends Object3D {

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

    copyPosition(pos: Vector3){
        this['position'].copy(pos)
    }

	copy( source: any, recursive: any ) {

		super.copy( source, recursive );

		this.element = source.element.cloneNode( true );

		return this;

	}


    /* copyPosition( pos: any ) {
        this.position.copy( pos );

    }   */

}

CSS2DObject.prototype.isCSS2DObject = true;
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

} 
export { CSS2DObject, CSS2DRenderer };