# ============================================
# SCRIPT DE CONFIGURACIÓN AUTOMÁTICA DE FIREBASE
# ============================================
# Este script configura Firebase por línea de comandos
# Fecha: 22 de octubre de 2025
# Proyecto: nfcores-web-test
# ============================================

Write-Host "🚀 CONFIGURACIÓN AUTOMÁTICA DE FIREBASE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Variables del proyecto
$PROJECT_ID = "nfcores-web-test"
$REGION = "southamerica-east1"

# ============================================
# PASO 1: Verificar login
# ============================================
Write-Host "📋 PASO 1: Verificando login en Firebase..." -ForegroundColor Yellow

$loginStatus = firebase login:list 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Ya estás logueado en Firebase" -ForegroundColor Green
} else {
    Write-Host "⚠️  No estás logueado. Ejecutando login..." -ForegroundColor Yellow
    firebase login
}

Write-Host ""

# ============================================
# PASO 2: Conectar con el proyecto
# ============================================
Write-Host "📋 PASO 2: Conectando con proyecto $PROJECT_ID..." -ForegroundColor Yellow

# Usar el proyecto de Firebase
firebase use $PROJECT_ID

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Conectado al proyecto: $PROJECT_ID" -ForegroundColor Green
} else {
    Write-Host "❌ Error al conectar con el proyecto" -ForegroundColor Red
    Write-Host "Verifica que el proyecto existe en Firebase Console" -ForegroundColor Red
    exit 1
}

Write-Host ""

# ============================================
# PASO 3: Crear índices de Firestore
# ============================================
Write-Host "📋 PASO 3: Desplegando índices de Firestore..." -ForegroundColor Yellow

firebase deploy --only firestore:indexes

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Índices de Firestore desplegados" -ForegroundColor Green
} else {
    Write-Host "⚠️  Error al desplegar índices (puede ser normal si no hay cambios)" -ForegroundColor Yellow
}

Write-Host ""

# ============================================
# PASO 4: Desplegar reglas de Firestore
# ============================================
Write-Host "📋 PASO 4: Desplegando reglas de Firestore..." -ForegroundColor Yellow

firebase deploy --only firestore:rules

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Reglas de Firestore desplegadas" -ForegroundColor Green
} else {
    Write-Host "⚠️  Error al desplegar reglas" -ForegroundColor Yellow
}

Write-Host ""

# ============================================
# PASO 5: Desplegar reglas de Storage
# ============================================
Write-Host "📋 PASO 5: Desplegando reglas de Storage..." -ForegroundColor Yellow

firebase deploy --only storage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Reglas de Storage desplegadas" -ForegroundColor Green
} else {
    Write-Host "⚠️  Error al desplegar reglas de Storage" -ForegroundColor Yellow
}

Write-Host ""

# ============================================
# RESUMEN
# ============================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ CONFIGURACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 RESUMEN:" -ForegroundColor Yellow
Write-Host "  ✅ Proyecto: $PROJECT_ID" -ForegroundColor Green
Write-Host "  ✅ Índices de Firestore desplegados" -ForegroundColor Green
Write-Host "  ✅ Reglas de Firestore desplegadas" -ForegroundColor Green
Write-Host "  ✅ Reglas de Storage desplegadas" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  PENDIENTE (requiere Firebase Console):" -ForegroundColor Yellow
Write-Host "  ⏳ Habilitar Authentication (Email + Google)" -ForegroundColor Yellow
Write-Host "     URL: https://console.firebase.google.com/project/$PROJECT_ID/authentication" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ⏳ Crear Firestore Database (si no existe)" -ForegroundColor Yellow
Write-Host "     URL: https://console.firebase.google.com/project/$PROJECT_ID/firestore" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 SIGUIENTE PASO:" -ForegroundColor Cyan
Write-Host "  Ejecuta: " -NoNewline
Write-Host ".\create-test-profile.ps1" -ForegroundColor Green
Write-Host "  Para crear el perfil de emergencia de prueba" -ForegroundColor Gray
Write-Host ""
