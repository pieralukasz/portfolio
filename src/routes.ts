import Home from './components/Home'
import Contact from './components/Contact'
import AboutMe from './components/AboutMe'

const routes = [
    { path: '/', component: Home, nodeN: 'HOME-PAGE' },
    { path: '/contact', component: Contact, nodeN: 'CONTACT-RIGHT' },
    { path: '/about-me', component: AboutMe, nodeN: 'ABOUT-ME' },
]

let used: [any?] = []
let usedComponent: [any?] = []

const startRouter = async () => {
    const path: string = parseLocation()

    const Component: any = findComponent(path, routes)

    document.querySelector(
        '.container-portfolio'
    ).innerHTML = Component.template()

    await Component.connectedCallback()
}

const findComponent = (path: string, routes: any): HTMLElement => {
    for (const route of routes) {
        if (route.path === path) {
            let pass: boolean = false

            if (used.length > 0) {
                for (const [index, iterator] of used.entries()) {
                    if (iterator === route.nodeN) {
                        return usedComponent[index]
                    } else {
                        pass = true
                    }
                }
            } else {
                pass = true
            }

            if (pass) {
                const elementMake = new route.component()
                used.unshift(elementMake.nodeName)
                usedComponent.unshift(elementMake)
                return elementMake
            }
        }
    }
}

const parseLocation = (): string => location.hash.slice(1).toLowerCase() || '/'

export default {
    routes,
    startRouter,
    findComponent,
    parseLocation,
}
