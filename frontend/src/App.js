import { useState, useEffect } from "react";
import "@/App.css";
import {
  MapPin, Anchor, Users, Clock, ChevronDown, ChevronLeft, ChevronRight,
  Star, Compass, Phone, Mail, Instagram, Facebook, Send, Heart, CircleCheckBig,
  X, Check, Calendar, Sparkles
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Yacht Data with extended details
const yachts = [
  {
    id: "derby",
    name: "Derby",
    price: "$1,600",
    priceRange: null,
    capacity: 6,
    length: "28 pies",
    shortDescription: "Embarcación perfecta para pesca y paseos íntimos en el Mar de Cortés.",
    fullDescription: "El 'Derby' es una embarcación ágil y versátil, ideal para grupos pequeños que buscan una experiencia auténtica de pesca o un paseo tranquilo por las aguas cristalinas del Mar de Cortés. Equipado con todo lo necesario para una jornada exitosa en el mar.",
    image: "https://4sdu63dub3c3u.ok.kimi.link/yate-derby.jpg",
    services: ["Pesca deportiva", "Paseos por el mar", "Day charter"],
    includes: ["Equipo de pesca completo", "Hielera con hielo", "Salvavidas certificados", "Botellas de agua", "Baño", "Sistema de música", "Ceviche (a partir de 4 horas)"],
    isPremium: false,
    priceOptions: null
  },
  {
    id: "adios-dinero",
    name: "Adios Dinero",
    price: "$2,200",
    priceRange: null,
    capacity: 15,
    length: "38 pies",
    shortDescription: "Espacio, comodidad y diversión para grupos medianos con servicio completo.",
    fullDescription: "El 'Adios Dinero' ofrece el equilibrio perfecto entre espacio y comodidad. Con capacidad para 15 personas, es ideal para celebraciones familiares, reuniones de amigos o simplemente disfrutar de un día inolvidable en el mar con todo el servicio incluido.",
    image: "https://4sdu63dub3c3u.ok.kimi.link/yate-adios-dinero.jpg",
    services: ["Day charter", "Fiestas a bordo", "Pesca deportiva", "Paseos familiares"],
    includes: ["Tapete acuático", "Equipo de pesca completo", "Hielera con hielo", "Salvavidas certificados", "Botellas de agua", "Baño", "Marinero asistiendo", "Sistema de música", "Ceviche (a partir de 4 horas)"],
    isPremium: false,
    priceOptions: null
  },
  {
    id: "annabella",
    name: "Annabella",
    price: "$3,100",
    priceRange: null,
    capacity: 18,
    length: "45 pies",
    shortDescription: "Lujo y elegancia para grupos grandes que buscan una experiencia premium.",
    fullDescription: "La 'Annabella' es sinónimo de elegancia en el mar. Esta imponente embarcación ofrece espacios amplios, acabados de lujo y un servicio impecable. Perfecta para eventos especiales, celebraciones importantes o simplemente para quienes buscan lo mejor.",
    image: "https://4sdu63dub3c3u.ok.kimi.link/yate-annabella.jpg",
    services: ["Day charter premium", "Eventos especiales", "Celebraciones", "Pesca de lujo"],
    includes: ["Tapete acuático", "Equipo de pesca completo", "Hielera con hielo", "Salvavidas certificados", "Botellas de agua", "Baño", "Marinero asistiendo", "Sistema de música premium", "Ceviche (a partir de 4 horas)"],
    isPremium: true,
    priceOptions: null
  },
  {
    id: "mar-de-cortez",
    name: "Mar de Cortez",
    price: "$3,500 - $4,500",
    priceRange: true,
    capacity: 25,
    length: "55 pies",
    shortDescription: "La joya de la corona. El yate más grande con opciones flexibles de capacidad.",
    fullDescription: "El 'Mar de Cortez' es nuestra embarcación insignia, diseñada para ofrecer la máxima experiencia de lujo en el mar. Con múltiples opciones de capacidad, se adapta a grupos de diferentes tamaños sin sacrificar comodidad ni estilo. La elección perfecta para quienes buscan lo extraordinario.",
    image: "https://4sdu63dub3c3u.ok.kimi.link/yate-mar-de-cortes.jpg",
    services: ["Day charter de lujo", "Eventos corporativos", "Bodas en yate", "Grandes celebraciones"],
    includes: ["Tapete acuático", "Equipo de pesca completo", "Hielera con hielo", "Salvavidas certificados", "Botellas de agua", "Baño", "Marinero asistiendo", "Sistema de música premium", "Ceviche (a partir de 4 horas)"],
    isPremium: true,
    priceOptions: [
      { price: "$3,500", capacity: "Hasta 15 personas" },
      { price: "$4,000", capacity: "Hasta 20 personas" },
      { price: "$4,500", capacity: "Hasta 25 personas" }
    ]
  }
];

const experiences = [
  {
    id: "day-charter",
    title: "Day Charter de Lujo",
    duration: "4 u 8 horas",
    capacity: "2-25 personas",
    description: "Disfruta de un día completo en el Mar de Cortés. Navega por aguas cristalinas, ancla en calas privadas y sumérgete en el mundo submarino.",
    image: "https://4sdu63dub3c3u.ok.kimi.link/experiencia-snorkel.jpg",
    includes: ["Capitán certificado", "Combustible", "Equipo de pesca", "Tapete acuático", "Bebidas de cortesía", "Ceviche (4+ hrs)"],
    recommendedYacht: "Annabella o Mar de Cortez"
  },
  {
    id: "sunset",
    title: "Atardecer Romántico",
    duration: "3 horas",
    capacity: "2-6 personas",
    description: "El momento más mágico del día en el mar. Navega mientras el sol se pinta de naranja y rosa en el horizonte, brindando con tu persona especial.",
    image: "https://4sdu63dub3c3u.ok.kimi.link/experiencia-atardecer.jpg",
    includes: ["Capitán experto", "Música ambiental", "Bebidas de cortesía", "Tapete acuático", "Ceviche"],
    recommendedYacht: "Adios Dinero"
  },
  {
    id: "party",
    title: "Fiestas y Celebraciones",
    duration: "4-6 horas",
    capacity: "10-25 personas",
    description: "Cumpleaños, despedidas, aniversarios o simplemente porque sí. Celebra en grande sobre las aguas más hermosas de México.",
    image: "https://4sdu63dub3c3u.ok.kimi.link/experiencia-fiesta.jpg",
    includes: ["Capitán dedicado", "Sistema de sonido", "Hieleras grandes", "Tapete acuático", "Área de baile", "Ceviche incluido"],
    recommendedYacht: "Mar de Cortez"
  },
  {
    id: "fishing",
    title: "Pesca Deportiva",
    duration: "4-8 horas",
    capacity: "2-6 personas",
    description: "El Mar de Cortés es hogar de algunas de las especies más codiciadas. Dorado, marlín, atún y más te esperan.",
    image: "https://4sdu63dub3c3u.ok.kimi.link/yate-derby.jpg",
    includes: ["Capitán experto", "Equipo profesional", "Carnada viva", "Hieleras", "Ceviche con tu pesca", "Licencias incluidas"],
    recommendedYacht: "Derby"
  }
];

const processSteps = [
  { number: "01", title: "Elige", description: "Selecciona tu yate y experiencia ideal" },
  { number: "02", title: "Solicita", description: "Envía tu solicitud con fecha y detalles" },
  { number: "03", title: "Confirma", description: "Te contactamos con disponibilidad y costo" },
  { number: "04", title: "Anticipo", description: "Realiza el pago para asegurar tu fecha" },
  { number: "05", title: "Disfruta", description: "Llega al muelle y vive la experiencia" }
];

const faqs = [
  {
    question: "¿Qué incluye la renta del yate?",
    answer: "Todos nuestros yates incluyen: capitán certificado, combustible, equipo de seguridad (salvavidas), hielera con hielo, botellas de agua de cortesía, y equipo de pesca básico. Los yates más grandes también incluyen tapete acuático, sistema de sonido y ceviche en paseos de 4+ horas."
  },
  {
    question: "¿Qué debo llevar para el paseo?",
    answer: "Te recomendamos traer: protector solar (biodegradable de preferencia), toalla, traje de baño, gorra o sombrero, lentes de sol, cámara resistente al agua, y cualquier bebida o snack adicional que desees. Nosotros proporcionamos agua y hielo."
  },
  {
    question: "¿Cuál es la política ante mal clima?",
    answer: "Tu seguridad es nuestra prioridad. Si las condiciones climáticas no son favorables, te contactaremos para reprogramar tu paseo sin costo adicional. El capitán tiene la última palabra sobre si es seguro navegar."
  },
  {
    question: "¿Cuál es la política de cancelación?",
    answer: "Cancelación gratuita hasta 7 días antes de tu reserva. Cancelaciones con menos de 7 días de anticipación tendrán un cargo del 50% del anticipo. No-shows o cancelaciones el mismo día no son reembolsables."
  },
  {
    question: "¿Los yates cuentan con todas las medidas de seguridad?",
    answer: "Absolutamente. Todos nuestros yates cuentan con salvavidas certificados para cada pasajero, equipo de primeros auxilios, radio VHF, GPS, y bengalas de emergencia. Nuestros capitanes están certificados y tienen años de experiencia navegando el Mar de Cortés."
  },
  {
    question: "¿Se permite el consumo de alcohol a bordo?",
    answer: "Sí, puedes traer tus propias bebidas alcohólicas. Te pedimos consumo responsable y que te mantengas hidratado con agua. Contamos con hieleras para mantener tus bebidas frías."
  },
  {
    question: "¿Pueden ir niños a bordo?",
    answer: "¡Claro que sí! Los niños son bienvenidos. Contamos con salvavidas de diferentes tallas. Recomendamos supervisión constante de los menores, especialmente cerca de las áreas de agua."
  }
];

// Hero Video URL
const HERO_VIDEO_URL = "https://customer-assets.emergentagent.com/job_webpage-archive-1/artifacts/t8sqd8nt_video%20portada%20mar%20de%20cortes.mp4";

// Yacht Detail Modal Component
const YachtDetailModal = ({ yacht, isOpen, onClose, onReserve }) => {
  if (!yacht) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white" data-testid={`yacht-modal-${yacht.id}`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 bg-white/80 hover:bg-white rounded-full p-1 transition-colors"
          data-testid="modal-close-btn"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
        
        <div className="p-6">
          {/* Header */}
          <DialogHeader className="mb-4">
            <DialogTitle className="text-3xl font-bold text-slate-900">{yacht.name}</DialogTitle>
            <DialogDescription className="text-slate-600 mt-1">{yacht.shortDescription}</DialogDescription>
          </DialogHeader>

          {/* Image */}
          <div className="rounded-xl overflow-hidden mb-6 border border-slate-200">
            <img
              src={yacht.image}
              alt={yacht.name}
              className="w-full h-56 object-cover"
            />
          </div>

          {/* Full Description */}
          <p className="text-slate-700 mb-6 leading-relaxed">{yacht.fullDescription}</p>

          {/* Price Section */}
          {yacht.priceOptions ? (
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[hsl(var(--gold))]" />
                <h4 className="font-bold text-slate-900">Precios por Capacidad</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {yacht.priceOptions.map((option, index) => (
                  <div key={index} className="bg-[hsl(var(--gold))]/10 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-[hsl(var(--primary))]">{option.price}</div>
                    <div className="text-xs text-slate-600">{option.capacity}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl p-4 mb-6 flex items-center justify-between">
              <span className="font-bold text-slate-900">Precio por hora:</span>
              <span className="text-2xl font-bold text-[hsl(var(--primary))]">{yacht.price}</span>
            </div>
          )}

          {/* Specifications and Services */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Specifications */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Anchor className="w-5 h-5 text-[hsl(var(--primary))]" />
                <h4 className="font-bold text-slate-900">Especificaciones</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Eslora:</span>
                  <span className="font-medium text-slate-900">{yacht.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Capacidad máxima:</span>
                  <span className="font-medium text-slate-900">{yacht.capacity} personas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Precio:</span>
                  <span className="font-medium text-[hsl(var(--primary))]">{yacht.price}/hora</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[hsl(var(--gold))]" />
                <h4 className="font-bold text-slate-900">Servicios Disponibles</h4>
              </div>
              <div className="space-y-2">
                {yacht.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-slate-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Includes */}
          <div className="mb-6">
            <h4 className="font-bold text-slate-900 mb-3">Todo Incluido</h4>
            <div className="flex flex-wrap gap-2">
              {yacht.includes.map((item, index) => (
                <span
                  key={index}
                  className="bg-[hsl(var(--gold))]/20 text-slate-700 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Reserve Button */}
          <button
            onClick={() => {
              onClose();
              onReserve(yacht);
            }}
            className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--ocean-deep))] text-white py-4 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-lg"
            data-testid={`modal-reserve-${yacht.id}`}
          >
            <Calendar className="w-5 h-5" />
            Reservar {yacht.name}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Hero Section Component with Video
const HeroSection = () => {
  const scrollToFlota = () => {
    document.getElementById('flota')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContacto = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ imageRendering: 'high-quality' }}
          data-testid="hero-video"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <MapPin className="w-5 h-5 text-[hsl(var(--gold))]" />
            <span className="text-white/90 text-lg">Marina de San Carlos, Sonora, México</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Descubre el <span className="text-[hsl(var(--gold))]">Mar de Cortés</span> en Yate
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Experiencias de lujo a bordo de nuestra flota exclusiva en San Carlos, Sonora. Desde $1,600 por hora.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button onClick={scrollToContacto} className="btn-primary text-lg" data-testid="reserve-btn">
              Reserva tu Experiencia
            </button>
            <button onClick={scrollToFlota} className="btn-secondary text-lg" data-testid="fleet-btn">
              Conoce Nuestra Flota
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--gold))]">4</div>
              <div className="text-white/80 text-sm mt-1">Yates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--gold))]">6-25</div>
              <div className="text-white/80 text-sm mt-1">Capacidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--gold))]">$1,600</div>
              <div className="text-white/80 text-sm mt-1">Desde/hora</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--gold))]">15+</div>
              <div className="text-white/80 text-sm mt-1">Años Exp.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <button
        onClick={scrollToFlota}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce z-20"
        data-testid="scroll-down-btn"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

// Yacht Card Component
const YachtCard = ({ yacht, onViewDetails }) => {
  return (
    <div className={`card-luxury group relative ${yacht.isPremium ? 'ring-2 ring-[hsl(var(--gold))]' : ''}`} data-testid={`yacht-card-${yacht.id}`}>
      {yacht.isPremium && (
        <div className="absolute top-4 left-4 bg-[hsl(var(--gold))] text-slate-900 px-3 py-1 rounded-full text-sm font-bold z-10">
          <Star className="w-4 h-4 inline mr-1" /> Premium
        </div>
      )}
      
      <div className="relative h-64 overflow-hidden">
        <img
          src={yacht.image}
          alt={yacht.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
            <Users className="w-4 h-4" />
            {yacht.capacity} px
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-slate-900">{yacht.name}</h3>
          <span className="text-xl font-bold text-[hsl(var(--primary))]">
            {yacht.price}<span className="text-sm text-slate-500 font-normal">/hora</span>
          </span>
        </div>
        
        <p className="text-slate-600 mb-4">{yacht.shortDescription}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <Anchor className="w-4 h-4 text-[hsl(var(--primary))]" />
            {yacht.length}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[hsl(var(--primary))]" />
            Máx. {yacht.capacity}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {yacht.includes.slice(0, 4).map((feature, index) => (
            <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
              {feature}
            </span>
          ))}
          {yacht.includes.length > 4 && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
              +{yacht.includes.length - 4}
            </span>
          )}
        </div>
        
        <button
          onClick={() => onViewDetails(yacht)}
          className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--ocean-deep))] text-white py-2 px-4 rounded-md font-medium transition-colors"
          data-testid={`view-details-${yacht.id}`}
        >
          Ver Detalles y Reservar
        </button>
      </div>
    </div>
  );
};

// Fleet Section
const FleetSection = ({ onViewDetails }) => {
  return (
    <section id="flota" className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium mb-4 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
            <Anchor className="w-4 h-4 mr-1" /> Nuestra Flota
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Elige tu <span className="text-gradient">Embarcación</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Cuatro yates equipados para ofrecerte la mejor experiencia en el Mar de Cortés. Desde paseos íntimos hasta grandes celebraciones.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {yachts.map((yacht) => (
            <YachtCard key={yacht.id} yacht={yacht} onViewDetails={onViewDetails} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Card Component
const ExperienceCard = ({ experience, onReserve }) => {
  return (
    <div className="card-luxury overflow-hidden group" data-testid={`experience-card-${experience.id}`}>
      <div className="relative h-56 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {experience.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {experience.capacity}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-slate-600 mb-4">{experience.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Incluye:</h4>
          <div className="flex flex-wrap gap-2">
            {experience.includes.map((item, index) => (
              <span key={index} className="text-xs bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] px-2 py-1 rounded">
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-medium">Yate recomendado:</span> {experience.recommendedYacht}
          </div>
          <button
            onClick={() => onReserve(experience)}
            className="px-4 py-2 rounded-md border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-colors text-sm font-medium"
            data-testid={`reserve-experience-${experience.id}`}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

// Experiences Section
const ExperiencesSection = ({ onReserve }) => {
  return (
    <section id="experiencias" className="section-padding bg-gradient-to-b from-slate-50 to-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium mb-4 bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]">
            <Compass className="w-4 h-4 mr-1" /> Experiencias
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Aventuras en el <span className="text-gradient">Mar de Cortés</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Conocido como "El Acuario del Mundo", el Mar de Cortés te espera con aguas cristalinas, vida marina extraordinaria y paisajes que quitan el aliento.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} onReserve={onReserve} />
          ))}
        </div>
        
        {/* Ceviche Banner */}
        <div className="mt-12 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--ocean-deep))] rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ceviche incluido</h3>
              <p className="text-white/90">
                En todos nuestros paseos de 4 horas o más, disfruta de delicioso ceviche fresco preparado a bordo. ¡La mejor manera de disfrutar tu pesca!
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-[hsl(var(--gold))]">4+</div>
              <div className="text-white/80">horas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  return (
    <section id="proceso" className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium mb-4 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
            <CircleCheckBig className="w-4 h-4 mr-1" /> Proceso Simple
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Reserva en <span className="text-gradient">5 Pasos</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-5 gap-6">
          {processSteps.map((step, index) => (
            <div key={index} className="relative" data-testid={`process-step-${index + 1}`}>
              <div className="bg-slate-50 p-6 rounded-xl shadow-lg text-center h-full hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-[hsl(var(--primary))]/20 mb-3">{step.number}</div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[hsl(var(--primary))]/30"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-slate-50">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium mb-4 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
              <CircleCheckBig className="w-4 h-4 mr-1" /> Preguntas Frecuentes
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Todo lo que <span className="text-gradient">Necesitas Saber</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border bg-white rounded-lg px-6"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    yacht: '',
    message: ''
  });

  const getYachtName = (value) => {
    const yachtNames = {
      'derby': 'Derby ($1,600/hr)',
      'adios-dinero': 'Adios Dinero ($2,200/hr)',
      'annabella': 'Annabella ($3,100/hr)',
      'mar-de-cortez': 'Mar de Cortez ($3,500-$4,500/hr)'
    };
    return yachtNames[value] || value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formato de fecha legible
    const fechaFormateada = formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'No especificada';

    // Crear mensaje para WhatsApp
    const mensaje = `🚤 *NUEVA SOLICITUD DE RESERVA*

👤 *Nombre:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Teléfono:* ${formData.phone}

📅 *Fecha deseada:* ${fechaFormateada}
👥 *Número de personas:* ${formData.guests}
⚓ *Yate preferido:* ${getYachtName(formData.yacht)}

💬 *Mensaje:* ${formData.message || 'Sin mensaje adicional'}

---
_Enviado desde la página web_`;

    // Número de WhatsApp (622-228-58-88 sin guiones, con código de país)
    const whatsappNumber = '526222285888';
    
    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Abrir WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${mensajeCodificado}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <section id="contacto" className="section-padding bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container-custom mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <span className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium mb-4 bg-white/10 text-white">
              <Phone className="w-4 h-4 mr-1" /> Contacto
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Reserva tu <span className="text-[hsl(var(--gold))]">Aventura</span>
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Completa el formulario y te contactaremos en menos de 24 horas para confirmar disponibilidad y detalles de tu experiencia.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <div className="text-sm text-white/60">WhatsApp</div>
                  <div className="font-medium">622-228-58-88</div>
                  <div className="font-medium">622-126-05-97</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Email</div>
                  <div className="font-medium">renta.yates.sancarlos@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Ubicación</div>
                  <div className="font-medium">Marina de San Carlos, Sonora, México</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Instagram</div>
                  <a
                    href="https://www.instagram.com/yates_mardecortes_sancarlos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-[hsl(var(--gold))] transition-colors"
                  >
                    @yates_mardecortes_sancarlos
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Facebook</div>
                  <a
                    href="https://www.facebook.com/profile.php?id=100065035719361"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-[hsl(var(--gold))] transition-colors"
                  >
                    Yates Mar de Cortés San Carlos
                  </a>
                </div>
              </div>
            </div>
            
            {/* Trust Badge */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="font-semibold">Reserva con Confianza</span>
              </div>
              <p className="text-sm text-white/70">
                Anticipo flexible • Cancelación gratuita hasta 7 días antes • Reprogramación sin costo por mal clima
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 text-slate-900">
            <h3 className="text-2xl font-bold mb-6">Solicita tu Reserva</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                      data-testid="contact-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                      data-testid="contact-email"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Teléfono</label>
                    <input
                      type="tel"
                      placeholder="+52 ..."
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                      data-testid="contact-phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fecha Deseada</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                      data-testid="contact-date"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Número de Personas</label>
                    <input
                      type="number"
                      placeholder="2-25"
                      min="1"
                      max="25"
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                      data-testid="contact-guests"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Yate Preferido</label>
                    <select
                      required
                      value={formData.yacht}
                      onChange={(e) => setFormData({ ...formData, yacht: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                      data-testid="contact-yacht"
                    >
                      <option value="">Selecciona...</option>
                      <option value="derby">Derby ($1,600/hr)</option>
                      <option value="adios-dinero">Adios Dinero ($2,200/hr)</option>
                      <option value="annabella">Annabella ($3,100/hr)</option>
                      <option value="mar-de-cortez">Mar de Cortez ($3,500-$4,500/hr)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Mensaje (opcional)</label>
                  <textarea
                    placeholder="Cuéntanos más sobre lo que buscas..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] resize-none"
                    data-testid="contact-message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                  data-testid="contact-submit"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar por WhatsApp
                </button>
                
                <p className="text-xs text-slate-500 text-center">
                  Se abrirá WhatsApp con tu solicitud prellenada
                </p>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Flota', href: '#flota' },
    { name: 'Experiencias', href: '#experiencias' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contacto', href: '#contacto' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      data-testid="navigation"
    >
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2" data-testid="nav-logo">
            <Anchor className={`w-8 h-8 ${isScrolled ? 'text-[hsl(var(--primary))]' : 'text-white'}`} />
            <span className={`font-bold text-lg ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Yates Mar de Cortés
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[hsl(var(--gold))] ${
                  isScrolled ? 'text-slate-700' : 'text-white/90'
                }`}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacto"
              className="btn-primary text-sm py-2 px-4"
              data-testid="nav-reserve-btn"
            >
              Reservar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            data-testid="mobile-menu-btn"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-b-2xl shadow-lg py-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-slate-700 font-medium hover:text-[hsl(var(--primary))]"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 btn-primary text-center"
            >
              Reservar
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12" data-testid="footer">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-8 h-8 text-[hsl(var(--gold))]" />
              <span className="font-bold text-lg">Yates Mar de Cortés</span>
            </div>
            <p className="text-white/70 text-sm">
              Experiencias de lujo en el "Acuario del Mundo". Más de 15 años navegando el Mar de Cortés.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#flota" className="hover:text-white transition-colors">Nuestra Flota</a></li>
              <li><a href="#experiencias" className="hover:text-white transition-colors">Experiencias</a></li>
              <li><a href="#proceso" className="hover:text-white transition-colors">Cómo Reservar</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Yates</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Derby - $1,600/hr</li>
              <li>Adios Dinero - $2,200/hr</li>
              <li>Annabella - $3,100/hr</li>
              <li>Mar de Cortez - $3,500+/hr</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>622-228-58-88</li>
              <li>622-126-05-97</li>
              <li>renta.yates.sancarlos@gmail.com</li>
              <li>Marina de San Carlos, Sonora</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Yates Mar de Cortés. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/yates_mardecortes_sancarlos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100065035719361"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [selectedYacht, setSelectedYacht] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (yacht) => {
    setSelectedYacht(yacht);
    setIsModalOpen(true);
  };

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50" data-testid="app-container">
      <Navigation />
      <HeroSection />
      <FleetSection onViewDetails={handleViewDetails} />
      <ExperiencesSection onReserve={scrollToContact} />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      
      {/* Yacht Detail Modal */}
      <YachtDetailModal
        yacht={selectedYacht}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReserve={scrollToContact}
      />
    </div>
  );
}

export default App;
