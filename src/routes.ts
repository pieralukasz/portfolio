import Home from './components/Home'
import Contact from './components/Contact'
import AboutMe from './components/AboutMe'

const routes = [
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
    { path: '/about-me', component: AboutMe },
]

const startRouter = async () => {
    const path: string = parseLocation()

    const Component: any = findComponent(path, routes)

    await Component.connectedCallback()

    document.querySelector(
        '.container-portfolio'
    ).innerHTML = Component.template()
}

const findComponent = (path: string, routes: any): void => {
    for (const element of routes) {
        if (element.path === path) {
            return new element.component()
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
