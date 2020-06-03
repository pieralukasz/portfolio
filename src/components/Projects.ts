import '../assets/llhurt.gif'
import '../assets/snake.gif'
import projectList from './assets/projects'
import { create } from 'domain'

class Projects extends HTMLElement {
    // template Projects

    template(): string {
        return `

            <div class="projects-down" style="overflow: hidden">
                <i class="material-icons arrow-right arrow right-projects">keyboard_arrow_right</i>
                <i class="material-icons arrow-left arrow left-projects">keyboard_arrow_left</i>
            </div>
        
        `
    }
    private initial: number

    constructor() {
        super()
        this.initial = 0

        
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()

        setTimeout(() => {
            this.makeProjects()
            this.checkActive()
        }, 100);
        
        window.addEventListener('keydown', this.moveKeyBoard.bind(this))

        window.addEventListener('touchstart', this.startTouch.bind(this))
        window.addEventListener('touchmove', this.moveTouch.bind(this))

        document.querySelector('.right-projects').addEventListener('click', this.moveRight.bind(this))
        document.querySelector('.left-projects').addEventListener('click', this.moveLeft.bind(this))
    }

    makeProjects(): void {

        const container: HTMLDivElement = document.querySelector('.projects-down')


        for (const [index, element] of projectList.entries()) {

            const arrowBack: HTMLElement = this.createElement('a', '', 'href', '#/')
            arrowBack.innerHTML = '<i class="material-icons back-to-menu">first_page</i>'
            
            const projectContainer: HTMLElement = 
            this.createElement('div', 'projects-container', 'style', `left: ${element.left}`)
            projectContainer.appendChild(arrowBack)

            if(index === 0) projectContainer.classList.add('checker')

            container.appendChild(projectContainer)

            const projectGif:HTMLElement = this.createElement('div', 'project-gif')
            const img: HTMLElement = this.createElement('img','', 'src', element.gif)
            projectGif.appendChild(img)
            projectContainer.appendChild(projectGif)

            const projectInfo:HTMLElement = this.createElement('div', 'project-info')
            projectInfo.textContent = element.name
            projectContainer.appendChild(projectInfo)

            const projectLive:HTMLElement = this.createElement('div', 'project-live')
            const code: HTMLElement = this.createElement('div', 'code')
            code.textContent = 'CODE'
            const live: HTMLElement = this.createElement('div', 'live')
            live.textContent = 'LIVE'
            projectLive.appendChild(code)
            projectLive.appendChild(live)
            projectContainer.appendChild(projectLive)

            const projectUsed:HTMLElement = this.createElement('div', 'project-used')

            for (const spec of element.specification) {

                const specify: HTMLElement = this.createElement('div', 'used')
                specify.textContent = spec
                projectUsed.appendChild(specify)
                
            }

            projectContainer.appendChild(projectUsed)

        }

 

    }

    createElement(which: string, classa?: string, attr?: string, value?: string): HTMLElement {

        const element: HTMLElement = document.createElement(which)

        if(classa) element.classList.add(classa)

        if(attr) element.setAttribute(attr, value)
    
        return element;

    }

    startTouch(e: TouchEvent): void {
        this.initial = e.touches[0].clientX
    }

    moveTouch(e: TouchEvent): void {
        if (!this.initial) return

        const whereNow: number = e.touches[0].clientX

        const howMany: number = this.initial - whereNow

        console.log(howMany);

        if(howMany > 0) {
            this.moveRight()
        } else {
            this.moveLeft()
        }
        this.initial = null
    }

    moveKeyBoard(e: any) {

        switch (e.code) {
            case 'ArrowRight':
                this.moveRight()
                break;
            case 'ArrowLeft':
                this.moveLeft()
                break;
        
            default:
                break;
        }
    }

    move(where: string): void {

        const projectsContainerList: any = document.querySelectorAll('.projects-container')

        const leftFirst: number = parseInt(projectsContainerList[0].style.left, 10)
        
        for (const element of projectsContainerList) {

            const left: number = parseInt(element.style.left, 10)

            if(where === 'left') {

                if(leftFirst === 50) return;
                element.style.left = `${left + 150}%`   
            } else if (where === 'right') {
                if(leftFirst === 50 - ((projectsContainerList.length - 1) * 150)) return;
                element.style.left = `${left - 150}%`  
            }
            
        }

        // this.checkActive()

    }

    moveRight(): void {

        this.checkActive()
        this.move('right')
        

    }

    moveLeft(): void {

        this.checkActive()
        this.move('left')
        
    }

    checkActive(): void {

        setTimeout(() => {

            const checker: HTMLElement = document.querySelector('.checker')

            const leftFirst: number = parseInt(checker.style.left, 10)

            if(leftFirst === 50) {
                this.setActive('arrow-left', false)
                this.setActive('arrow-right', true)
            } else if (leftFirst === -100) {
                this.setActive('arrow-left', true)
                this.setActive('arrow-right', true)
            } else if (leftFirst === -250) {
                this.setActive('arrow-left', true)
                this.setActive('arrow-right', false)
            }
            
        }, 100);

    }

    setActive(what: string, addOrDelete: boolean): void {

        const setActive: HTMLElement = document.querySelector(`.${what}`)

        if(addOrDelete) {
            setActive.classList.add(`${what}-active`)
        } else {
            setActive.classList.remove(`${what}-active`)
        }

        

    }




    
}

export default Projects
