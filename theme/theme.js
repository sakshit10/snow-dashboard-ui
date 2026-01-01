document.addEventListener('DOMContentLoaded', function() {
    
    // ===== THEME TOGGLE =====
    const themeBtn = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (themeBtn) {
        // Check saved theme
        const savedTheme = localStorage.getItem('dashboard-theme');
        
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeBtn.textContent = '☀️';
        } else {
            themeBtn.textContent = '🌙';
        }
        
        // Toggle theme on click
        themeBtn.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                this.textContent = '☀️';
                localStorage.setItem('dashboard-theme', 'dark');
            } else {
                this.textContent = '🌙';
                localStorage.setItem('dashboard-theme', 'light');
            }
            
            // Update charts if needed
            updateChartColors();
        });
    }
    
    // ===== NOTIFICATIONS =====
    const notifyBtn = document.querySelector('.notification-btn');
    const notifyBadge = document.querySelector('.notification-badge');
    
    if (notifyBtn && notifyBadge) {
        notifyBtn.addEventListener('click', function() {
            const count = parseInt(notifyBadge.textContent);
            
            if (count > 0) {
                if (confirm(`You have ${count} new notifications. Mark as read?`)) {
                    notifyBadge.textContent = '0';
                    notifyBadge.style.display = 'none';
                }
            } else {
                alert('No new notifications');
            }
        });
        
        // Simulate new notifications
        setInterval(function() {
            const count = parseInt(notifyBadge.textContent);
            if (count < 5) {
                notifyBadge.textContent = (count + 1).toString();
                notifyBadge.style.display = 'flex';
                
                // Add a little animation
                notifyBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    notifyBtn.style.transform = 'scale(1)';
                }, 200);
            }
        }, 30000); // Every 30 seconds
    }
    
    // ===== SEARCH =====
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        let searchTimer;
        
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimer);
            
            searchTimer = setTimeout(function() {
                const term = e.target.value.trim().toLowerCase();
                
                if (term.length > 2) {
                    // Search functionality
                    console.log('Searching for:', term);
                    
                    // Highlight matching items
                    highlightSearchResults(term);
                } else if (term.length === 0) {
                    clearSearchHighlights();
                }
            }, 500);
        });
        
        // Ctrl+K to focus search
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }
        });
    }
    
    // ===== PAGINATION =====
    const pageButtons = document.querySelectorAll('.pagination-btn');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active') || this.disabled) {
                return;
            }
            
            // Remove active from all
            pageButtons.forEach(b => b.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Get page number
            const pageNum = this.textContent;
            if (!isNaN(pageNum)) {
                goToPage(parseInt(pageNum));
            }
        });
    });
    
    // ===== LIVE STATS =====
    function updateLiveStats() {
        const stats = document.querySelectorAll('.stat-value');
        
        if (stats.length >= 4) {
            // Views
            let views = stats[0].textContent;
            let viewsNum = parseInt(views.replace(/[^0-9]/g, ''));
            viewsNum += Math.floor(Math.random() * 100) - 50;
            if (viewsNum < 700000) viewsNum = 700000;
            stats[0].textContent = Math.floor(viewsNum/1000) + 'K';
            
            // Visits
            let visits = stats[1].textContent;
            let visitsNum = parseInt(visits.replace(/[^0-9]/g, ''));
            visitsNum += Math.floor(Math.random() * 50) - 25;
            if (visitsNum < 350000) visitsNum = 350000;
            stats[1].textContent = Math.floor(visitsNum/1000) + 'K';
        }
    }
    
    // Update every 10 seconds
    setInterval(updateLiveStats, 10000);
    
    // ===== MOBILE MENU =====
    const menuBtn = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuBtn && sidebar && window.innerWidth <= 1200) {
        menuBtn.style.display = 'block';
        
        menuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
    
    // ===== HELPER FUNCTIONS =====
    function highlightSearchResults(term) {
        // Search in cards
        document.querySelectorAll('.stat-card, .activity-item, .contact-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            
            if (text.includes(term)) {
                item.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                item.style.borderLeft = '3px solid #4f46e5';
            }
        });
        
        // Search in table
        const tableRows = document.querySelectorAll('.data-table tbody tr');
        if (tableRows.length > 0) {
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(term)) {
                    row.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                }
            });
        }
    }
    
    function clearSearchHighlights() {
        document.querySelectorAll('.stat-card, .activity-item, .contact-item, .data-table tbody tr').forEach(item => {
            item.style.backgroundColor = '';
            if (!item.classList.contains('data-table')) {
                item.style.borderLeft = '';
            }
        });
    }
    
    function goToPage(page) {
        console.log('Going to page', page);
        
        // Show loading
        const table = document.querySelector('.data-table tbody');
        if (table) {
            table.style.opacity = '0.5';
            
            setTimeout(() => {
                table.style.opacity = '1';
            }, 300);
        }
    }
    
    function updateChartColors() {
        // This updates charts when theme changes
        // Add your chart update logic here
        console.log('Updating chart colors for theme');
    }
    
    // ===== INITIAL ANIMATIONS =====
    setTimeout(() => {
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            card.style.animationDelay = (index * 0.1) + 's';
            card.classList.add('fade-in');
        });
    }, 100);
    
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
    
    .pulse {
        animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);