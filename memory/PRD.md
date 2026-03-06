# PRD - Yates Mar de Cortés Landing Page

## Fecha de Creación: Enero 2026

## Problem Statement Original
Copiar una landing page web de Yates Mar de Cortés desde https://4sdu63dub3c3u.ok.kimi.link

## Arquitectura
- **Frontend**: React.js + Tailwind CSS + shadcn/ui components
- **Backend**: FastAPI (minimal - no backend functionality used for this landing page)
- **Estilo**: Landing page estática con formulario de contacto simulado

## User Personas
1. **Turistas**: Personas que visitan San Carlos, Sonora y buscan experiencias de yate
2. **Residentes locales**: Personas locales que quieren celebrar eventos especiales en yate
3. **Organizadores de eventos**: Personas que buscan organizar fiestas, bodas, o celebraciones en el mar

## Core Requirements (Static)
- [x] Hero section con carrusel de imágenes de yates
- [x] Navegación fija con smooth scroll
- [x] Sección de flota con 4 yates (Derby, Adios Dinero, Annabella, Mar de Cortez)
- [x] Sección de experiencias (Day Charter, Atardecer, Fiestas, Pesca)
- [x] Proceso de reserva en 5 pasos
- [x] FAQ con accordion interactivo
- [x] Formulario de contacto funcional
- [x] Footer con información de contacto y redes sociales
- [x] Diseño responsive (desktop + mobile)

## What's Been Implemented (Enero 2026)
1. **Hero Section**: Carrusel automático de 8 imágenes con navegación manual
2. **Navigation**: Menú fijo con links a todas las secciones + versión móvil
3. **Fleet Section**: 4 tarjetas de yates con información detallada y badges Premium
4. **Experiences Section**: 4 tipos de experiencias con tarjetas detalladas
5. **Process Section**: 5 pasos visuales del proceso de reserva
6. **FAQ Section**: 7 preguntas frecuentes con accordion expandible
7. **Contact Section**: Formulario completo + información de contacto
8. **Footer**: Links de navegación, info de yates y redes sociales

## Testing Status
- ✅ Frontend: 100% passed (all 13 tests)
- ✅ All external images loading correctly
- ✅ Navigation smooth scroll working
- ✅ FAQ accordion functional
- ✅ Contact form validation working
- ✅ Mobile responsive design working

## Backlog (P0/P1/P2)

### P0 - Completado
- [x] Recrear landing page original

### P1 - Mejoras Sugeridas
- [ ] Integrar backend real para guardar solicitudes de contacto en MongoDB
- [ ] Agregar validación de fechas disponibles en tiempo real
- [ ] Implementar envío de emails con la solicitud de reserva
- [ ] Agregar galería de fotos para cada yate

### P2 - Nice to Have
- [ ] Sistema de reservas en línea con calendario
- [ ] Integración con WhatsApp Business API
- [ ] Reviews/testimonios de clientes
- [ ] Multi-idioma (español/inglés)
- [ ] Blog con contenido sobre el Mar de Cortés

## Next Tasks
1. Conectar formulario de contacto con backend para persistencia
2. Implementar notificaciones por email al recibir solicitudes
3. Agregar más imágenes y galería detallada por yate
