import * as THREE from 'three'
import knowledgeList from './assets/knowledge'
const OrbitControls = require('three-orbit-controls')(THREE)

class Knowledge extends HTMLElement {
    // template Knowledge

    template(): string {
        return `

        <div class="knowledge">

            <div class="canvas"></div>
            <div id="list-knowledge"></div>
        
        </div>


        
        `
    }

    constructor() {
        super()
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()
        this.makeKnowledge()
    }

    makeKnowledge() {

        // make the same stars 

        const scene: THREE.Scene = new THREE.Scene()

        const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
            60,
            innerWidth / innerHeight,
            0.1,
            10
        )

        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
            antialias: true,
        })


        renderer.setSize(window.innerWidth, window.innerHeight)
        document.querySelector('.canvas').appendChild(renderer.domElement)

        const controls = new OrbitControls(camera);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 1.2;
        controls.maxDistance = 4;
        controls.update();

        // make one text

        

        function onWindowResize(): void {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', onWindowResize, false)

        function render(): void {

            renderer.render(scene, camera)

            setTimeout(() => {
                requestAnimationFrame(render)
            }, 1000 / 80)
        }


        render()

    

    }
}

export default Knowledge
