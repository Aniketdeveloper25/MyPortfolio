function toggleMenu() {
    const menuItems = document.getElementById('menuItems');
    const currentDisplay = menuItems.style.display;
    menuItems.style.display = currentDisplay === 'none' ? 'flex' : 'none';
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menuItems = document.getElementById('menuItems');
    const menuButton = document.querySelector('.menu-btn');
    
    if (!event.target.closest('.nav-menu')) {
        menuItems.style.display = 'none';
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.getElementById('menuItems').style.display = 'none';
    }
});
