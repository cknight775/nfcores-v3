# ============================================================================
# setup-nfcores-structure.ps1
# Script para crear la estructura completa de carpetas de NFCores
# Autor: @cknight775
# Fecha: 2025-01-22
# Versión: 1.0.0
# ============================================================================

# Configuración de colores
$Host.UI.RawUI.ForegroundColor = "White"

# Función para escribir con color
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Banner
Clear-Host
Write-ColorOutput "╔════════════════════════════════════════════════════════════╗" "Cyan"
Write-ColorOutput "║                                                            ║" "Cyan"
Write-ColorOutput "║          🚀 NFCORES - Setup de Estructura 🚀               ║" "Cyan"
Write-ColorOutput "║                                                            ║" "Cyan"
Write-ColorOutput "║          Creando estructura completa de carpetas           ║" "Cyan"
Write-ColorOutput "║                                                            ║" "Cyan"
Write-ColorOutput "╚════════════════════════════════════════════════════════════╝" "Cyan"
Write-Host ""

# Verificar ubicación actual
$currentPath = Get-Location
Write-ColorOutput "📂 Ubicación actual: $currentPath" "Yellow"
Write-Host ""

# Confirmar continuación
$confirmation = Read-Host "¿Deseas crear la estructura en esta ubicación? (S/N)"
if ($confirmation -ne "S" -and $confirmation -ne "s") {
    Write-ColorOutput "❌ Operación cancelada por el usuario" "Red"
    exit 0
}

Write-Host ""
Write-ColorOutput "⏳ Iniciando creación de estructura..." "Cyan"
Write-Host ""

# ============================================================================
# PARTE 1: CREAR CARPETAS PRINCIPALES
# ============================================================================

Write-ColorOutput "📁 [1/6] Creando carpetas principales..." "Cyan"

$mainFolders = @(
    ".github\workflows",
    "docs\api",
    "docs\deployment",
    "docs\architecture",
    "public\images",
    "public\fonts"
)

$created = 0
foreach ($folder in $mainFolders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-ColorOutput "  ✅ Creado: $folder" "Green"
        $created++
    } else {
        Write-ColorOutput "  ⏭️  Ya existe: $folder" "Yellow"
    }
}
Write-ColorOutput "  📊 Carpetas principales creadas: $created" "White"
Write-Host ""

# ============================================================================
# PARTE 2: CREAR ESTRUCTURA DE CLOUD FUNCTIONS
# ============================================================================

Write-ColorOutput "📁 [2/6] Creando estructura de Cloud Functions..." "Cyan"

$functionsFolders = @(
    "functions\src",
    "functions\src\webhooks",
    "functions\src\generators",
    "functions\src\notifications",
    "functions\src\triggers",
    "functions\src\scheduled",
    "functions\src\utils",
    "functions\src\types"
)

$created = 0
foreach ($folder in $functionsFolders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-ColorOutput "  ✅ Creado: $folder" "Green"
        $created++
    } else {
        Write-ColorOutput "  ⏭️  Ya existe: $folder" "Yellow"
    }
}
Write-ColorOutput "  📊 Carpetas de functions creadas: $created" "White"
Write-Host ""

# ============================================================================
# PARTE 3: CREAR ESTRUCTURA DE SRC/
# ============================================================================

Write-ColorOutput "📁 [3/6] Creando estructura de src/..." "Cyan"

$srcFolders = @(
    "src\components",
    "src\pages",
    "src\services",
    "src\hooks",
    "src\context",
    "src\types",
    "src\utils",
    "src\config",
    "src\styles",
    "src\tests"
)

$created = 0
foreach ($folder in $srcFolders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-ColorOutput "  ✅ Creado: $folder" "Green"
        $created++
    } else {
        Write-ColorOutput "  ⏭️  Ya existe: $folder" "Yellow"
    }
}
Write-ColorOutput "  📊 Carpetas base de src creadas: $created" "White"
Write-Host ""

# ============================================================================
# PARTE 4: CREAR ESTRUCTURA DE COMPONENTS/
# ============================================================================

Write-ColorOutput "📁 [4/6] Creando estructura de components/..." "Cyan"

$componentsFolders = @(
    "src\components\admin",
    "src\components\admin\Dashboard",
    "src\components\admin\Users",
    "src\components\admin\WebIDs",
    "src\components\admin\Panels",
    "src\components\admin\Orders",
    "src\components\admin\Support",
    "src\components\admin\Content",
    "src\components\auth",
    "src\components\dashboard",
    "src\components\family",
    "src\components\enterprise",
    "src\components\profile",
    "src\components\emergency",
    "src\components\checkout",
    "src\components\guards",
    "src\components\layout",
    "src\components\shared",
    "src\components\ui"
)

$created = 0
foreach ($folder in $componentsFolders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-ColorOutput "  ✅ Creado: $folder" "Green"
        $created++
    } else {
        Write-ColorOutput "  ⏭️  Ya existe: $folder" "Yellow"
    }
}
Write-ColorOutput "  📊 Carpetas de components creadas: $created" "White"
Write-Host ""

# ============================================================================
# PARTE 5: CREAR ESTRUCTURA DE PAGES/ Y SERVICES/
# ============================================================================

Write-ColorOutput "📁 [5/6] Creando estructura de pages/ y services/..." "Cyan"

$pagesAndServicesFolders = @(
    # Pages
    "src\pages\admin",
    "src\pages\admin\content",
    "src\pages\auth",
    "src\pages\dashboard",
    "src\pages\public",
    
    # Services
    "src\services\admin",
    "src\services\analytics",
    "src\services\firestore",
    "src\services\payment",
    "src\services\shipping",
    "src\services\storage"
)

$created = 0
foreach ($folder in $pagesAndServicesFolders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-ColorOutput "  ✅ Creado: $folder" "Green"
        $created++
    } else {
        Write-ColorOutput "  ⏭️  Ya existe: $folder" "Yellow"
    }
}
Write-ColorOutput "  📊 Carpetas de pages y services creadas: $created" "White"
Write-Host ""

# ============================================================================
# PARTE 6: CREAR ARCHIVOS DE DOCUMENTACIÓN (.github)
# ============================================================================

Write-ColorOutput "📁 [6/6] Creando archivos de documentación en .github/..." "Cyan"

$documentationFiles = @(
    ".github\copilot-instructions.md",
    ".github\tech-stack.md",
    ".github\user-roles.md",
    ".github\emergency-profile-design.md",
    ".github\project-status.md",
    ".github\routes-architecture.md",
    ".github\database-schema.md",
    ".github\folder-structure.md",
    ".github\user-flows-complete.md",
    ".github\api-integrations.md",
    ".github\admin-manageable-elements.md",
    ".github\testing-guidelines.md"
)

$created = 0
foreach ($file in $documentationFiles) {
    if (-not (Test-Path $file)) {
        New-Item -ItemType File -Path $file -Force | Out-Null
        Write-ColorOutput "  ✅ Creado: $file" "Green"
        $created++
    } else {
        Write-ColorOutput "  ⏭️  Ya existe: $file" "Yellow"
    }
}
Write-ColorOutput "  📊 Archivos de documentación creados: $created" "White"
Write-Host ""

# ============================================================================
# RESUMEN FINAL
# ============================================================================

Write-Host ""
Write-ColorOutput "╔════════════════════════════════════════════════════════════╗" "Green"
Write-ColorOutput "║                                                            ║" "Green"
Write-ColorOutput "║              ✅ ¡ESTRUCTURA CREADA EXITOSAMENTE! ✅         ║" "Green"
Write-ColorOutput "║                                                            ║" "Green"
Write-ColorOutput "╚════════════════════════════════════════════════════════════╝" "Green"
Write-Host ""

Write-ColorOutput "📊 RESUMEN DE LA ESTRUCTURA CREADA:" "Cyan"
Write-Host ""

Write-ColorOutput "📂 Carpetas principales:" "White"
Write-ColorOutput "   • .github\workflows (GitHub Actions)" "Gray"
Write-ColorOutput "   • docs\ (documentación adicional)" "Gray"
Write-ColorOutput "   • functions\ (Cloud Functions backend)" "Gray"
Write-ColorOutput "   • public\ (archivos estáticos)" "Gray"
Write-ColorOutput "   • src\ (código fuente React)" "Gray"
Write-Host ""

Write-ColorOutput "📝 Archivos de documentación creados en .github\:" "White"
Write-ColorOutput "   • 12 archivos .md listos para recibir contenido" "Gray"
Write-Host ""

# Contar archivos y carpetas creados
$totalFolders = (Get-ChildItem -Recurse -Directory).Count
$totalFiles = (Get-ChildItem -Recurse -File).Count

Write-ColorOutput "📈 Estadísticas:" "Cyan"
Write-ColorOutput "   • Total de carpetas: $totalFolders" "White"
Write-ColorOutput "   • Total de archivos: $totalFiles" "White"
Write-Host ""

Write-ColorOutput "📋 PRÓXIMOS PASOS:" "Yellow"
Write-Host ""
Write-ColorOutput "1️⃣  Copiar contenido en los 12 archivos .md de .github\" "White"
Write-ColorOutput "   📍 Ubicación: .github\" "Gray"
Write-Host ""
Write-ColorOutput "2️⃣  Inicializar Git (si no lo has hecho):" "White"
Write-ColorOutput "   git init" "Gray"
Write-Host ""
Write-ColorOutput "3️⃣  Agregar archivos al repositorio:" "White"
Write-ColorOutput "   git add ." "Gray"
Write-Host ""
Write-ColorOutput "4️⃣  Hacer commit:" "White"
Write-ColorOutput "   git commit -m ""docs: add project structure and documentation""" "Gray"
Write-Host ""
Write-ColorOutput "5️⃣  Conectar con GitHub (si es necesario):" "White"
Write-ColorOutput "   git remote add origin https://github.com/cknight775/nfcores-web.git" "Gray"
Write-ColorOutput "   git branch -M main" "Gray"
Write-ColorOutput "   git push -u origin main" "Gray"
Write-Host ""

# Mostrar estructura de .github
Write-ColorOutput "📁 Estructura de .github\ creada:" "Cyan"
Write-Host ""
tree .github /F /A
Write-Host ""

Write-ColorOutput "✨ ¡Listo para comenzar a desarrollar NFCores! ✨" "Cyan"
Write-Host ""

# Preguntar si desea abrir en VS Code
$openVSCode = Read-Host "¿Deseas abrir el proyecto en Visual Studio Code? (S/N)"
if ($openVSCode -eq "S" -or $openVSCode -eq "s") {
    Write-ColorOutput "🚀 Abriendo Visual Studio Code..." "Cyan"
    code .
}

Write-Host ""
Write-ColorOutput "Gracias por usar el script de setup de NFCores 🎉" "Magenta"
Write-Host ""