// ===== DOMContentLoaded - انتظار تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بنجاح!');
    
    // ===== تهيئة جميع الوظائف =====
    initMobileMenu();
    initContactForm();
    initFAQ();
    initProductFilter();
    initCart();
    initStatsCounter();
    
    // ===== تحديد الصفحة الحالية في القائمة =====
    highlightCurrentPage();
    
    // ===== تحميل المنتجات في صفحة المتجر =====
    if (document.querySelector('.shop-page')) {
        loadProducts();
    }
});

// ===== 1. القائمة المتنقلة للأجهزة الصغيرة =====
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // تحريك أيقونة القائمة (هامبرغر)
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // إغلاق القائمة عند النقر على رابط
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                // إعادة أيقونة القائمة
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ===== 2. تحديد الصفحة الحالية =====
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== 3. نموذج الاتصال =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم الحقول
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // التحقق من الحقول المطلوبة
            let isValid = true;
            
            if (!name) {
                showError('name-error', 'الرجاء إدخال الاسم');
                isValid = false;
            } else {
                hideError('name-error');
            }
            
            if (!email || !isValidEmail(email)) {
                showError('email-error', 'الرجاء إدخال بريد إلكتروني صحيح');
                isValid = false;
            } else {
                hideError('email-error');
            }
            
            if (!subject) {
                showError('subject-error', 'الرجاء إدخال الموضوع');
                isValid = false;
            } else {
                hideError('subject-error');
            }
            
            if (!message) {
                showError('message-error', 'الرجاء إدخال الرسالة');
                isValid = false;
            } else {
                hideError('message-error');
            }
            
            // إذا كانت البيانات صحيحة
            if (isValid) {
                // هنا يمكن إرسال البيانات إلى الخادم
                // للمثال، سنعرض رسالة نجاح
                alert('شكراً لك! تم إرسال رسالتك بنجاح.\nسنقوم بالرد عليك في أقرب وقت ممكن.');
                
                // إعادة تعيين النموذج
                contactForm.reset();
                
                // الانتقال إلى صفحة الشكر
                setTimeout(() => {
                    window.location.href = 'thankyou.html';
                }, 1000);
            }
        });
    }
}

// دالة للتحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// دالة لعرض رسالة الخطأ
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// دالة لإخفاء رسالة الخطأ
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// ===== 4. الأسئلة الشائعة (FAQ) =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // إغلاق جميع العناصر الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // تبديل العنصر الحالي
            item.classList.toggle('active');
        });
    });
}

// ===== 5. منتجات المتجر =====
// بيانات المنتجات الوهمية
const products = [
    {
        id: 1,
        name: 'لابتوب ديل XPS 13',
        category: 'laptops',
        price: 4599,
        image: '💻',
        description: 'لابتوب ديل XPS 13 بشاشة 13.4 بوصة، معالج i7، 16GB رام، 512GB SSD'
    },
    {
        id: 2,
        name: 'آيفون 14 برو',
        category: 'phones',
        price: 5299,
        image: '📱',
        description: 'آيفون 14 برو بشاشة 6.1 بوصة، كاميرا 48 ميجابكسل، 256GB تخزين'
    },
    {
        id: 3,
        name: 'ساعة أبل واتش',
        category: 'accessories',
        price: 1899,
        image: '⌚',
        description: 'ساعة أبل واتش Series 8 بشاشة أوليد، مقاومة للماء، تتبع الصحة'
    },
    {
        id: 4,
        name: 'لابتوب ماك بوك برو',
        category: 'laptops',
        price: 6899,
        image: '💻',
        description: 'ماك بوك برو بشاشة 14 بوصة، معالج M2 Pro، 16GB رام، 512GB SSD'
    },
    {
        id: 5,
        name: 'سامسونج جالكسي S23',
        category: 'phones',
        price: 3899,
        image: '📱',
        description: 'سامسونج جالكسي S23 بشاشة 6.1 بوصة، كاميرا 50 ميجابكسل، 256GB تخزين'
    },
    {
        id: 6,
        name: 'سماعات سوني WH-1000XM5',
        category: 'accessories',
        price: 1299,
        image: '🎧',
        description: 'سماعات لاسلكية مع إلغاء ضوضاء نشط، بطارية 30 ساعة'
    }
];

// تحميل المنتجات في صفحة المتجر
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    // مسح المحتوى الحالي
    productsGrid.innerHTML = '';
    
    // إضافة كل منتج
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// إنشاء بطاقة منتج
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    card.innerHTML = `
        <div class="product-image">
            ${product.image}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price} ر.س</div>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                <i class="fas fa-cart-plus"></i> أضف إلى السلة
            </button>
        </div>
    `;
    
    return card;
}

// ===== 6. تصفية المنتجات =====
function initProductFilter() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('product-search');
    const searchButton = document.querySelector('.search-box button');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSortProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterAndSortProducts);
    }
    
    if (searchInput && searchButton) {
        // البحث عند النقر على زر البحث
        searchButton.addEventListener('click', () => {
            filterAndSortProducts();
        });
        
        // البحث أثناء الكتابة (بعد تأخير)
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(filterAndSortProducts, 300);
        });
    }
}

// تصفية وترتيب المنتجات
function filterAndSortProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('product-search');
    
    if (!categoryFilter || !sortFilter) return;
    
    const selectedCategory = categoryFilter.value;
    const selectedSort = sortFilter.value;
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    // تصفية المنتجات
    let filteredProducts = products.filter(product => {
        // تصفية حسب الفئة
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
            return false;
        }
        
        // تصفية حسب البحث
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && 
            !product.description.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    // ترتيب المنتجات
    filteredProducts.sort((a, b) => {
        switch (selectedSort) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
                return a.name.localeCompare(b.name, 'ar');
            default:
                return a.id - b.id;
        }
    });
    
    // عرض المنتجات المصفاة
    displayFilteredProducts(filteredProducts);
}

// عرض المنتجات المصفاة
function displayFilteredProducts(filteredProducts) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    // مسح المحتوى الحالي
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>لا توجد منتجات مطابقة للبحث</h3>
                <p>حاول استخدام مصطلحات بحث أخرى</p>
            </div>
        `;
        return;
    }
    
    // إضافة المنتجات المصفاة
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // إعادة إضافة مستمعي الأحداث لأزرار "أضف إلى السلة"
    initAddToCartButtons();
}

// ===== 7. سلة التسوق =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCart() {
    // تحديث عداد السلة
    updateCartCount();
    
    // تهيئة أزرار "أضف إلى السلة"
    initAddToCartButtons();
    
    // تهيئة سلة التسوق الجانبية
    initCartSidebar();
}

// تهيئة أزرار "أضف إلى السلة"
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // التحقق إذا كان المنتج موجوداً بالفعل في السلة
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // حفظ السلة في localStorage
    saveCart();
    
    // تحديث واجهة المستخدم
    updateCartCount();
    updateCartSidebar();
    
    // إشعار للمستخدم
    showNotification(`تمت إضافة ${product.name} إلى السلة`);
}

// حفظ السلة في localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// تحديث عداد السلة
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// عرض إشعار
function showNotification(message) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// إضافة أنماط للتحريك
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// تهيئة سلة التسوق الجانبية
function initCartSidebar() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cartToggle && cartSidebar) {
        // فتح/إغلاق السلة
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.toggle('open');
        });
        
        if (closeCart) {
            closeCart.addEventListener('click', () => {
                cartSidebar.classList.remove('open');
            });
        }
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('سلة التسوق فارغة');
                    return;
                }
                
                alert('سيتم توجيهك إلى صفحة الدفع...');
                // هنا يمكن توجيه المستخدم إلى صفحة الدفع
            });
        }
        
        // تحديث محتويات السلة
        updateCartSidebar();
    }
}

// تحديث محتويات السلة الجانبية
function updateCartSidebar() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartItemsContainer || !cartTotalElement) return;
    
    // مسح المحتوى الحالي
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">سلة التسوق فارغة</p>';
        cartTotalElement.textContent = '0 ر.س';
        return;
    }
    
    // حساب المجموع
    let total = 0;
    
    // إضافة كل عنصر في السلة
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.price} ر.س × ${item.quantity}</div>
            </div>
            <div class="cart-item-total">${itemTotal} ر.س</div>
            <button class="remove-from-cart" data-id="${item.id}">&times;</button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // تحديث المجموع
    cartTotalElement.textContent = `${total} ر.س`;
    
    // إضافة مستمعي الأحداث لأزرار الإزالة
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            removeFromCart(productId);
        });
    });
}

// إزالة منتج من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartSidebar();
    showNotification('تمت إزالة المنتج من السلة');
}

// ===== 8. عداد الإحصائيات =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        // تهيئة المراقبة
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // مراقبة كل عداد
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
}

// بدء العد
function startCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 ثانية
    const increment = target / (duration / 16); // 60fps
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== 9. وظائف مساعدة =====
// إضافة مستمع حدث عند تحميل الصفحة
window.addEventListener('load', function() {
    // إخفاء مؤشر التحميل
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ===== 10. CSS إضافي للعناصر الديناميكية =====
// إضافة أنماط للعناصر التي تنشأ بواسطة JavaScript
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* سلة التسوق الجانبية */
    .cart-sidebar {
        position: fixed;
        top: 0;
        left: -350px;
        width: 350px;
        height: 100vh;
        background-color: white;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: left 0.3s ease;
        display: flex;
        flex-direction: column;
    }
    
    .cart-sidebar.open {
        left: 0;
    }
    
    .cart-header {
        padding: 1.5rem;
        background-color: #1e3c72;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .close-cart {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        line-height: 1;
    }
    
    .cart-items {
        flex: 1;
        padding: 1.5rem;
        overflow-y: auto;
    }
    
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item:last-child {
        border-bottom: none;
    }
    
    .remove-from-cart {
        background: none;
        border: none;
        color: #e74c3c;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
    }
    
    .cart-summary {
        padding: 1.5rem;
        border-top: 1px solid #eee;
    }
    
    .cart-total {
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    
    .cart-toggle {
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 60px;
        height: 60px;
        background-color: #2a5298;
        color: white;
        border-radius: 50%;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .cart-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #e74c3c;
        color: white;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    /* أدوات المتجر */
    .shop-tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .search-box {
        display: flex;
        flex: 1;
        min-width: 300px;
    }
    
    .search-box input {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 1px solid #ddd;
        border-radius: 5px 0 0 5px;
        font-size: 1rem;
    }
    
    .search-box button {
        padding: 0.75rem 1.5rem;
        background-color: #2a5298;
        color: white;
        border: none;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
    }
    
    .filter-controls {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .filter-controls select {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
        min-width: 150px;
    }
    
    /* رسالة عدم وجود منتجات */
    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }
    
    .no-products i {
        font-size: 4rem;
        color: #ddd;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(dynamicStyles);
