import { doc } from 'prettier'

class AboutMe extends HTMLElement {
    // template Navbar

    template(): string {
        return `

            <div class="aboutme">
                <div class="who-am" style="top: 47%;">
                        <div class="who" >Who am I<span class="question-mark">?</span></div>
                </div>
                <div class="information-hello" style="top: 150%">I'm Fullstack Developer</div>
                <i class="material-icons arrow-down">keyboard_arrow_down</i>
            </div>
            <photo-up class="photo-up"></photo-up>
        
        `
    }

    wheel: number

    constructor() {
        super()
        this.wheel = 0
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()
        window.addEventListener('wheel', this.checkScroll.bind(this))
    }

    checkScroll(e?: WheelEvent): void {
        const button: any = document.querySelector('.arrow-down')

        // 1 page

        const whoAm: any = document.querySelector('.who-am')
        const whoAmTop: number = parseInt(whoAm.style.top, 10)

        // 2 page

        const hello: any = document.querySelector('.information-hello')
        const helloTop: number = parseInt(hello.style.top, 10)

        // set button to refresh

        button.addEventListener('click', () => {
            whoAm.style.top = '47%'
            hello.style.top = '150%'
        })

        // set whell

        let whell: number = e.deltaY

        if (whell > 0) {
            // down
            this.wheel++
            whoAm.style.top = whoAmTop - 11 + '%'
            hello.style.top = helloTop - 11 + '%'
        } else if (whell < 0) {
            // up
            this.wheel--
            whoAm.style.top = whoAmTop + 11 + '%'
            hello.style.top = helloTop + 11 + '%'
        }
    }
}

export default AboutMe
