document.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('js-input-password__toggle-show')) {
        const inputPassword = target.previousElementSibling;
        
        if (inputPassword) {
            const changeToType = inputPassword.getAttribute("type") === 'text' ? 'password' : 'text';
            
            target.classList.toggle('active');
            inputPassword.setAttribute('type', changeToType);
        }
    }
});