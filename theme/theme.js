// Theme Toggle with jQuery - Working Version
$(document).ready(function() {
    
    // Check if dark mode was previously set
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        $('body').addClass('dark-mode');
        $('.theme-toggle').text('☀️');
    } else {
        $('.theme-toggle').text('🌙');
    }
    
    // Theme toggle button click
    $('.theme-toggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        
        const isDark = $('body').hasClass('dark-mode');
        
        // Update button icon
        if (isDark) {
            $(this).text('☀️');
            localStorage.setItem('theme', 'dark');
        } else {
            $(this).text('🌙');
            localStorage.setItem('theme', 'light');
        }
        
        // Update charts if they exist
        if (typeof updateChartColors === 'function') {
            updateChartColors(isDark);
        }
    });
    
    // Mobile menu toggle
    $('.menu-toggle').on('click', function() {
        $('.sidebar').toggleClass('active');
    });
    
    // Close sidebar when clicking outside on mobile
    $(document).on('click', function(e) {
        if ($(window).width() <= 1024) {
            if (!$(e.target).closest('.sidebar, .menu-toggle').length) {
                $('.sidebar').removeClass('active');
            }
        }
    });
    
    // Pagination functionality
    $('.page-btn').on('click', function() {
        if (!$(this).text().match(/[←→]/)) {
            $('.page-btn').removeClass('active');
            $(this).addClass('active');
        }
    });
    
});