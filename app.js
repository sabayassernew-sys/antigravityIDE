/**
 * L'ÉLIXIR ROYAL - JavaScript Controller
 * Premium Perfume Interactive Logic
 */

// 1. Data Store for the 3 Luxury Perfumes
const perfumes = [
  {
    id: 0,
    name: "عود السلطان الملكي",
    enName: "ROYAL ARABIAN OUD",
    category: "عطور شرقية ملكية",
    image: "publicimages/oud-sultan.jpg",
    originalPrice: 850,
    offerPrice: 595,
    discountText: "وفر 255 ر.س (خصم 30%)",
    rating: 4.9,
    reviewCount: 194,
    briefDesc: "مزيج ملكي ساحر من العود الكمبودي المعتق، تمازجه نفحات العنبر الأسود، ولمسات دافئة من الزعفران الإيراني الفاخر.",
    fullDesc: "ابتكر هذا العطر الملكي ليعكس الهيبة والفخامة المطلقة في المناسبات الكبرى. تم استخلاص خشب العود من أشجار معمرة تفوق الـ 40 عاماً في غابات كمبوديا، مع لمسات مخملية من دهن العنبر ودفء خشب الأرز والزعفران الملكي.",
    volume: "100 مل - Eau de Parfum",
    origin: "تركيبة حصرية - زيوت نقية 100%",
    longevity: "48+ ساعة ثبات استثنائي",
    sillage: "فوحان قوي يملأ المكان",
    pyramid: {
      top: "الزعفران النقي، حب الهال الأخضر، التوت البري الأسود",
      heart: "العود الكمبودي المعتق، الورد الدمشقي، الجلود الفاخرة",
      base: "العنبر الملكي، خشب الصندل المايسوري، الباتشولي الترابي"
    }
  },
  {
    id: 1,
    name: "أمبر رويال الذهبي",
    enName: "AMBRE ÉTOILÉ",
    category: "عطور عنبرية دافئة",
    image: "publicimages/amber-royal.jpg",
    originalPrice: 680,
    offerPrice: 475,
    discountText: "وفر 205 ر.س (خصم 30%)",
    rating: 4.95,
    reviewCount: 248,
    briefDesc: "سيمفونية شرقية مخملية من العنبر الذهبي، مغلفة بنفحات الفانيليا البوربون، خشب الصندل ولمسة عسلية غامرة.",
    fullDesc: "عطر الدفء والجاذبية الذي يوقظ الحواس. يجمع بين ثراء الكهرمان الذهبي ولمسات العسل الإيطالي الصافي، مع فانيليا جزيرة مدغشقر وبخور اللبان العماني النادر. صُمم ليمنحك إحساساً ملكياً فريداً في الأمسيات الفاخرة.",
    volume: "100 مل - Eau de Parfum",
    origin: "صنع في باريس بزيوت شرقية أصيلة",
    longevity: "36+ ساعة ثبات",
    sillage: "فوحان مخملي آسر وناعم",
    pyramid: {
      top: "البرغموت الصقلي، العسل الملكي، القرفة السيلانية",
      heart: "العنبر الكهرماني، حبوب التونكا، الفانيليا البوربون",
      base: "خشب الصندل، المسك الأبيض، راتنج البنزوين"
    }
  },
  {
    id: 2,
    name: "فلور دي إليزيه",
    enName: "FLEUR D'ELISE",
    category: "عطور زهرية فرنسية فاخرة",
    image: "publicimages/fleur-rose.jpg",
    originalPrice: 540,
    offerPrice: 390,
    discountText: "وفر 150 ر.س (خصم 28%)",
    rating: 5.0,
    reviewCount: 312,
    briefDesc: "توليفة فرنسية رقيقة من الورد الجوري والياسمين البري، مع قاعدة نقية من المسك الأبيض الحريري وقطرات البرغموت.",
    fullDesc: "قصيدة زهرية رومانسية مستوحاة من ربيع باريس وحدائق فرساي. تفتتح بنفحات منعشة من الفواكه الحمراء وأزهار الياسمين النادرة، لتستقر في قاعدة بودرية نقية من المسك الأبيض الفاخر وبتلات الورد المحصودة فجراً.",
    volume: "75 مل - Eau de Parfum Intense",
    origin: "غراس، فرنسا (عاصمة العطور العالمية)",
    longevity: "24+ ساعة ثبات منعش",
    sillage: "فوحان زهري أنيق وجذاب",
    pyramid: {
      top: "البرغموت الإيطالي، اليوسفي، التوت العليق",
      heart: "ورد غراس الجوري، الياسمين الأبيض، براعم البرتقال",
      base: "المسك الحريري، خشب الأرز الأطلسي، العنبر الأبيض"
    }
  }
];

// 2. Shopping Cart State
let cart = [];

// DOM References
const detailsModal = document.getElementById('details-modal');
const detailsModalBox = document.getElementById('details-modal-box');
const modalContent = document.getElementById('modal-content');
const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCounter = document.getElementById('cart-counter');
const cartSubtotal = document.getElementById('cart-subtotal');
const openCartBtn = document.getElementById('open-cart-btn');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastMsg = document.getElementById('toast-msg');

let toastTimeout = null;

// ================= MODAL LOGIC =================
function openDetailsModal(perfumeIndex) {
  const item = perfumes[perfumeIndex];
  if (!item) return;

  modalContent.innerHTML = `
    <!-- Modal Header & Visual Showcase -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border-b border-white/10 pb-6">
      <div class="relative rounded-2xl overflow-hidden bg-stone-950 aspect-square border border-brand-gold/30">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        <span class="absolute top-3 right-3 bg-brand-gold text-brand-noir text-[11px] font-bold px-3 py-1 rounded-full shadow">
          ${item.discountText}
        </span>
      </div>

      <div class="space-y-3">
        <span class="text-xs text-brand-gold font-bold tracking-widest block uppercase">${item.enName}</span>
        <h3 class="text-2xl font-serif font-bold text-white">${item.name}</h3>
        
        <div class="flex items-center gap-2 text-amber-400 text-xs">
          <div class="flex gap-0.5">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <span class="text-stone-300 font-bold">${item.rating} / 5.0</span>
          <span class="text-stone-500">(${item.reviewCount} تقييم)</span>
        </div>

        <p class="text-stone-300 text-xs leading-relaxed pt-1">
          ${item.fullDesc}
        </p>

        <!-- Pricing inside modal -->
        <div class="bg-stone-900/90 rounded-xl p-3 border border-white/5 flex items-center justify-between">
          <div>
            <span class="text-[10px] text-stone-400 block">السعر المخفض:</span>
            <div class="flex items-baseline gap-1">
              <span class="text-2xl font-bold text-brand-goldLight">${item.offerPrice}</span>
              <span class="text-xs text-brand-gold">ر.س</span>
            </div>
          </div>
          <div class="text-left">
            <span class="text-[10px] text-stone-400 block">السعر قبل الخصم:</span>
            <span class="text-xs text-stone-500 line-through">${item.originalPrice} ر.س</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Fragrance Pyramid (الهرم العطري) -->
    <div class="space-y-4">
      <h4 class="text-sm font-bold text-brand-gold font-serif flex items-center gap-2">
        <i class="fa-solid fa-vial-circle-check"></i>
        <span>المكونات والهرم العطري (Fragrance Notes)</span>
      </h4>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div class="bg-stone-900/60 p-3 rounded-xl border border-white/5">
          <span class="text-brand-gold block font-bold mb-1">قمة العطر (Top):</span>
          <p class="text-stone-400 leading-snug">${item.pyramid.top}</p>
        </div>
        <div class="bg-stone-900/60 p-3 rounded-xl border border-white/5">
          <span class="text-brand-goldLight block font-bold mb-1">قلب العطر (Heart):</span>
          <p class="text-stone-400 leading-snug">${item.pyramid.heart}</p>
        </div>
        <div class="bg-stone-900/60 p-3 rounded-xl border border-white/5">
          <span class="text-brand-gold block font-bold mb-1">قاعدة العطر (Base):</span>
          <p class="text-stone-400 leading-snug">${item.pyramid.base}</p>
        </div>
      </div>
    </div>

    <!-- Specifications Table -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
      <div class="bg-stone-900/40 p-2.5 rounded-lg border border-white/5">
        <span class="text-stone-400 block text-[10px]">الحجم والتركيز</span>
        <span class="text-white font-semibold">${item.volume}</span>
      </div>
      <div class="bg-stone-900/40 p-2.5 rounded-lg border border-white/5">
        <span class="text-stone-400 block text-[10px]">الثبات</span>
        <span class="text-white font-semibold">${item.longevity}</span>
      </div>
      <div class="bg-stone-900/40 p-2.5 rounded-lg border border-white/5">
        <span class="text-stone-400 block text-[10px]">الفوحان</span>
        <span class="text-white font-semibold">${item.sillage}</span>
      </div>
      <div class="bg-stone-900/40 p-2.5 rounded-lg border border-white/5">
        <span class="text-stone-400 block text-[10px]">بلد المنشأ</span>
        <span class="text-white font-semibold">${item.origin}</span>
      </div>
    </div>

    <!-- Action Inside Modal -->
    <div class="pt-4 flex gap-3">
      <button 
        onclick="addToCart(${item.id}); closeDetailsModal();" 
        class="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-goldDark to-brand-gold text-brand-noir font-bold text-sm hover:brightness-110 active:scale-95 transition shadow-gold-glow flex items-center justify-center gap-2"
      >
        <i class="fa-solid fa-cart-plus"></i>
        <span>إضافة إلى سلة المشتريات (${item.offerPrice} ر.س)</span>
      </button>
      <button 
        onclick="closeDetailsModal()" 
        class="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-stone-300 text-xs transition"
      >
        إغلاق
      </button>
    </div>
  `;

  detailsModal.classList.remove('hidden');
  setTimeout(() => {
    detailsModal.classList.remove('opacity-0');
    detailsModalBox.classList.remove('scale-95');
    detailsModalBox.classList.add('scale-100');
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeDetailsModal() {
  detailsModalBox.classList.add('scale-95');
  detailsModalBox.classList.remove('scale-100');
  detailsModal.classList.add('opacity-0');
  setTimeout(() => {
    detailsModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 300);
}

// Close modal when clicking outside box
if (detailsModal) {
  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      closeDetailsModal();
    }
  });
}

// Keyboard ESC to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDetailsModal();
    closeCart();
  }
});


// ================= CART DRAWER & LOGIC =================
function addToCart(perfumeIndex) {
  const product = perfumes[perfumeIndex];
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === product.id);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCartUI();
  showToast("تمت الإضافة بنجاح", `تمت إضافة "${product.name}" إلى سلة مشترياتك.`);
}

function updateCartUI() {
  // Update Cart Counter
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounter.textContent = totalItems;

  // Pulse animation on counter
  cartCounter.classList.add('scale-125');
  setTimeout(() => cartCounter.classList.remove('scale-125'), 300);

  // Render Cart Drawer items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center py-16 text-stone-500">
        <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
          <i class="fa-solid fa-bag-shopping text-2xl text-stone-600"></i>
        </div>
        <p class="text-sm font-semibold text-stone-400">سلتك فارغة حالياً</p>
        <p class="text-xs text-stone-500 mt-1">اختر من عطورنا الملكية الفاخرة الآن</p>
      </div>
    `;
    cartSubtotal.textContent = "0 ر.س";
    return;
  }

  let totalAmount = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    const itemTotal = item.offerPrice * item.quantity;
    totalAmount += itemTotal;

    return `
      <div class="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-white/5 group">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-lg object-cover border border-brand-gold/30">
        <div class="flex-1 min-w-0">
          <h5 class="text-xs font-bold text-white truncate">${item.name}</h5>
          <span class="text-[11px] text-brand-gold font-semibold">${item.offerPrice} ر.س</span>
          <div class="flex items-center gap-2 mt-1">
            <button onclick="changeQuantity(${item.id}, -1)" class="w-5 h-5 rounded bg-white/10 hover:bg-brand-gold hover:text-brand-noir text-xs flex items-center justify-center transition">
              -
            </button>
            <span class="text-xs font-bold text-stone-300 w-4 text-center">${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)" class="w-5 h-5 rounded bg-white/10 hover:bg-brand-gold hover:text-brand-noir text-xs flex items-center justify-center transition">
              +
            </button>
          </div>
        </div>
        <div class="text-left flex flex-col justify-between items-end">
          <button onclick="removeFromCart(${item.id})" class="text-stone-500 hover:text-rose-400 text-xs transition mb-2" title="حذف">
            <i class="fa-regular fa-trash-can"></i>
          </button>
          <span class="text-xs font-bold text-brand-goldLight">${itemTotal} ر.س</span>
        </div>
      </div>
    `;
  }).join('');

  cartSubtotal.textContent = `${totalAmount} ر.س`;
}

function changeQuantity(productId, delta) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  showToast("تم الحذف", "تمت إزالة العطر من السلة.");
}

function openCart() {
  cartDrawerOverlay.classList.remove('hidden');
  setTimeout(() => {
    cartDrawerOverlay.classList.remove('opacity-0');
    cartDrawer.classList.remove('-translate-x-full');
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.add('-translate-x-full');
  cartDrawerOverlay.classList.add('opacity-0');
  setTimeout(() => {
    cartDrawerOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 300);
}

if (openCartBtn) {
  openCartBtn.addEventListener('click', openCart);
}

// ================= TOAST NOTIFICATION =================
function showToast(title, message) {
  if (toastTimeout) clearTimeout(toastTimeout);
  
  toastTitle.textContent = title;
  toastMsg.textContent = message;

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  toastTimeout = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3500);
}

// Checkout simulation
function checkoutNotice() {
  if (cart.length === 0) {
    showToast("تنبيه", "سلة المشتريات فارغة!");
    return;
  }
  showToast("طلب ملكي", "شكراً لاختيارك دار L'ÉLIXIR ROYAL! جاري توجيهك لصفحة الدفع الآمن.");
}

// Newsletter subscription simulation
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (input && input.value) {
    showToast("اشتراك ناجح", `تم تسجيل بريدك ${input.value} بنجاح في القائمة الملكية.`);
    input.value = '';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});
