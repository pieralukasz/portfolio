import '../assets/CVŁukaszPiera.pdf'

interface Page {
    name: HTMLElement
    top: number
}

class AboutMe extends HTMLElement {
    // template AboutMe

    template(): string {
        return `

            <div class="aboutme">
                <! –– Congratulations, you found easter Egg, enjoy! ––>
                <div class="easter-egg" style="top: -250%"><div class="play">play</div></div>
                <div class="who-am" style="top: 50%;">
                    Who am I<span class="question-mark">?</span><br>         
                </div>
                <div class="information-hello" style="top: 200%">Łukasz Piera<br>Aspiring Developer</div>
                <div class="information-more" style="top: 350%">
                    I am a student at the Lodz University of Technology in Poland.
                </div>
                <div class="hire-me" style="top: 500%">
                    In the future I dream about living in the <span class="blue-text">United States</span> or on <span class="red-text">Mars</span>.
                </div>
                <div class="cv-download" style="top: 650%">My CV
                    <div class="polish"><a href="assets/CVŁukaszPiera.pdf" download="CVŁukaszPiera.pdf">
                        <span class="red-text">POLISH</span>
                    </a></div>
                    <div class="english"><a href="assets/CVŁukaszPiera.pdf" download="CVŁukaszPiera.pdf">
                        <span class="blue-text">ENGLISH</span>
                    </a></div>
                </div>
                <i class="material-icons arrow-up">keyboard_arrow_up</i>
                <i class="material-icons arrow-down">keyboard_arrow_down</i>
                <a href="#/"><i class="material-icons arrow-right rainbow">home</i></a>
            </div>
            <photo-up class="photo-up"></photo-up>
        
        `
    }

    public initial: null | number
    private percentage: number
    private containerElement: [Page?]
    private pass: boolean
    private interval: number
    private counterInitial: number
    private counter2: number

    constructor() {
        super()
        this.initial = null
        this.containerElement = []
        this.percentage = 150

        // whell stop

        this.pass = true
        this.interval = 220
        this.counterInitial = 0
        this.counter2 = null
        
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()

        setTimeout(() => {
            this.checkWidthAll()
            this.getAllElements()
            this.checkActiveArrow()
        }, 100)

        document.body.addEventListener('resize', this.checkWidthAll.bind(this))
        document.body.addEventListener('wheel', this.checkScrollMouse.bind(this), { passive: false })
        document.body.addEventListener('touchstart', this.startTouch.bind(this))
        document.body.addEventListener('touchmove', this.moveTouch.bind(this))

        this.getPage('arrow-down').name.addEventListener('click', this.pageDown.bind(this))
        this.getPage('arrow-up').name.addEventListener('click', this.pageUp.bind(this))
    }

    checkScrollMouse(e: any | TouchEvent): void {
        if (e) e.preventDefault()

        let whell: number = e.deltaY

        let percentage: number = this.percentage

        const containerElement: [Page?] = (this.containerElement = this.getAllElements())

        // set whell

        if (whell > 0) {
            if (this.getPage('cv-download').top >= 55) {
                this.counterInitial++
                if (this.pass) {
                    this.startWheel()
                    this.moveDown(containerElement, percentage)
                }
            }
        } else if (whell < 0) {
            if (this.getPage('easter-egg').top <= 45) {
                this.counterInitial++
                if (this.pass) {
                    this.startWheel()
                    this.moveUp(containerElement, percentage)
                }
            }
        }
    }

    // Wheel STOP

    startWheel(): void {
        this.pass = false
        this.counter2 = this.counterInitial
        setTimeout(() => {
            if (this.counter2 == this.counterInitial) {
                this.endWheel()
            } else {
                this.startWheel()
            }
        }, this.interval)
    }

    endWheel(): void {
        this.pass = true
        this.counterInitial = 0
        this.counter2 = null
    }

    // Touch move event operatons

    startTouch(e: TouchEvent): void {
        this.initial = e.touches[0].clientY
    }

    moveTouch(e: TouchEvent): void {
        if (!this.initial) return

        const whereNow: number = e.touches[0].clientY

        const howMany: number = this.initial - whereNow

        const movePercentage: number = this.percentage

        this.getAllElements()

        if (howMany > 0) {
            // UP
            if (this.getPage('easter-egg').top <= 45) {
                this.moveUp(this.containerElement, movePercentage)
            } else {
                this.setActive(this.getPage('play'), true, 5000)
            }
        } else {
            // DOWN
            if (this.getPage('cv-download').top >= 55) {
                this.moveDown(this.containerElement, movePercentage)
            }
        }

        this.initial = null
    }

    // get object Page

    getPage(cssClass: string): Page {
        const name: HTMLElement = document.querySelector(`.${cssClass}`)
        const top: number = parseInt(name.style.top, 10)

        const page: Page = {
            name,
            top,
        }

        return page
    }

    pageDown() {
        const containerElement: [Page?] = this.getAllElements()

        if (this.getPage('cv-download').top >= 55) {
            this.moveDown(containerElement, 150)
        }
    }

    pageUp() {
        const containerElement: [Page?] = this.getAllElements()
        if (this.getPage('easter-egg').top <= 50) {
            this.moveUp(containerElement, 150)
        }
    }

    moveDown(
        elementsArray: [Page?],
        howMany: number,
        percentage: string = '%'
    ): void {
        for (const element of elementsArray) {
            element.name.style.top = element.top - howMany + percentage
        }

        this.checkActiveArrow()
    }

    moveUp(
        elementsArray: [Page?],
        howMany: number,
        percentage: string = '%'
    ): void {
        for (const element of elementsArray) {
            element.name.style.top = element.top + howMany + percentage
        }

        this.checkActiveArrow()
    }

    checkActiveArrow() {
        if (this.getPage('who-am').top <= -100) {
            this.getPage('arrow-up').name.classList.add('arrow-up-active')
        } else {
            this.getPage('arrow-up').name.classList.remove('arrow-up-active')
        }

        if (this.getPage('cv-download').top === 50) {
            this.getPage('arrow-down').name.classList.remove('arrow-down-active')
        } else {
            this.getPage('arrow-down').name.classList.add('arrow-down-active')
        }
    }

    // set active class

    setActive(element: Page, setTimeToRemove: boolean, seconds?: number): void {
        if (setTimeToRemove) {
            element.name.classList.add(`${element.name.classList[0]}-active`)

            setTimeout(() => {
                element.name.classList.remove(
                    `${element.name.classList[0]}-active`
                )
            }, seconds)
        } else {
            if (element.top > 100 && element.top < 0) {
                element.name.classList.add(
                    `${element.name.classList[0]}-active`
                )
            } else {
                element.name.classList.remove(
                    `${element.name.classList[0]}-active`
                )
            }
        }
    }

    // check Width only one element

    checkWidthElement(element: Page, size: number): void {
        if (window.innerWidth < 320) {
            element.name.style.fontSize = size - 1 + 'rem'
        } else if (window.innerWidth >= 320 && window.innerWidth <= 640) {
            element.name.style.fontSize = size + 'rem'
        } else if (window.innerWidth > 640 && window.innerWidth <= 980) {
            element.name.style.fontSize = size + 2 + 'rem'
        } else {
            element.name.style.fontSize = size + 4 + 'rem'
        }
    }

    checkWidthAll(): void {
        const wholePercentage: number = 2

        this.checkWidthElement(this.getPage('who-am'), 7)
        this.checkWidthElement(
            this.getPage('information-hello'),
            wholePercentage
        )
        this.checkWidthElement(
            this.getPage('information-more'),
            wholePercentage
        )
        this.checkWidthElement(this.getPage('hire-me'), wholePercentage)
        this.checkWidthElement(this.getPage('cv-download'), wholePercentage)
    }

    getAllElements(): [Page?] {
        const containerElement: [Page?] = []

        // easter egg
        const easter: Page = this.getPage('easter-egg')
        containerElement.push(easter)

        // 1 page
        const whoAm: Page = this.getPage('who-am')
        containerElement.push(whoAm)

        // 2 page
        const hello: Page = this.getPage('information-hello')
        containerElement.push(hello)

        // 3 pageownload by click my CV!
        const moreInformation: Page = this.getPage('information-more')
        containerElement.push(moreInformation)

        // 4 page
        const hireMe: Page = this.getPage('hire-me')
        containerElement.push(hireMe)

        const cvPDF: Page = this.getPage('cv-download')
        containerElement.push(cvPDF)

        this.containerElement = containerElement

        return containerElement
    }
}

export default AboutMe
