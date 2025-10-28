// Gallery JavaScript - Single Consolidated File
// Professional braiding styles with accurate descriptions

// Gallery data with professional descriptions
const galleryData = [
    {
        id: 1,
        image: "assets/gallary/gallery1.jpg",
        title: "Marley Twists",
        description: "Medium to large rope-like twists using Marley-textured hair for a natural, voluminous look. This protective style offers a soft matte finish and is ideal for maintaining natural hair health.",
        category: "box-braids",
        tags: ["Protective", "Voluminous", "Natural Texture"]
    },
    {
        id: 2,
        image: "assets/gallary/gallery2.jpg",
        title: "Goddess Box Braids",
        description: "Box braids with loose, curly ends for a soft and flowing finish. Combines structure with movement, offering a lightweight, versatile look suitable for long wear.",
        category: "box-braids",
        tags: ["Curly Ends", "Knotless Option", "Protective"]
    },
    {
        id: 3,
        image: "assets/gallary/gallery3.jpg",
        title: "Knotless Box Braids",
        description: "A modern variation of classic box braids featuring smooth, knot-free roots created with the feed-in method. Each section is precisely parted into clean squares for a sleek, geometric look. Lightweight and gentle on the scalp, this protective style offers natural movement and long-lasting wear.",
        category: "box-braids",
        tags: ["Knotless", "Square Parts", "Lightweight"]
    },
    {
        id: 4,
        image: "assets/gallary/gallery4.jpg",
        title: "Box-Parted Starter Locs",
        description: "Hair is parted into neat square sections and twisted from root to tip to begin the loc formation process. This foundation style promotes even loc development and clean parting, ideal for starting a loc journey.",
        category: "box-braids",
        tags: ["Starter Locs", "Square Parts", "Loc Journey"]
    },
    {
        id: 5,
        image: "assets/gallary/gallery5.jpg",
        title: "Knotless Box Braids",
        description: "Individual braids started with natural hair and extended using a feed-in technique to avoid knots. The clean square parting offers a lightweight, tension-free finish.",
        category: "box-braids",
        tags: ["Lightweight", "Square Parts", "Protective"]
    },
    {
        id: 6,
        image: "assets/gallary/gallery6.jpg",
        title: "Beaded Cornrows",
        description: "Cornrows braided close to the scalp and adorned with wooden beads for a classic, expressive style. Ideal for cultural expression and gentle protection.",
        category: "cornrows",
        tags: ["Traditional", "Decorative", "Protective"]
    },
    {
        id: 7,
        image: "assets/gallary/gallery7.jpg",
        title: "Medium Marley Twists",
        description: "Two-strand twists with Marley-textured extensions for a full-bodied, natural look. The twists are durable and flexible for daily wear while maintaining scalp comfort.",
        category: "twists",
        tags: ["Twists", "Textured", "Protective"]
    },
    {
        id: 8,
        image: "assets/gallary/gallery8.jpg",
        title: "Cornrows into Puff",
        description: "Cornrows styled toward the crown, ending in a voluminous natural puff. This hybrid look blends defined braids with the beauty of free-textured hair.",
        category: "cornrows",
        tags: ["Updo", "Natural Hair", "Protective"]
    },
    {
        id: 9,
        image: "assets/gallary/gallery9.jpg",
        title: "Marley Twists",
        description: "Chunky two-strand twists using Marley hair, providing a natural, springy texture. A durable and low-maintenance protective style that retains moisture and definition.",
        category: "twists",
        tags: ["Natural Texture", "Protective", "Full Volume"]
    },
    {
        id: 10,
        image: "assets/gallary/gallery10.jpg",
        title: "Feed-In Ponytail Braids",
        description: "Cornrows braided upward into a high ponytail, finished with long curly extensions. Elegant and versatile, this protective style enhances length and volume.",
        category: "cornrows",
        tags: ["Ponytail", "Feed-In", "Glamorous"]
    }
];

// Global variables
let galleryGrid = null;
let modal = null;
let modalImage = null;
let filterButtons = null;
let isModalOpen = false;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

// Initialize gallery functionality
function initializeGallery() {
    // Initialize DOM references
    galleryGrid = document.getElementById('galleryGrid');
    modal = document.getElementById('imageModal');
    modalImage = document.getElementById('modalImage');
    filterButtons = document.querySelectorAll('.filter-btn');
    
    // Reset modal state on page load
    resetModal();
    
    // Render gallery and setup events
    renderGallery(galleryData);
    setupEventListeners();
    
    console.log('Gallery initialized with', galleryData.length, 'professional braiding styles');
}

// Function to render gallery items
function renderGallery(items) {
    if (!galleryGrid || !items) return;
    
    galleryGrid.innerHTML = '';
    
    items.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });
    
    // Add fade-in animation
    galleryGrid.style.opacity = '0';
    setTimeout(() => {
        galleryGrid.style.transition = 'opacity 0.5s ease';
        galleryGrid.style.opacity = '1';
    }, 100);
}

// Function to create individual gallery item
function createGalleryItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';
    itemDiv.dataset.category = item.category;
    
    // Create image element
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.loading = 'lazy';
    
    // Create info section
    const infoDiv = document.createElement('div');
    infoDiv.className = 'gallery-item-info';
    
    const title = document.createElement('h3');
    title.textContent = item.title;
    
    const description = document.createElement('p');
    description.textContent = item.description;
    
    // Create tags
    const tagsContainer = document.createElement('div');
    if (item.tags) {
        item.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'style-tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
    }
    
    // Assemble the elements
    infoDiv.appendChild(title);
    infoDiv.appendChild(description);
    infoDiv.appendChild(tagsContainer);
    
    itemDiv.appendChild(img);
    itemDiv.appendChild(infoDiv);
    
    // Add click event for modal (prevent event bubbling issues)
    itemDiv.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(item.image, item.title);
    });
    
    return itemDiv;
}

// Function to filter gallery items
function filterGallery(category) {
    let filteredData;
    
    if (category === 'all') {
        filteredData = galleryData;
    } else {
        filteredData = galleryData.filter(item => item.category === category);
    }
    
    renderGallery(filteredData);
    updateFilterButtons(category);
}

// Function to update filter button active states
function updateFilterButtons(activeCategory) {
    filterButtons.forEach(button => {
        if (button.dataset.filter === activeCategory) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Function to open modal - FIXED VERSION
function openModal(imageSrc, title) {
    if (!modal || !modalImage || !imageSrc || isModalOpen) return;
    
    // Set flag to prevent multiple opens
    isModalOpen = true;
    
    // Reset any previous state
    resetModal();
    
    // Set up the modal
    modal.style.display = 'block';
    modal.style.opacity = '0';
    modalImage.src = imageSrc;
    modalImage.alt = title || '';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add error handling
    modalImage.onerror = function() {
        console.error('Failed to load image:', imageSrc);
        closeModal();
    };
    
    modalImage.onload = function() {
        // Fade in after image loads
        setTimeout(() => {
            if (modal && isModalOpen) {
                modal.style.transition = 'opacity 0.3s ease';
                modal.style.opacity = '1';
            }
        }, 10);
    };
}

// Function to close modal - FIXED VERSION
function closeModal() {
    if (!modal || !isModalOpen) return;
    
    isModalOpen = false;
    
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        if (modal) {
            modal.style.display = 'none';
            modal.style.transition = '';
            
            // Clear image source
            if (modalImage) {
                modalImage.src = '';
                modalImage.alt = '';
                modalImage.onload = null;
                modalImage.onerror = null;
            }
        }
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }, 300);
}

// Utility function to reset modal state
function resetModal() {
    if (modal) {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.transition = '';
    }
    
    if (modalImage) {
        modalImage.src = '';
        modalImage.alt = '';
        modalImage.onload = null;
        modalImage.onerror = null;
    }
    
    document.body.style.overflow = 'auto';
    isModalOpen = false;
}

// Setup event listeners - IMPROVED VERSION
function setupEventListeners() {
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const category = this.dataset.filter;
            filterGallery(category);
        });
    });
    
    // Modal close button event listener
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }
    
    // Close modal when clicking outside the image (fixed)
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Only close if clicking the modal background, not the image
            if (e.target === modal) {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            e.preventDefault();
            closeModal();
        }
    });
    
    // Prevent modal from closing when clicking the image itself
    if (modalImage) {
        modalImage.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Gallery statistics object (meets project requirement for home grown object)
const GalleryStats = {
    getTotalImages: function() {
        return galleryData.length;
    },
    
    getCategories: function() {
        return [...new Set(galleryData.map(item => item.category))];
    },
    
    getCategoryCount: function(category) {
        return galleryData.filter(item => item.category === category).length;
    },
    
    getRandomImage: function() {
        if (galleryData.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * galleryData.length);
        return galleryData[randomIndex];
    },
    
    getAllTags: function() {
        const allTags = galleryData.flatMap(item => item.tags || []);
        return [...new Set(allTags)];
    },
    
    searchByTitle: function(searchTerm) {
        return galleryData.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },
    
    getStylesByCategory: function() {
        const categories = {};
        galleryData.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });
        return categories;
    },
    
    getProtectiveStyles: function() {
        return galleryData.filter(item => 
            item.tags.some(tag => tag.toLowerCase().includes('protective'))
        );
    }
};

// Associative array for category display names (meets project requirement)
const categoryNames = {
    'all': 'All Styles',
    'box-braids': 'Box Braids & Locs',
    'cornrows': 'Cornrows',
    'twists': 'Twists'
};

// Utility functions
function getCategoryDisplayName(categoryKey) {
    return categoryNames[categoryKey] || categoryKey;
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        background: #ff6b6b;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem;
        text-align: center;
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2000;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Function to shuffle gallery items
function shuffleGallery() {
    const shuffled = [...galleryData].sort(() => Math.random() - 0.5);
    renderGallery(shuffled);
    updateFilterButtons('all');
}

// Export functions for potential use in other files
window.GalleryManager = {
    renderGallery,
    filterGallery,
    shuffleGallery,
    openModal,
    closeModal,
    resetModal,
    GalleryStats,
    galleryData: () => galleryData
};