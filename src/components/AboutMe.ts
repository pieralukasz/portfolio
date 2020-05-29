import { throws } from "assert"

interface Page {
    name: HTMLElement,
    top: number
}


class AboutMe extends HTMLElement {

    // template AboutMe

    template(): string {
        return `

            <div class="aboutme">
                <! –– Congratulations, you found easter Egg, enjoy! ––>
                <div class="easter-egg" style="top: -250%"><div class="play">play</div></div>
                <div class="who-am" style="top: 50%;">Who am I<span class="question-mark">?</span> </div>
                <div class="information-hello" style="top: 150%">Łukasz Piera<br>Fullstack Developer</div>
                <div class="itsme" style="top: 50%"></div>
                <div class="information-more" style="top: 250%">I am a student at the Lodz University of Technology</div>
                <a href="#/contact"><div class="hire-me rainbow" style="top: 350%">Want to hire me?</div></a>
                <i class="material-icons arrow-down">keyboard_arrow_down</i>
            </div>
            <photo-up class="photo-up"></photo-up>
        
        `
    }

    public initial: null | number
    private containerElement: [Page?]

    constructor() {
        super()
        this.initial = null
        this.containerElement = []
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()

        setTimeout(() => {
            this.checkWidthAll(),
            this.checkScrollMouse(0)
        }, 100);

        window.addEventListener('resize', this.checkWidthAll)
        window.addEventListener('wheel', this.checkScrollMouse.bind(this))
        window.addEventListener('touchstart', this.startTouch.bind(this))
        window.addEventListener('touchmove', this.moveTouch.bind(this))
    }

    checkScrollMouse(e?: any | TouchEvent): void {

        const containerElement: [Page?] = []

        // move button
        const button: Page = this.getPage('arrow-down')
        
        // easter egg
        const easter: Page = this.getPage('easter-egg')
        containerElement.push(easter)

        // 1 page
        const whoAm: Page = this.getPage('who-am')
        containerElement.push(whoAm)

        // 2 page
        const hello: Page = this.getPage('information-hello')
        containerElement.push(hello)

        // 3 page
        const moreInformation: Page = this.getPage('information-more')
        containerElement.push(moreInformation)

        // 4 page
        const hireMe: Page = this.getPage('hire-me')
        containerElement.push(hireMe)

        this.containerElement = containerElement

        // set button to refresh

        function setNormal(): void {
            easter.name.style.top = '-250%'
            whoAm.name.style.top = '50%'
            hello.name.style.top = '150%'        
            moreInformation.name.style.top = '250%'
            hireMe.name.style.top = "350%"
        }

        button.name.addEventListener('click', setNormal)

        // set whell

        let whell: number = e.deltaY       

        let percentage: number = 5


        if (whell > 0) {

            this.moveDown(containerElement, percentage)

        } else if (whell < 0) {
            if(easter.top <= 50) { 
                this.moveUp(containerElement, percentage)
            } 
            else {
                this.setActive(this.getPage('play'), true, 5000)
            }
        }

        // this.setActive(this.getPage('itsme'), true, 5000)
        this.setActive(hello, false)
        this.setActive(moreInformation, false)

    }

    startTouch(e: TouchEvent): void {
        this.initial = e.touches[0].clientY   
    }

    moveTouch(e: TouchEvent): void {

        if(!this.initial) return;

        const whereNow: number = e.touches[0].clientY;

        const howMany: number = this.initial - whereNow

        const movePercentage: number = 35

        this.checkScrollMouse(0)


        if(howMany > 0) {

            // UP
            if(this.getPage('easter-egg').top <= 50) { 
                this.moveUp(this.containerElement, movePercentage)
            } 
            else {
                this.setActive(this.getPage('play'), true, 5000)
            }
            

        } else {

            // DOWN
            this.moveDown(this.containerElement, movePercentage)

        }

        this.initial = null
    }


    getPage(cssClass: string): Page {

        const name: HTMLElement = document.querySelector(`.${cssClass}`)
        const top: number =  parseInt(name.style.top, 10)


        const page: Page = {
            name,
            top
        }

        return page

    }

    moveDown(elementsArray: [Page?], howMany: number, percentage: string = '%'): void {

        for (const element of elementsArray) {
            element.name.style.top = element.top - howMany + percentage

        }


    }

    moveUp(elementsArray: [Page?], howMany: number, percentage: string = '%'): void {

        for (const element of elementsArray) {

            element.name.style.top = element.top + howMany + percentage
        }

    }

    setActive(element: Page, setTimeToRemove: boolean, seconds?: number ): void {

        if (setTimeToRemove) {
            element.name.classList.add(`${element.name.classList[0]}-active`)

            setTimeout(() => {
                element.name.classList.remove(`${element.name.classList[0]}-active`)
            }, seconds);

        } else {

            if(element.top <= 80 && element.top >= 5) {
                element.name.classList.add(`${element.name.classList[0]}-active`)
    
            } 
            else {
                element.name.classList.remove(`${element.name.classList[0]}-active`)
            }
        }


    }

    checkWidthElement(element: Page, size: number): void {
        if(window.innerWidth >= 320 && window.innerWidth <= 640) {
            element.name.style.fontSize = size + 'rem'
        } else if (window.innerWidth > 640 && window.innerWidth <= 980){
            element.name.style.fontSize = (size + 2) + 'rem'
        } else {
            element.name.style.fontSize = '250px'
        }

    }

    checkWidthAll(): void {
        this.checkWidthElement(this.getPage('who-am'), 7)
        this.checkWidthElement(this.getPage('information-hello'), 3)
        this.checkWidthElement(this.getPage('information-more'), 3)
        this.checkWidthElement(this.getPage('hire-me'), 3)
    }

}

export default AboutMe
