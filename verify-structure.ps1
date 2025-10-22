# verify-structure.ps1
# Verificar que la estructura está completa

Write-Host "🔍 Verificando estructura de NFCores..." -ForegroundColor Cyan
Write-Host ""

# Verificar carpeta .github
if (Test-Path ".github") {
    Write-Host "✅ Carpeta .github existe" -ForegroundColor Green
    
    # Contar archivos .md
    $mdFiles = (Get-ChildItem ".github\*.md").Count
    Write-Host "📝 Archivos .md en .github: $mdFiles / 12" -ForegroundColor $(if ($mdFiles -eq 12) { "Green" } else { "Yellow" })
    
    # Verificar que NO están vacíos
    Write-Host ""
    Write-Host "📄 Verificando contenido de archivos:" -ForegroundColor Cyan
    
    Get-ChildItem ".github\*.md" | ForEach-Object {
        $size = $_.Length
        $sizeKB = [math]::Round($size / 1KB, 2)
        
        if ($size -gt 0) {
            Write-Host "  ✅ $($_.Name) - $sizeKB KB" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  $($_.Name) - VACÍO (0 KB)" -ForegroundColor Red
        }
    }
    
} else {
    Write-Host "❌ Carpeta .github NO existe" -ForegroundColor Red
}

Write-Host ""

# Verificar otras carpetas importantes
$importantFolders = @(
    "src\components",
    "src\pages",
    "src\services",
    "functions\src"
)

Write-Host "📁 Verificando carpetas importantes:" -ForegroundColor Cyan
foreach ($folder in $importantFolders) {
    if (Test-Path $folder) {
        Write-Host "  ✅ $folder" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $folder - NO EXISTE" -ForegroundColor Red
    }
}

Write-Host ""

# Mostrar árbol de .github
Write-Host "🌳 Árbol de .github\:" -ForegroundColor Cyan
tree .github /F /A

Write-Host ""
Write-Host "✅ Verificación completada" -ForegroundColor Green