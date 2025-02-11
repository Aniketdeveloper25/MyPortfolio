// Create this new file with the mobile menu code
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Mobile Menu Toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.add('active');
});

document.querySelector('.mobile-menu-close').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('active');
}); 