<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo Premium En Línea</title>
    <style>
        :root {
            --bg-primary: #f8f9fa;
            --surface: #ffffff;
            --text-main: #212529;
            --text-muted: #6c757d;
            --accent: #0b0a0a;
            --accent-hover: #2d2d2d;
            --success: #25d366;
            --danger: #dc3545;
            --border-radius: 16px;
            --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
            --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
            --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: var(--font-stack);
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background-color: var(--bg-primary);
            color: var(--text-main);
            line-height: 1.5;
            padding-bottom: 100px;
        }

        header {
            background: var(--surface);
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: var(--shadow-sm);
            position: sticky;
            top: 0;
            z-index: 10;
        }

        header h1 {
            font-size: 1.4rem;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .btn {
            padding: 12px 20px;
            border-radius: var(--border-radius);
            border: none;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .btn-primary {
            background: var(--accent);
            color: var(--surface);
        }

        .btn-primary:active {
            background: var(--accent-hover);
            transform: scale(0.98);
        }

        .btn-outline {
            background: transparent;
            border: 1.5px solid var(--accent);
            color: var(--accent);
        }

        .btn-outline:active {
            background: rgba(0, 0, 0, 0.05);
        }

        .btn-danger {
            background: var(--danger);
            color: var(--surface);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Rejilla de Productos */
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 16px;
        }

        @media (min-width: 768px) {
            .products-grid {
                grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                gap: 24px;
            }
        }

        .product-card {
            background: var(--surface);
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
            transition: var(--transition);
        }

        .product-card:active {
            transform: scale(0.99);
            box-shadow: var(--shadow-md);
        }

        .product-img-wrapper {
            aspect-ratio: 1 / 1;
            background: #eee;
            position: relative;
            overflow: hidden;
        }

        .product-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .product-info {
            padding: 12px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: space-between;
            gap: 8px;
        }

        .product-title {
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--text-main);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .product-price {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--text-main);
        }

        /* Botón de Carrito Flotante */
        .cart-floater {
            position: fixed;
            bottom: 24px;
            right: 24px;
            left: 24px;
            background: var(--accent);
            color: var(--surface);
            padding: 16px 24px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-md);
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 99;
            cursor: pointer;
            transition: var(--transition);
            transform: translateY(150px);
            opacity: 0;
        }

        .cart-floater.visible {
            transform: translateY(0);
            opacity: 1;
        }

        .cart-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .cart-count {
            background: var(--surface);
            color: var(--accent);
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 0.85rem;
        }

        /* Modales y Paneles */
        .view-panel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            z-index: 100;
            overflow-y: auto;
            display: none;
            padding: 20px;
        }

        .view-panel.active {
            display: block;
        }

        .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            padding-bottom: 12px;
            border-bottom: 1px solid #dee2e6;
        }

        /* Formulario Estético */
        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 8px;
        }

        .form-control {
            width: 100%;
            padding: 14px;
            border: 1.5px solid #dee2e6;
            border-radius: var(--border-radius);
            font-size: 1rem;
            background: var(--surface);
            outline: none;
            transition: var(--transition);
        }

        .form-control:focus {
            border-color: var(--accent);
        }

        .section-card {
            background: var(--surface);
            border-radius: var(--border-radius);
            padding: 20px;
            margin-bottom: 24px;
            box-shadow: var(--shadow-sm);
        }

        .section-card h3 {
            margin-bottom: 16px;
            font-size: 1.1rem;
            border-left: 4px solid var(--accent);
            padding-left: 8px;
        }

        /* Lista CRUD */
        .crud-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
        }

        .crud-item img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 8px;
        }

        .crud-info {
            flex-grow: 1;
            padding: 0 12px;
        }

        .crud-actions {
            display: flex;
            gap: 8px;
        }
    </style>
</head>
<body>

    <!-- Vista Cliente -->
    <header>
        <h1>Premium Shop</h1>
        <button class="btn btn-outline" onclick="openLogin()">Acceso Admin</button>
    </header>

    <main class="container">
        <div class="products-grid" id="catalog-container">
            <!-- Inyección dinámica de productos -->
        </div>
    </main>

    <!-- Carrito Flotante -->
    <div class="cart-floater" id="cart-floater" onclick="sendWhatsAppOrder()">
        <div class="cart-info">
            <span class="cart-count" id="cart-badge">0</span>
            <span style="font-weight: 600;">Ver pedido</span>
        </div>
        <div id="cart-total" style="font-weight: 700; font-size: 1.1rem;">$0.00</div>
    </div>

    <!-- Panel de Login -->
    <div class="view-panel" id="login-panel">
        <div class="panel-header">
            <h2>Acceso Administrativo</h2>
            <button class="btn btn-outline" onclick="closePanel('login-panel')">Cerrar</button>
        </div>
        <div class="section-card" style="max-width: 450px; margin: 40px auto;">
            <div class="form-group">
                <label>Usuario</label>
                <input type="text" id="login-user" class="form-control" placeholder="admin">
            </div>
            <div class="form-group">
                <label>Contraseña</label>
                <input type="password" id="login-pass" class="form-control" placeholder="1234">
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="handleLogin()">Ingresar</button>
        </div>
    </div>

    <!-- Panel de Administración -->
    <div class="view-panel" id="admin-panel">
        <div class="panel-header">
            <h2>Panel de Control</h2>
            <button class="btn btn-outline" onclick="closePanel('admin-panel')">Salir</button>
        </div>
        <div class="container" style="padding: 0; max-width: 800px;">
            
            <!-- SECCIÓN A: Configuración de GitHub Cloud -->
            <div class="section-card">
                <h3>A) Configuración de GitHub Cloud</h3>
                <div class="form-group">
