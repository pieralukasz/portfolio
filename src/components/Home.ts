import axios from 'axios'

class Home extends HTMLElement {
    // template Navbar

    template(): string {
        return `

            <div class="home">
                <information-mid class="information-mid"></information-mid>
                <navbar-top class="navbar-top"></navbar-top>
            </div>
        
        `
    }

    constructor() {
        super()
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()
        
        axios.get('https://mailportfolio.herokuapp.com')
        .then(() => console.log('ok'))

    }
}

export default Home
