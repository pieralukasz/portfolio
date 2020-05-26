import './styles/style.scss';
import '@webcomponents/custom-elements/custom-elements.min';

// router

import Router from './routes/index'

 // components Main

import Home from './components/Home'
import Contact from './components/Contact'

// Main Kids

import Navbar from './components/Navbar'
import Photo from './components/Photo'
import Hamburger from './components/Hamburger'
import Information from './components/Information'





window.addEventListener('DOMContentLoaded', (): void => {

    customElements.define('navbar-top', Navbar)
    customElements.define('photo-up', Photo)
    customElements.define('hamburger-menu', Hamburger)
    customElements.define('information-mid', Information)
    customElements.define('contact-right', Contact)
    customElements.define('home-page', Home)

});

window.addEventListener('hashchange', Router.startRouter);
window.addEventListener('load', Router.startRouter);



