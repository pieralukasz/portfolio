class Home extends HTMLElement {

    // template Navbar 

    template(): string {
        return `

            <div class="home">
                <information-mid class="information-mid"></information-mid>
                <navbar-top class="navbar-top"></navbar-top>
                <photo-up class="photo-up"></photo-up> 
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

export default Home