document.addEventListener('DOMContentLoaded', function() {
    // Filter dropdown functionality
    const filterButton = document.querySelector('.filter-button');
    const filterDropdown = document.querySelector('.filter-dropdown-content');
    
    if (filterButton && filterDropdown) {
        // Show dropdown on click instead of hover for better mobile experience
        filterButton.addEventListener('click', function(e) {
            e.stopPropagation();
            filterDropdown.style.display = filterDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!filterDropdown.contains(e.target) && e.target !== filterButton) {
                filterDropdown.style.display = 'none';
            }
        });
        
        // Prevent dropdown from closing when clicking inside it
        filterDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Filter tag removal
    const filterTags = document.querySelectorAll('.filter-tag i');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagElement = this.parentElement;
            tagElement.remove();
            
            // If no more tags, hide the active filters section
            const remainingTags = document.querySelectorAll('.filter-tag');
            if (remainingTags.length === 0) {
                document.querySelector('.active-filters').style.display = 'none';
            }
        });
    });
    
    // Clear all filters
    const clearFiltersButton = document.querySelector('.clear-filters');
    
    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', function() {
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => tag.remove());
            document.querySelector('.active-filters').style.display = 'none';
        });
    }
    
    // Apply filters button
    const applyFiltersButton = document.querySelector('.filter-actions .btn');
    
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get selected categories
            const selectedCategories = [];
            document.querySelectorAll('.filter-checkboxes input[type="checkbox"]:checked').forEach(checkbox => {
                selectedCategories.push(checkbox.value);
            });
            
            // Get date range
            const fromDate = document.querySelector('.date-input:first-child input').value;
            const toDate = document.querySelector('.date-input:last-child input').value;
            
            
            // Close the dropdown
            document.querySelector('.filter-dropdown-content').style.display = 'none';
            
            // Show active filters section if it was hidden
            document.querySelector('.active-filters').style.display = 'flex';
            
            // Add filter tags for demonstration
            const filterTagsContainer = document.querySelector('.filter-tags');
            
            // Clear existing tags first
            filterTagsContainer.innerHTML = '';
            
            // Add category tags
            selectedCategories.forEach(category => {
                const categoryName = category.charAt(0).toUpperCase() + category.slice(1) + 's';
                const tagElement = document.createElement('span');
                tagElement.className = 'filter-tag';
                tagElement.innerHTML = `${categoryName} <i class="fas fa-times"></i>`;
                
                // Add click event to remove tag
                tagElement.querySelector('i').addEventListener('click', function() {
                    tagElement.remove();
                    
                    // If no more tags, hide the active filters section
                    const remainingTags = document.querySelectorAll('.filter-tag');
                    if (remainingTags.length === 0) {
                        document.querySelector('.active-filters').style.display = 'none';
                    }
                });
                
                filterTagsContainer.appendChild(tagElement);
            });
            
            // Add date range tag if dates are selected
            if (fromDate || toDate) {
                const dateRangeText = fromDate && toDate ? 
                    `${formatDate(fromDate)} - ${formatDate(toDate)}` : 
                    (fromDate ? `From ${formatDate(fromDate)}` : `Until ${formatDate(toDate)}`);
                
                const tagElement = document.createElement('span');
                tagElement.className = 'filter-tag';
                tagElement.innerHTML = `${dateRangeText} <i class="fas fa-times"></i>`;
                
                // Add click event to remove tag
                tagElement.querySelector('i').addEventListener('click', function() {
                    tagElement.remove();
                    
                    // If no more tags, hide the active filters section
                    const remainingTags = document.querySelectorAll('.filter-tag');
                    if (remainingTags.length === 0) {
                        document.querySelector('.active-filters').style.display = 'none';
                    }
                });
                
                filterTagsContainer.appendChild(tagElement);
            }
        });
    }
    
    // Reset filters button
    const resetFiltersButton = document.querySelector('.filter-actions .btn-outline');
    
    if (resetFiltersButton) {
        resetFiltersButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Uncheck all checkboxes
            document.querySelectorAll('.filter-checkboxes input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Clear date inputs
            document.querySelectorAll('.date-input input').forEach(input => {
                input.value = '';
            });
        });
    }
    
    

    // Next and Previous pagination buttons
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) {
                e.preventDefault();
                return;
            }
            
            // Find the currently active page
            const activePage = document.querySelector('.pagination-numbers a.active');
            const activeIndex = Array.from(paginationLinks).indexOf(activePage);
            
            if (activeIndex > 0) {
                e.preventDefault();
                
                // Click the previous page link
                paginationLinks[activeIndex - 1].click();
                
                // Enable/disable pagination buttons as needed
                if (activeIndex - 1 === 0) {
                    this.classList.add('disabled');
                }
                nextButton.classList.remove('disabled');
            }
        });
        
        nextButton.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) {
                e.preventDefault();
                return;
            }
            
            // Find the currently active page
            const activePage = document.querySelector('.pagination-numbers a.active');
            const activeIndex = Array.from(paginationLinks).indexOf(activePage);
            
            if (activeIndex < paginationLinks.length - 1) {
                e.preventDefault();
                
                // Click the next page link
                paginationLinks[activeIndex + 1].click();
                
                // Enable/disable pagination buttons as needed
                if (activeIndex + 1 === paginationLinks.length - 1) {
                    this.classList.add('disabled');
                }
                prevButton.classList.remove('disabled');
            }
        });
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    // Animate news cards on scroll
    function animateOnScroll() {
        const newsCards = document.querySelectorAll('.news-article-card, .featured-news-main, .secondary-news-item');
        
        newsCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Add initial styles for animation
    const animatedCards = document.querySelectorAll('.news-article-card, .featured-news-main, .secondary-news-item');
    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initialize animation
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});