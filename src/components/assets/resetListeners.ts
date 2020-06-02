const resetall = () => {

    // const el = document.querySelector('.container-portfolio')
    const elClone = document.body.cloneNode(true)
    document.body.parentNode.replaceChild(elClone, document.body)
}

export default resetall