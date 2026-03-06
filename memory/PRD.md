# PRD - Yates Mar de Cortés Landing Page

## Fecha de Creación: Enero 2026
## Última Actualización: Enero 2026

## Problem Statement Original
Copiar una landing page web de Yates Mar de Cortés desde https://4sdu63dub3c3u.ok.kimi.link
Con mejoras: Video de fondo en hero y modal de detalles para cada yate.

## Arquitectura
- **Frontend**: React.js + Tailwind CSS + shadcn/ui components (Dialog, Accordion)
- **Backend**: FastAPI (minimal - no backend functionality used for this landing page)
- **Assets**: Video e imágenes servidas desde URLs externas

## User Personas
1. **Turistas**: Personas que visitan San Carlos, Sonora y buscan experiencias de yate
2. **Residentes locales**: Personas locales que quieren celebrar eventos especiales en yate
3. **Organizadores de eventos**: Personas que buscan organizar fiestas, bodas, o celebraciones en el mar

## Core Requirements (Static)
- [x] Hero section con VIDEO de fondo
- [x] Navegación fija con smooth scroll
- [x] Sección de flota con 4 yates (Derby, Adios Dinero, Annabella, Mar de Cortez)
- [x] **Modal de detalles** para cada yate al hacer clic en "Ver Detalles y Reservar"
- [x] Sección de experiencias (Day Charter, Atardecer, Fiestas, Pesca)
- [x] Proceso de reserva en 5 pasos
- [x] FAQ con accordion interactivo
- [x] Formulario de contacto funcional
- [x] Footer con información de contacto y redes sociales
- [x] Diseño responsive (desktop + mobile)

## What's Been Implemented (Enero 2026)

### Iteración 1
- Hero Section con carrusel de 8 imágenes
- Navigation, Fleet, Experiences, Process, FAQ, Contact, Footer

### Iteración 2 (Actual)
1. **Hero con Video**: Reemplazado carrusel de fotos por video de fondo
2. **Yacht Detail Modal**: Modal completo al hacer clic en "Ver Detalles y Reservar"
   - Imagen del yate
   - Descripción completa
   - Precio por hora
   - Especificaciones (Eslora, Capacidad, Precio)
   - Servicios disponibles (con checks)
   - Todo Incluido (tags dorados)
   - Botón "Reservar [Nombre Yate]"
3. **Mar de Cortez Precios Escalonados**: 
   - $3,500 hasta 15 personas
   - $4,000 hasta 20 personas
   - $4,500 hasta 25 personas

## Testing Status
- ✅ Frontend: 100% passed (17+ tests)
- ✅ Hero video loads and plays correctly
- ✅ All 4 yacht modals work correctly
- ✅ Mar de Cortez shows 3 price tiers
- ✅ Modal close and reserve buttons work
- ✅ Navigation smooth scroll working
- ✅ FAQ accordion functional
- ✅ Contact form validation working

## Backlog (P0/P1/P2)

### P0 - Completado
- [x] Recrear landing page original
- [x] Agregar video en hero
- [x] Agregar modal de detalles para yates

### P1 - Mejoras Sugeridas
- [ ] Integrar backend real para guardar solicitudes de contacto en MongoDB
- [ ] Agregar validación de fechas disponibles en tiempo real
- [ ] Implementar envío de emails con la solicitud de reserva
- [ ] Integrar WhatsApp para reservas directas

### P2 - Nice to Have
- [ ] Sistema de reservas en línea con calendario
- [ ] Galería de fotos adicionales por yate
- [ ] Reviews/testimonios de clientes
- [ ] Multi-idioma (español/inglés)
- [ ] Blog con contenido sobre el Mar de Cortés

## Next Tasks
1. Conectar formulario de contacto con backend para persistencia
2. Implementar integración con WhatsApp Business
3. Agregar galería de fotos en cada modal de yate
