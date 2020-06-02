import * as THREE from 'three'
import { Colors, Sphere } from 'three'
import '../assets/planet1.jpg'

import Router from '../routes'

class Photo extends HTMLElement {
    // template Photo

    template(): string {
        return `

            <div class="photo"></div>
        
        `
    }

    constructor() {
        super()
    }

    // initial render Photo

    connectedCallback(): void {
        this.innerHTML = this.template()
        this.makeTHREE()
    }

    makeTHREE(): void {
        // Create Scene and Camera and Renderer

        const { innerWidth, innerHeight } = window
        const clock: THREE.Clock = new THREE.Clock()
        const scene: THREE.Scene = new THREE.Scene()

        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
            50,
            innerWidth / innerHeight,
            0.1,
            1000
        )

        camera.position.z = 450

        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
            antialias: true,
        })
        renderer.setSize(innerWidth, innerHeight)
        document.querySelector('.photo').appendChild(renderer.domElement)

        // Set moon

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(
            300,
            64,
            64
        )
        const texture: THREE.TextureLoader = new THREE.TextureLoader()
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
            map: texture.load('../assets/planet1.jpg'),
        })
        const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
        cube.position.set(220, -200, 0)
        cube.renderOrder = 1000

        // Set sun

        const sunGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(
            60,
            32,
            32
        )
        const sunMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(
            {
                map: texture.load('https://solartextures.b-cdn.net/2k_mars.jpg'),
            }
        )

        const sun: THREE.Mesh = new THREE.Mesh(sunGeometry, sunMaterial)
        sun.position.set(-180, 100, -250)

        // only show on Home component

        if (Router.parseLocation() === '/' || Router.parseLocation() === '/#') {
            scene.add(cube)
            scene.add(sun)
        }


        // Add stars

        function addStar(): void {

            const vertices: [any?] = [];

            for (let i = 0; i < 1000; i ++ ) {

	            const x: number = THREE.MathUtils.randFloatSpread( 1000 );
	            const y: number = THREE.MathUtils.randFloatSpread( 800 );
	            const z: number = THREE.MathUtils.randFloatSpread( 700 );

	            vertices.push( x, y, z );

            }

            const geometry: THREE.BufferGeometry = new THREE.BufferGeometry();
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

            const material: THREE.PointsMaterial = new THREE.PointsMaterial( { color: 0xffffff } );

            const points: THREE.Points = new THREE.Points( geometry, material );

            scene.add( points );
        }

        addStar()

        // Add randomly fallen star must


        // Resize Protect

        function onWindowResize(): void {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', onWindowResize, false)

        // Render Scene

        function render(): void {
            const delta = clock.getDelta()

            

            if (
                Router.parseLocation() === '/' ||
                Router.parseLocation() === '/#'
            ) {
                cube.rotation.y += delta * 0.1
                cube.rotation.z += delta * 0.03

                sun.rotation.y += delta * 0.05
                sun.rotation.x += delta * 0.05
            }

            renderer.render(scene, camera)

            setTimeout(() => {
                requestAnimationFrame(render)
            }, 1000 / 80)
        }


        render()

        

        // Camera move

        if (window.innerWidth >= 1000) {
            window.addEventListener('mousemove', (e) => {
                camera.position.x = e.clientX / 30
                camera.position.y = e.clientY / 30
            })
        }

    }
}

export default Photo


// function randomFallenStar(): void {
//     const materialStar = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//     })
//     let geometryStar = new THREE.SphereGeometry(
//         Math.random() * 3,
//         4,
//         4
//     )
//     let star = new THREE.Mesh(geometryStar, materialStar)

//     star.position.y = THREE.MathUtils.randFloatSpread(500)
//     star.position.x = THREE.MathUtils.randFloatSpread(1000)

//     scene.add(star)

//     const makeRandom = (): void => {
//         setTimeout(() => {
//             star.position.z -= 25
//             requestAnimationFrame(makeRandom)
//         }, 1000 / 50)

//         setTimeout(() => {
//             scene.remove(star) 
//             // clearInterval(stopMe)          
//         }, 2000);
//     }

//     makeRandom()
// }

// const stopMe = setInterval(() => {
//     randomFallenStar()
// }, 250)
