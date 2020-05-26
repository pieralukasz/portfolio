class Contact extends HTMLElement {

    // template Contact 

    template(): string {
        return `

            <div class="contact">
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
        console.log('im hereee!');
    }

}

export default Contact