import * as THREE from 'three';
import { Colors } from 'three';
import '../assets/planet1.jpg'
import '../assets/sun.jpg'
import { setInterval } from 'timers';

import Router from '../routes/index'


class Photo extends HTMLElement {

    // template Navbar 

    template(): string {
        return `

            <div class="photo"></div>
        
        `
    }

    constructor() {
        super();
    }

    // initial renderblue

    connectedCallback(): void {
        this.innerHTML = this.template()
        this.makeTHREE()

    }
    
    makeTHREE(): void {

        // Create Scene and Camera and Renderer

        const { innerWidth, innerHeight } = window
        const scene: THREE.Scene = new THREE.Scene();

        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
            50,
            innerWidth / innerHeight,
            0.1,
            1000
        )

        camera.position.z = 450;

        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias: true})
        renderer.setSize(innerWidth, innerHeight)
        document.querySelector('.photo').appendChild(renderer.domElement)

        // Set moon

        const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(300, 64, 64);
        const texture: THREE.TextureLoader = new THREE.TextureLoader()
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
            map: texture.load('../assets/planet1.jpg')
        });
        const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
        cube.position.set(220, -200, 0)
        cube.renderOrder = 1000
        

        // Set sun

        const sunGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(60, 32, 32)
        const sunMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
            map: texture.load('../assets/sun.jpg'),
        })

        const sun: THREE.Mesh = new THREE.Mesh(sunGeometry, sunMaterial)
        sun.position.set(-180, 100, -250)

        // only show on Home component

        if (Router.parseLocation() === '/' || Router.parseLocation() === '/#') {
            scene.add(cube);
            scene.add(sun);
        }

        // Add stars

        function addStar():  void {

            const materialStar = new THREE.MeshBasicMaterial({ color: 0xffffff })       

            for (let i = 1; i < 1000; i++){

                let geometryStar = new THREE.SphereGeometry(Math.random()*1, 4, 16)
                let star = new THREE.Mesh(geometryStar, materialStar)

                star.position.y = THREE.MathUtils.randFloatSpread( 1000 )
                star.position.x = THREE.MathUtils.randFloatSpread( 1000 )

                scene.add(star)
            }

        }

        function randomFallenStar(): void {

            const materialStar = new THREE.MeshBasicMaterial({ color: 0xffffff })
            let geometryStar = new THREE.SphereGeometry(Math.random()*3, 4, 16)
            let star = new THREE.Mesh(geometryStar, materialStar)

            star.position.y = THREE.MathUtils.randFloatSpread( 1000 )
            star.position.x = THREE.MathUtils.randFloatSpread( 1000 )

            let timer = 0

            let speed = 12.5

            scene.add(star)

            setInterval(() => {

                timer += speed

                star.position.z -= 25

                if(timer >= (500 / speed)) clearInterval()

            }, speed)

            
        }

        setInterval(() => {
            randomFallenStar()
        }, 500)

        addStar()

        // Resize Protect

        function onWindowResize(){

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        
        }

        window.addEventListener( 'resize', onWindowResize, false );

        // Render Scene

        const clock: THREE.Clock = new THREE.Clock()

        function render(): void {
            const delta = clock.getDelta()

            cube.rotation.y += delta * 0.15
            cube.rotation.z += delta * 0.03

            sun.rotation.y += delta * 0.05
            sun.rotation.x += delta * 0.05

            renderer.render(scene, camera)

            requestAnimationFrame(render)
        }

        render()

        // Camera move

        window.addEventListener('mousemove', (e) => {
            camera.position.x = e.clientX / 30
            camera.position.y = e.clientY / 30
        })

    }

}

export default Photo