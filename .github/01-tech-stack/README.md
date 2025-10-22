# Stack Tecnológico - NFCores

**Versión**: 2.0.0 - SINCRONIZADA  
**Última actualización**: 2025-01-21 21:58:07 UTC  
**Actualizado por**: @cknight775

---

## 📚 Índice de Documentación

Esta carpeta contiene la documentación completa del stack tecnológico de NFCores, organizada por capas:

### 📄 Documentos:

1. **[frontend.md](./frontend.md)** - Tecnologías Frontend
   - React 18, Vite, TypeScript
   - TailwindCSS, React Router
   - PWA y Performance

2. **[backend.md](./backend.md)** - Backend y Firebase
   - Firebase Services (Auth, Firestore, Functions)
   - Node.js 18, Cloud Functions
   - 16 Colecciones Firestore

3. **[integrations.md](./integrations.md)** - APIs Externas
   - MercadoPago (Pagos)
   - Chilexpress (Envíos)
   - Google Analytics

4. **[limits-pricing.md](./limits-pricing.md)** - Límites y Precios Oficiales
   - Precios por pack (Individual, Familiar, Empresarial)
   - Límites sincronizados con systemConfig
   - Dependencias permitidas/prohibidas

---

## 🎯 Filosofía Tecnológica

**Principios:**
1. **Simplicidad sobre complejidad** - Tecnologías probadas y estables
2. **Performance crítico** - Página de emergencia < 2 segundos
3. **Escalabilidad** - Firebase maneja 100K+ usuarios
4. **Seguridad first** - Datos médicos sensibles protegidos
5. **Developer Experience** - TypeScript + herramientas modernas

---

## 🏗️ Arquitectura General

```
FRONTEND (React + Vite)
        ↓
BACKEND (Firebase)
        ↓
APIs EXTERNAS (MercadoPago + Chilexpress)
```

---

## 📊 Performance Targets

- **Página de Emergencia**: < 2 segundos ⚡ (CRÍTICO)
- **Dashboard**: < 3 segundos
- **Panel Admin**: < 5 segundos
- **Bundle Size**: < 1 MB total

---

**Ver documentos individuales para detalles completos.