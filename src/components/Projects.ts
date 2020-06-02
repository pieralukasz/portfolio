class Projects extends HTMLElement {
    // template Projects

    template(): string {
        return `

            <div class="projects">
                <photo-up class="photo-up"></photo-up> 
                <i class="material-icons arrow-right arrow">keyboard_arrow_right</i>
                <i class="material-icons arrow-left arrow">keyboard_arrow_left</i>
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

export default Projects
