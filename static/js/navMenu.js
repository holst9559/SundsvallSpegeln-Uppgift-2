export default class NavMenuTrigger {

    constructor() {
        const navButtons = document.querySelectorAll('.dropdown-toggle');

        window.onclick = e => {
            if (!e.target.matches(".dropdown-toggle")) {
               this.closeAll();
            }
        }

        navButtons.forEach(button => {
            button.addEventListener('click', e => {
              
                const isOpen = e.target.classList.contains('selected');

                this.closeAll();
                if (!isOpen) {
                    this.open(e);
                }
            });
        });
    }

    closeAll() {
        const openMenus = document.querySelectorAll('.dropdown-menu');
        const buttons = document.querySelectorAll('.dropdown-toggle');
        openMenus.forEach(menu => {
            menu.classList.remove("show");
        });
        buttons.forEach(button => {
            button.classList.remove("selected");
        });
    }

    open(event) {
        event.target.classList.add('selected');
        const parent = event.target.parentNode;
        const dropdownMenu = parent.querySelector('.dropdown-menu'); 
        dropdownMenu.classList.add('show');
    }
}