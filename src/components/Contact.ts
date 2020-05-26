class Contact extends HTMLElement {

    // template Contact 

    template(): string {
        return `

            <div class="contact">
                <photo-up class="photo-up"></photo-up>
                <div class="contact-form">
                    <a href="#/"><i class="material-icons">first_page</i></a>
                    <span></span>
                    <span></span>
                    <div class="headline">Send Me a Message!</div>
                    <form>
                        <div class="email">
                            <input class="email-input" type="email" name="email">
                            <label name="email">Email:</label>
                        </div>
                        <div class="message">
                            <textarea class="message-input" type="text" name="message"></textarea>
                            <label name="message">Message:</label>
                        </div>
                        <div class="button-container">
                            <span></span>
                            <span></span>
                            Send
                        </div>
                    </form>
                </div>
            </div>
        
        `
    }

    constructor() {
        super();
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()
        this.checkWidthContact()
        window.addEventListener('resize', this.checkWidthContact)
    }

    checkWidthContact() {

        setTimeout(function() {

            const form: HTMLElement = document.querySelector('.contact-form')
            const headline: HTMLElement = document.querySelector('.headline')
    
            if(innerWidth <= 1000) {
                form.style.width = "90%"
                headline.style.fontSize = "1.4rem"
            } else {
                form.style.width = "50%"
                headline.style.fontSize = "2.1rem"
            }
        }, 100)

    }

}

export default Contact