index.html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Catálogo Web con Carrito</title>
    <!-- Tailwind CSS para diseño moderno -->
    <script src="https://tailwindcss.com"></script>
    <style>
        /* Animación suave para la apertura del carrito lateral */
        .cart-sidebar { transition: transform 0.3s ease-in-out; }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 font-sans">

    <!-- BARRA DE NAVEGACIÓN -->
    <nav class="bg-indigo-600 text-white p-4 shadow-md sticky top-0 z-40">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold cursor-pointer" onclick="showSection('catalog-section')">🛍️ Mi Catálogo</h1>
            <div class="flex items-center space-x-3">
                <button onclick="showSection('catalog-section')" class="px-3 py-1.5 rounded hover:bg-indigo-700 transition">Ver Tienda</button>
                <button onclick="showSection('admin-login-section')" class="bg-indigo-800 px-3 py-1.5 rounded hover:bg-indigo-900 transition text-sm">⚙️ Admin</button>
                <!-- Botón flotante/nav del Carrito -->
                <button onclick="toggleCart(true)" class="bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-lg font-bold flex items-center gap-2 relative transition">
                    🛒 <span id="cart-count-nav">0</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- SECCIÓN 1: CATÁLOGO PÚBLICO -->
    <section id="catalog-section" class="container mx-auto p-4 max-w-6xl">
        <div class="text-center my-6">
            <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Nuestro Catálogo</h2>
            <p class="text-gray-600">Agrega productos al carrito y genera tu pedido unificado para WhatsApp</p>
        </div>
        
        <!-- Grid de Productos -->
        <div id="catalog-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <!-- Cargados dinámicamente -->
        </div>
    </section>

    <!-- CARRITO LATERAL (SIDEBAR) -->
    <div id="cart-sidebar" class="cart-sidebar fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform translate-x-full flex flex-col justify-between border-l">
        <!-- Cabecera Carrito -->
        <div class="p-4 bg-indigo-600 text-white flex justify-between items-center">
            <h3 class="text-lg font-bold">🛒 Tu Pedido</h3>
            <button onclick="toggleCart(false)" class="text-2xl font-bold hover:text-gray-200">&times;</button>
        </div>
        
        <!-- Lista de productos añadidos -->
        <div id="cart-items-container" class="p-4 flex-grow overflow-y-auto space-y-4">
            <!-- Elementos del carrito aquí -->
        </div>

        <!-- Total y Enviar -->
        <div class="p-4 border-t bg-gray-50">
            <div class="flex justify-between items-center mb-4">
                <span class="text-gray-600 font-medium">Total Estimado:</span>
                <span id="cart-total-price" class="text-xl font-extrabold text-indigo-600">$0</span>
            </div>
            <button onclick="sendBulkOrder()" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow">
                💬 Confirmar Pedido por WhatsApp
            </button>
        </div>
    </div>

    <!-- SECCIÓN 2: LOGIN ADMINISTRADOR -->
    <section id="admin-login-section" class="container mx-auto p-4 max-w-md hidden my-12">
        <div class="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h3 class="text-2xl font-bold mb-6 text-center text-gray-900">Ingreso Administrativo</h3>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-1 text-gray-700">Usuario</label>
                <input type="text" id="login-user" class="w-full p-2.5 border rounded-lg focus:ring-indigo-500">
            </div>
            <div class="mb-6">
                <label class="block text-sm font-medium mb-1 text-gray-700">Contraseña</label>
                <input type="password" id="login-pass" class="w-full p-2.5 border rounded-lg focus:ring-indigo-500">
            </div>
            <button onclick="login()" class="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Entrar al Panel</button>
        </div>
    </section>

    <!-- SECCIÓN 3: PANEL DE ADMINISTRACIÓN -->
    <section id="admin-dashboard-section" class="container mx-auto p-4 max-w-4xl hidden">
        <div class="flex justify-between items-center my-6 border-b pb-4">
            <h2 class="text-2xl font-bold text-gray-900">⚙️ Panel de Control</h2>
            <button onclick="logout()" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Salir</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Configuración -->
            <div class="space-y-6">
                <div class="bg-white p-5 rounded-lg shadow border">
                    <h4 class="font-bold text-lg mb-3">📞 Configuración de Destino</h4>
                    <label class="block text-sm font-medium mb-1 text-gray-700">WhatsApp del Negocio</label>
                    <input type="text" id="admin-whatsapp" placeholder="Ej: 573001234567" class="w-full p-2.5 border rounded-lg mb-3">
                    <button onclick="saveWhatsAppNumber()" class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">Guardar Teléfono</button>
                </div>

                <div class="bg-white p-5 rounded-lg shadow border text-center">
                    <h4 class="font-bold text-lg mb-2">💾 Guardar Cambios Permanentes</h4>
                    <p class="text-xs text-gray-500 mb-4">Descarga el archivo HTML actualizado con tu nuevo inventario incrustado.</p>
                    <button onclick="downloadBackup()" class="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition">
                        📥 Descargar Código Web
                    </button>
                </div>
            </div>

            <!-- Formulario Producto -->
            <div class="md:col-span-2 bg-white p-6 rounded-lg shadow border">
                <h4 class="font-bold text-lg mb-4">✨ Agregar Nuevo Producto</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Nombre</label>
                        <input type="text" id="prod-name" class="w-full p-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Precio ($)</label>
                        <input type="number" id="prod-price" class="w-full p-2 border rounded-lg">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Variedades (Separadas por comas)</label>
                    <input type="text" id="prod-variants" placeholder="Ej: S, M, L o Azul, Rojo" class="w-full p-2 border rounded-lg">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">URL de la Foto</label>
                    <input type="text" id="prod-image" placeholder="https://ejemplo.com" class="w-full p-2 border rounded-lg">
                </div>
                <button onclick="addProduct()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Añadir Producto</button>
            </div>
        </div>

        <!-- Tabla Inventario -->
        <div class="bg-white p-6 rounded-lg shadow border mt-8">
            <h4 class="font-bold text-lg mb-4">📦 Inventario Registrado</h4>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-sm border-b">
                            <th class="p-3">Imagen</th>
                            <th class="p-3">Producto</th>
                            <th class="p-3">Precio</th>
                            <th class="p-3">Variedades</th>
                            <th class="p-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="admin-table-body"></tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- SCRIPTS DE OPERACIÓN -->
    <script>
        // Datos semilla por defecto si la base local está vacía
        let products = JSON.parse(localStorage.getItem('catalog_products')) || [
            { id: 1, name: "Camiseta Deportiva", price: 45000, variants: ["Negro", "Blanco"], image: "https://unsplash.com" },
            { id: 2, name: "Gorra Urbana", price: 25000, variants: ["Estándar"], image: "https://unsplash.com" }
        ];
        let whatsappNumber = localStorage.getItem('catalog_whatsapp') || "573001234567";
        let cart = []; // Estructura: { product, variant, quantity }

        if(!localStorage.getItem('catalog_products')) {
            localStorage.setItem('catalog_products', JSON.stringify(products));
        }

        function init() {
            document.getElementById('admin-whatsapp').value = whatsappNumber;
            renderCatalog();
            renderAdminTable();
            updateCartUI();
        }

        function showSection(sectionId) {
            document.getElementById('catalog-section').classList.add('hidden');
            
