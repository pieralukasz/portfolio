import knowledgeList from './assets/knowledge'
import Router from '../routes'

class Knowledge extends HTMLElement {
    // template Knowledge

    template(): string {
        return `

        <div class="knowledge">
            <div class="skills">My skills<span class="know-dot">.</span></div>
            <div class="skills-container">
                <div class="frontend">
                     <div class="title">Frontend</div>
                     <div class="frontend-container"></div>
                </div>
                <div class="backend">
                    <div class="title">Backend</div>
                    <div class="backend-container"></div>
                </div>
            </div>
            
            <a href="#/"><i class="material-icons home">home</i></a>
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
        this.checkWidthKnowledge()
        document.body.addEventListener('resize', this.checkWidthKnowledge)
    }

    makeKnowledge(): void {

        const frontend: HTMLDivElement = document.querySelector('.frontend-container')
        const backend: HTMLDivElement = document.querySelector('.backend-container')

        for (const element of knowledgeList) {

            const divEl: HTMLDivElement = document.createElement('div')
            divEl.classList.add('element')
            divEl.textContent = element.name

            switch (element.expert) {
                case 'frontend':
                    divEl.classList.add('frontend-element')
                    frontend.appendChild(divEl)
                    break;
                case 'backend':
                    divEl.classList.add('backend-element')
                    backend.appendChild(divEl)
                    break;
                default:
                    break;
            }
            
        }

    }



    checkWidthKnowledge() {

        const skills: HTMLDivElement = document.querySelector('.skills')
        const dot: HTMLSpanElement = document.querySelector('.know-dot')

        if (window.innerWidth < 650) {
            skills.style.fontSize = '50px'
            dot.style.fontSize = '120px'
        } else {
            skills.style.fontSize = '6rem'
            dot.style.fontSize = '150px'
        }
            
    }
}

export default Knowledge
