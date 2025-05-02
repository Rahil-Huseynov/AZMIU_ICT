document.addEventListener('DOMContentLoaded', function() {
    // Comment form submission
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const website = document.getElementById('website').value;
            const comment = document.getElementById('comment').value;
            const saveInfo = document.getElementById('saveInfo').checked;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert and add a mock comment
            alert(`Thank you for your comment, ${name}! Your comment will be reviewed and published shortly.`);
            
            // Create a mock comment and add it to the comments list
            const commentsList = document.querySelector('.comments-list');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <div class="comment-avatar">
                    <img src="https://via.placeholder.com/60x60" alt="${name}">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>${name}</h4>
                        <span class="comment-date">Just now</span>
                    </div>
                    <p>${comment}</p>
                    <div class="comment-actions">
                        <a href="#" class="reply-btn">Reply</a>
                    </div>
                </div>
            `;
            
            commentsList.appendChild(newComment);
            
            // Reset form
            commentForm.reset();
            
            // Scroll to the new comment
            newComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    // Reply button functionality
    document.querySelectorAll('.reply-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const commentForm = document.getElementById('commentForm');
            const commentAuthor = this.closest('.comment-content').querySelector('h4').textContent;
            
            // Focus on comment textarea and add @username
            const commentTextarea = document.getElementById('comment');
            commentTextarea.value = `@${commentAuthor} `;
            commentTextarea.focus();
            
            // Scroll to comment form
            commentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Thank you for subscribing with ${email}! You will now receive our newsletter.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Social share buttons
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl;
            
            if (this.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (this.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            } else if (this.classList.contains('linkedin')) {
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
            } else if (this.classList.contains('email')) {
                shareUrl = `mailto:?subject=${title}&body=Check out this article: ${url}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchTerm = this.querySelector('input').value;
            
            // Here you would typically redirect to a search results page
            // For demonstration, we'll just show an alert
            alert(`Searching for: ${searchTerm}`);
        });
    }
    
    // Image lightbox functionality
    const articleImages = document.querySelectorAll('.article-image img, .article-featured-image img');
    
    articleImages.forEach(image => {
        image.addEventListener('click', function() {
            // Create modal for image lightbox
            const modal = document.createElement('div');
            modal.classList.add('image-lightbox');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '9999';
            modal.style.cursor = 'pointer';
            
            // Create zoomed image
            const zoomedImage = document.createElement('img');
            zoomedImage.src = this.src;
            zoomedImage.style.maxWidth = '90%';
            zoomedImage.style.maxHeight = '90%';
            zoomedImage.style.objectFit = 'contain';
            
            // Add close button
            const closeButton = document.createElement('span');
            closeButton.innerHTML = '&times;';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '20px';
            closeButton.style.right = '30px';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '40px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.cursor = 'pointer';
            
            // Append elements to modal
            modal.appendChild(zoomedImage);
            modal.appendChild(closeButton);
            document.body.appendChild(modal);
            
            // Prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
            
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            });
        });
        
        // Add cursor pointer to indicate clickable image
        image.style.cursor = 'pointer';
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.article-content h2, .article-quote, .article-image, .testimonial-box, .article-cta');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Add initial styles for animation
    const animatedElements = document.querySelectorAll('.article-content h2, .article-quote, .article-image, .testimonial-box, .article-cta');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initialize animation
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});