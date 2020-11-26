import Router from '../routes'
import axios from 'axios'

class Contact extends HTMLElement {
    // template Contact

    template(): string {
        return `

            <div class="contact">
                <div class="contact-form">
                    <a href="#/"><i class="material-icons back-to-menu">first_page</i></a>
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
                            <label name="message" class="message-label">Message:</label>
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
        super()
    }

    // initial render

    connectedCallback(): void {
        this.innerHTML = this.template()
        this.checkWidthContact()
        window.addEventListener('resize', this.checkWidthContact)

        document.querySelector('.button-container').addEventListener('click', this.sendMessage.bind(this))
    }
    sendMessage() {
        
        const email: HTMLInputElement = document.querySelector('.email-input')
        const message: HTMLInputElement = document.querySelector('.message-input')

        const isEmail: boolean = this.isEmail(email.value)

        if([...email.value].length > 6 && isEmail && [...message.value].length > 6){

            axios.post('https://mailportfolio.herokuapp.com/message', {email: email.value, message: message.value})
            .then(() => document.location.href="/")
            .catch(err => console.log('something goes wrong...'))
            
        } else {
            document.querySelector('.button-container').textContent = 'AGAIN'

            setTimeout(() => {

                document.querySelector('.button-container').textContent = 'SEND'
                
            }, 2000);
        }

    }

    isEmail(email: string): boolean {

        const matcher = /.+\@.+\..+/;

        return matcher.test(email);

    }

    checkWidthContact(): void {
        setTimeout(function () {
            if (Router.parseLocation() === '/contact') {
                const form: HTMLElement = document.querySelector(
                    '.contact-form'
                )
                const headline: HTMLElement = document.querySelector(
                    '.headline'
                )

                if (innerWidth <= 1000) {
                    form.style.width = '90%'
                    headline.style.fontSize = '1.4rem'
                } else {
                    form.style.width = '50%'
                    headline.style.fontSize = '2.1rem'
                }

            }
        }, 100)
    }
}

export default Contact
