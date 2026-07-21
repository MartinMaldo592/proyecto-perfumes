import React, { useState } from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ScrollReveal } from './ScrollReveal';

export const Footer = () => {
  const { navigateToHome } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const pillars = [
    { icon: CheckCircle2, title: "Perfumes 100% Auténticos", subtitle: "Importado Directo de Lattafa" },
    { icon: Package, title: "Devoluciones Sencillas", subtitle: "Garantía de Satisfacción" },
    { icon: Truck, title: "Envío Gratis", subtitle: "En compras superiores a S/ 225.00" },
    { icon: ShieldCheck, title: "Pago 100% Seguro", subtitle: "Transacciones Encriptadas" }
  ];

  return (
    <footer className="bg-white text-stone-900 font-sans border-t border-gray-200">
      
      {/* 1. TOP 4 BRAND GUARANTEE PILLARS */}
      <div className="w-full px-6 sm:px-10 lg:px-14 py-12 border-b border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} duration={600}>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full border border-stone-900 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-7 h-7 text-stone-900 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-base text-stone-900">{pillar.title}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">{pillar.subtitle}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT (Clean White Theme) */}
      <ScrollReveal animation="fade-up" duration={700} className="w-full px-6 sm:px-10 lg:px-14 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Subscribe Newsletter */}
          <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">
              Suscríbete y recibe 10% de Descuento
            </h3>
            <p className="text-xs text-stone-600">
              Recibe novedades exclusivas y ofertas especiales.
            </p>

            {/* Pill Subscription Form */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="relative flex items-center max-w-md bg-[#f4f4f4] rounded-full p-1.5 border border-transparent focus-within:border-stone-400 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo Electrónico"
                  required
                  className="w-full bg-transparent px-5 py-2.5 text-xs text-stone-900 placeholder-stone-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-9 h-9 bg-transparent hover:bg-stone-200 text-stone-900 rounded-full flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-700 font-medium pt-1">
                ✓ ¡Gracias por suscribirte! Revisa tu correo para recibir tu 10% de descuento.
              </p>
            )}

            <p className="text-[11px] text-stone-500 pt-2 leading-normal">
              Al suscribirte aceptas los <u className="cursor-pointer hover:text-stone-900">Términos de Uso</u> y la <u className="cursor-pointer hover:text-stone-900">Política de Privacidad</u>.
            </p>
          </div>

          {/* Right Columns: Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
            
            {/* Quick Shop */}
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm mb-4">Navegación Rápida</h4>
              <ul className="space-y-3 text-stone-700 font-medium">
                <li><a href="#all" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Todas las Fragancias</a></li>
                <li><a href="#new" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Nuevos Lanzamientos</a></li>
                <li><a href="#bestsellers" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Los Más Vendidos</a></li>
                <li><a href="#gift" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Tarjetas de Regalo</a></li>
                <li><a href="#bundles" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Packs Exclusivos</a></li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm mb-4">Atención al Cliente</h4>
              <ul className="space-y-3 text-stone-700 font-medium">
                <li><a href="#faqs" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#rewards" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Programa de Recompensas</a></li>
                <li><a href="#shipping" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Envíos y Devoluciones</a></li>
                <li><a href="#track" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Seguir Mi Pedido</a></li>
                <li><a href="#contact" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Contacto Directo</a></li>
              </ul>
            </div>

            {/* Know More */}
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm mb-4">Conócenos</h4>
              <ul className="space-y-3 text-stone-700 font-medium">
                <li><a href="#about" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Sobre Nosotros</a></li>
                <li><a href="#blogs" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Blog y Noticias</a></li>
                <li><a href="#reviews" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Reseñas de Clientes</a></li>
                <li><a href="#account" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Mi Cuenta</a></li>
                <li><a href="#wholesale" onClick={navigateToHome} className="hover:text-amber-800 transition-colors">Ventas al Mayor</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* 3. BOTTOM BAR (Image 3) */}
        <div className="pt-12 mt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Controls & Copyright */}
          <div className="space-y-3 text-center md:text-left">
            
            {/* Country Selector Pill Dropdown */}
            <div className="inline-flex items-center space-x-2 bg-stone-50 border border-gray-200 rounded-full px-4 py-2 text-xs font-semibold text-stone-900 cursor-pointer hover:bg-stone-100 transition-colors">
              <span>🇵🇪 Perú (PEN S/)</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </div>

            {/* Copyright */}
            <div className="text-xs text-stone-500">
              © 2026 Lattafa . <u className="cursor-pointer hover:text-stone-900">Desarrollado con Shopify</u>
            </div>

            {/* Purple Follow on shop button */}
            <div>
              <button className="bg-[#5a31f4] hover:bg-[#4924d6] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer">
                <span>💜 Seguir en la Tienda</span>
              </button>
            </div>

          </div>

          {/* Right Social Icons & Payment Badges */}
          <div className="flex flex-col items-end space-y-4">
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4 text-stone-800">
              <a href="#facebook" className="hover:text-amber-800 transition-colors" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#instagram" className="hover:text-amber-800 transition-colors" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#tiktok" className="font-bold text-xs hover:text-amber-800 transition-colors" title="TikTok">🎵</a>
            </div>

            {/* Payment Options Row */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-stone-700">
              <span className="bg-stone-100 px-2 py-1 rounded border border-gray-200">ACH</span>
              <span className="bg-stone-100 px-2 py-1 rounded border border-gray-200">amazon</span>
              <span className="bg-blue-900 text-white px-2 py-1 rounded">AMEX</span>
              <span className="bg-black text-white px-2 py-1 rounded">Pay</span>
              <span className="bg-stone-100 px-2 py-1 rounded border border-gray-200">Diners</span>
              <span className="bg-amber-600 text-white px-2 py-1 rounded">DISCOVER</span>
              <span className="bg-stone-100 px-2 py-1 rounded border border-gray-200">G Pay</span>
              <span className="bg-stone-900 text-white px-2 py-1 rounded">Mastercard</span>
              <span className="bg-blue-700 text-white px-2 py-1 rounded">PayPal</span>
              <span className="bg-indigo-700 text-white px-2 py-1 rounded">shopPay</span>
              <span className="bg-blue-800 text-white px-2 py-1 rounded">VISA</span>
            </div>

          </div>

        </div>

      </ScrollReveal>

    </footer>
  );
};
