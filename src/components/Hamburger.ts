class Hamburger extends HTMLElement {

    // template Navbar 

    template(): string {
        return `

            <div class="hamburger">
                
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

export default Hamburger