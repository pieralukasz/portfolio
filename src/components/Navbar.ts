class Navbar extends HTMLElement {

    // template Navbar 

    template(): string {
        return `
        <div class="navbar-container">
            <ul>
                <li class="experience">Knowledge</li>
                <li class="about">About me</li>
                <a href="#/contact"><li class="contact">Contact</li></a>
                <li class="projects">Projects</li>
            </ul>
        </div>
        
        `
    }

    constructor() {
        super();
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()
    }



}

export default Navbar
