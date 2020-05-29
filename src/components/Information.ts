import Router from '../routes'

class Information extends HTMLElement {
    // template Navbar

    template(): string {
        return `

            <div class="information">      
                <div class="headline">Hello<span class="dot">.</span></div>
                <div class="details">I'm <span class="name">Lucas</span></div>
            </div>
            
        `
    }

    constructor() {
        super()
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()
        this.checkWidthInformation()
        window.addEventListener('resize', this.checkWidthInformation)
    }

    checkWidthInformation() {
        setTimeout(function () {
            if (
                Router.parseLocation() === '/' ||
                Router.parseLocation() === '#/'
            ) {
                const information: HTMLDivElement = document.querySelector(
                    '.information'
                )
                const dot: HTMLDivElement = document.querySelector('.dot')

                if (window.innerWidth < 650) {
                    information.style.left = '50%'
                    information.style.transform = 'translateX(-50%)'
                    information.style.fontSize = '50px'
                    dot.style.fontSize = '120px'
                } else {
                    information.style.left = '10%'
                    information.style.transform = 'translateX(0)'
                    information.style.fontSize = '120px'
                    dot.style.fontSize = '240px'
                }
            }
        }, 100)
    }
}

export default Information
