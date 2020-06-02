class Navbar extends HTMLElement {
    // template Navbar

    template(): string {
        return `
        <div class="navbar-container">
            <ul>
                <a href="#/knowledge-me"><li class="experience">Knowledge</li></a>
                <a href="#/about-me"><li class="about">About me</li></a>
                <a href="#/contact"><li class="contact">Contact</li></a>
                <a href="#/projects-me"><li class="projects">Projects</li></a>
            </ul>
        </div>
        
        `
    }

    constructor() {
        super()
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()
    }
}

export default Navbar
