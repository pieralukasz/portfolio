class Projects extends HTMLElement {
    // template Projects

    template(): string {
        return `

            <div class="projects">
                <i class="material-icons arrow-right arrow">keyboard_arrow_right</i>
                <i class="material-icons arrow-left arrow">keyboard_arrow_left</i>
                <div class="projects-container">
                    <div class="project-info"></div>
                    <div class="project-gif"></div>
                </div>
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
