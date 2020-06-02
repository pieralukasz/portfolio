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
                </div>
                <div class="backend">
                    <div class="title">Backend</div>
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
        setTimeout(() => {
            document.querySelector('.container-portfolio').innerHTML = this.template()
        }, 100);
        this.makeKnowledge()
        this.checkWidthKnowledge()
        document.body.addEventListener('resize', this.checkWidthKnowledge)
    }

    makeKnowledge() {

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
