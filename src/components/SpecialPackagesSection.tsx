// import { useState, useEffect } from 'react';

// import { 
//   ChevronLeft, ChevronRight, MapPin, Clock, Users, Star, Calendar, 
//   RefreshCw, X, Hotel, Car, Ticket, UserCheck, DollarSign, Tag
// } from 'lucide-react';
// import { specialPackagesAPI } from '@/services/travel-programs-api';
// import { AdminPackage } from '@/types/travel';

// const SpecialPackagesSection = () => {
//   const [packages, setPackages] = useState<AdminPackage[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedPackage, setSelectedPackage] = useState<AdminPackage | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await specialPackagesAPI.getAll();
      
//       if (Array.isArray(data)) {
//         setPackages(data);
//       } else if (data && typeof data === 'object' && data.data && Array.isArray(data.data)) {
//         setPackages(data.data);
//       } else if (data && typeof data === 'object' && Array.isArray(data.items)) {
//         setPackages(data.items);
//       } else {
//         console.error('Unexpected API response format:', data);
//         setError('Unexpected data format received from server');
//         setPackages([]);
//       }
//     } catch (err) {
//       console.error('Failed to fetch special packages:', err);
//       setError('Failed to load special packages. Please try again later.');
//       setPackages([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextSlide = () => {
//     if (packages.length <= 1) return;
//     setCurrentIndex((prev) => 
//       prev === packages.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     if (packages.length <= 1) return;
//     setCurrentIndex((prev) => 
//       prev === 0 ? packages.length - 1 : prev - 1
//     );
//   };

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const openModal = (pkg: AdminPackage) => {
//     setSelectedPackage(pkg);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedPackage(null);
//   };

//   // Calculate total days from city periods
//   const calculateTotalDays = (pkg: AdminPackage) => {
//     if (!pkg.cityPeriods || pkg.cityPeriods.length === 0) return '7-10';
    
//     const totalDays = pkg.cityPeriods.reduce((sum, period) => {
//       return sum + (period.durationDays || 0);
//     }, 0);
    
//     return totalDays > 0 ? totalDays.toString() : '7-10';
//   };

//   // Calculate total price including all components
//   const calculateTotalPrice = (pkg: AdminPackage) => {
//     if (pkg.finalPrice) return pkg.finalPrice;
    
//     let total = pkg.basePrice || 0;
    
//     // Add hotel costs
//     if (pkg.hotels && pkg.hotels.length > 0) {
//       pkg.hotels.forEach(hotel => {
//         total += hotel.price || 0;
//       });
//     }
    
//     // Add activity costs
//     if (pkg.activities && pkg.activities.length > 0) {
//       pkg.activities.forEach(activity => {
//         total += activity.price || 0;
//       });
//     }
    
//     // Add service costs
//     if (pkg.services && pkg.services.length > 0) {
//       pkg.services.forEach(service => {
//         total += service.price || 0;
//       });
//     }
    
//     // Add transport costs
//     if (pkg.transports && pkg.transports.length > 0) {
//       pkg.transports.forEach(transport => {
//         total += transport.price || 0;
//       });
//     }
    
//     // Apply discount if available
//     if (pkg.discountPercent && pkg.discountPercent > 0) {
//       total = total * (1 - pkg.discountPercent / 100);
//     }
    
//     return Math.round(total);
//   };

//   // Format price with thousands separators
//   const formatPrice = (price: number) => {
//     return price.toLocaleString('en-US');
//   };

//   // Modal Component
//   const PackageModal = () => {
//     if (!selectedPackage) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="sticky top-0 bg-white border-b p-6 rounded-t-xl flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {selectedPackage.name}
//             </h2>
//             <button
//               onClick={closeModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6">
//             {/* Description */}
//             {selectedPackage.description && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
//                 <p className="text-gray-600">{selectedPackage.description}</p>
//               </div>
//             )}

//             {/* Pricing */}
//             <div className="bg-blue-50 p-4 rounded-lg mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Pricing Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center">
//                   <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
//                   <span className="text-gray-700">Base Price:</span>
//                   <span className="ml-auto font-semibold">${formatPrice(selectedPackage.basePrice || 0)}</span>
//                 </div>
//                 {selectedPackage.discountPercent > 0 && (
//                   <div className="flex items-center">
//                     <Tag className="w-5 h-5 text-green-600 mr-2" />
//                     <span className="text-gray-700">Discount:</span>
//                     <span className="ml-auto font-semibold text-green-600">
//                       {selectedPackage.discountPercent}% off
//                     </span>
//                   </div>
//                 )}
//                 <div className="flex items-center md:col-span-2">
//                   <span className="text-lg font-bold text-gray-800">Final Price:</span>
//                   <span className="ml-auto text-2xl font-bold text-blue-600">
//                     ${formatPrice(calculateTotalPrice(selectedPackage))}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Cities */}
//             {selectedPackage.cities && selectedPackage.cities.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   <MapPin className="w-5 h-5 mr-2 text-blue-600" />
//                   Destinations
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {selectedPackage.cities.map((city) => (
//                     <div key={city.id} className="bg-gray-50 p-3 rounded-lg">
//                       <h4 className="font-semibold text-gray-800">{city.name}</h4>
//                       <p className="text-sm text-gray-600">{city.region}, {city.country}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Hotels */}
//             {selectedPackage.hotels && selectedPackage.hotels.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   <Hotel className="w-5 h-5 mr-2 text-blue-600" />
//                   Accommodation
//                 </h3>
//                 <div className="space-y-3">
//                   {selectedPackage.hotels.map((hotel) => (
//                     <div key={hotel.id} className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-semibold text-gray-800">{hotel.name}</h4>
//                           <p className="text-sm text-gray-600">
//                             {hotel.city.name} • {Array.from({ length: hotel.stars || 4 }).map((_, i) => (
//                               <Star key={i} className="w-4 h-4 text-yellow-400 inline fill-yellow-400" />
//                             ))}
//                           </p>
//                         </div>
//                         <span className="font-semibold text-blue-600">${hotel.price}/night</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Activities */}
//             {selectedPackage.activities && selectedPackage.activities.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   <Ticket className="w-5 h-5 mr-2 text-blue-600" />
//                   Activities
//                 </h3>
//                 <div className="space-y-3">
//                   {selectedPackage.activities.map((activity) => (
//                     <div key={activity.id} className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-semibold text-gray-800">{activity.name}</h4>
//                           <p className="text-sm text-gray-600">{activity.city.name}</p>
//                         </div>
//                         <span className="font-semibold text-blue-600">${activity.price}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Services */}
//             {selectedPackage.services && selectedPackage.services.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
//                   Services
//                 </h3>
//                 <div className="space-y-3">
//                   {selectedPackage.services.map((service) => (
//                     <div key={service.id} className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-semibold text-gray-800">{service.providerName}</h4>
//                           <p className="text-sm text-gray-600">
//                             {service.type} • {service.city.name}
//                           </p>
//                         </div>
//                         <span className="font-semibold text-blue-600">${service.price}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Transport */}
//             {selectedPackage.transports && selectedPackage.transports.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//                   <Car className="w-5 h-5 mr-2 text-blue-600" />
//                   Transportation
//                 </h3>
//                 <div className="space-y-3">
//                   {selectedPackage.transports.map((transport) => (
//                     <div key={transport.id} className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-semibold text-gray-800">{transport.company}</h4>
//                           <p className="text-sm text-gray-600">
//                             {transport.type} • {transport.city.name}
//                           </p>
//                         </div>
//                         <span className="font-semibold text-blue-600">${transport.price}/day</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Duration */}
//             <div className="bg-green-50 p-4 rounded-lg">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//                 <Clock className="w-5 h-5 mr-2 text-green-600" />
//                 Trip Duration
//               </h3>
//               <p className="text-gray-700">
//                 {calculateTotalDays(selectedPackage)} days
//                 {selectedPackage.cityPeriods && selectedPackage.cityPeriods.length > 0 && 
//                   ' (Flexible dates available)'
//                 }
//               </p>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-xl">
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={closeModal}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Close
//               </button>
//               <button
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 onClick={() => {
//                   // Handle booking logic here
//                   console.log('Book package:', selectedPackage.id);
//                 }}
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <section id="special-packages" className="py-20 bg-background">
//         <div className="container mx-auto px-6">
//           <div className="text-center">
//             <div className="animate-pulse">
//               <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
//               <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//               {[1, 2, 3].map((item) => (
//                 <div key={item} className="bg-muted rounded-xl p-6 h-96 animate-pulse">
//                   <div className="h-48 bg-muted-foreground/20 rounded-lg mb-4"></div>
//                   <div className="h-6 bg-muted-foreground/20 rounded mb-2"></div>
//                   <div className="h-4 bg-muted-foreground/20 rounded mb-1"></div>
//                   <div className="h-4 bg-muted-foreground/20 rounded mb-1"></div>
//                   <div className="h-4 bg-muted-foreground/20 rounded mb-4"></div>
//                   <div className="h-10 bg-muted-foreground/20 rounded"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="special-packages" className="py-20 bg-secondary">
//       <div className="container mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
//               Journeys & Rituals
//             </h2>
//             <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
//               Discover our curated collection of mystical experiences across Morocco
//             </p>
//           </div>

//           {error && (
//             <div className="text-center py-8 bg-destructive/10 rounded-lg mb-8">
//               <p className="text-destructive">{error}</p>
//               <button 
//                 onClick={fetchPackages}
//                 className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center mx-auto"
//               >
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Try Again
//               </button>
//             </div>
//           )}

//           {packages.length > 0 ? (
//             <div className="relative">
//               {/* Carousel Container */}
//               <div className="rounded-2xl">
//                 <div 
//                   className="flex transition-transform duration-500 ease-in-out"
//                   style={{ 
//                     transform: `translateX(-${currentIndex * 100}%)`,
//                     width: `50%`
//                   }}
//                 >
//                   {packages.map((pkg, index) => (
//                     <div key={pkg.id || index} className="w-full flex-shrink-0 px-3">
//                       <div className="bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//                         {/* Package Image Placeholder with gradient */}
//                         <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
//                           <div className="relative z-10 text-center p-4 text-white">
//                             <h3 className="font-serif text-2xl font-bold mb-2">
//                               {pkg.name || `Special Package ${pkg.id ? pkg.id.slice(0, 4) : index + 1}`}
//                             </h3>
//                             <p className="text-sm opacity-90">{pkg.description || 'Experience the magic of Morocco'}</p>
//                           </div>
//                           <div className="absolute top-4 right-4 flex items-center space-x-2">
//                             <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
//                               {pkg.discountPercent ? `Save ${pkg.discountPercent}%` : 'Special Offer'}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="p-6">
//                           <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center space-x-2">
//                               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                               <span className="text-sm font-medium text-muted-foreground">Featured Package</span>
//                             </div>
//                             {pkg.status === false && (
//                               <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-full">
//                                 Unavailable
//                               </span>
//                             )}
//                           </div>

//                           <div className="space-y-3 mb-4">
//                             <div className="flex items-center text-muted-foreground">
//                               <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
//                               <span className="text-sm">
//                                 {pkg.cities && pkg.cities.length > 0 
//                                   ? pkg.cities.map(c => c.name).join(', ')
//                                   : 'Multiple destinations'
//                                 }
//                               </span>
//                             </div>
//                             <div className="flex items-center text-muted-foreground">
//                               <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
//                               <span className="text-sm">{calculateTotalDays(pkg)} days</span>
//                             </div>
//                             <div className="flex items-center text-muted-foreground">
//                               <Users className="w-4 h-4 mr-2 flex-shrink-0" />
//                               <span className="text-sm">Small group experience</span>
//                             </div>
//                             {pkg.cityPeriods && pkg.cityPeriods.length > 0 && (
//                               <div className="flex items-center text-muted-foreground">
//                                 <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
//                                 <span className="text-sm">Flexible dates</span>
//                               </div>
//                             )}
//                           </div>

//                           {/* Included features */}
//                           <div className="mb-4">
//                             <h4 className="font-semibold text-foreground text-sm mb-2">Includes:</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {pkg.hotels && pkg.hotels.length > 0 && (
//                                 <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
//                                   {pkg.hotels.length} Hotel{pkg.hotels.length > 1 ? 's' : ''}
//                                 </span>
//                               )}
//                               {pkg.activities && pkg.activities.length > 0 && (
//                                 <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
//                                   {pkg.activities.length} Activit{pkg.activities.length > 1 ? 'ies' : 'y'}
//                                 </span>
//                               )}
//                               {pkg.services && pkg.services.length > 0 && (
//                                 <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
//                                   {pkg.services.length} Service{pkg.services.length > 1 ? 's' : ''}
//                                 </span>
//                               )}
//                               {pkg.transports && pkg.transports.length > 0 && (
//                                 <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
//                                   Transport
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           <div className="border-t border-border pt-4">
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 {pkg.discountPercent && pkg.discountPercent > 0 ? (
//                                   <div className="flex items-center">
//                                     <span className="text-2xl font-bold text-primary">
//                                       ${formatPrice(calculateTotalPrice(pkg))}
//                                     </span>
//                                     <span className="text-muted-foreground text-sm line-through ml-2">
//                                       ${formatPrice(pkg.basePrice || 0)}
//                                     </span>
//                                   </div>
//                                 ) : (
//                                   <span className="text-2xl font-bold text-primary">
//                                     ${formatPrice(calculateTotalPrice(pkg))}
//                                   </span>
//                                 )}
//                                 <span className="text-muted-foreground text-sm ml-1">per person</span>
//                               </div>
//                               <button 
//                                 onClick={() => openModal(pkg)}
//                                 className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                                 disabled={pkg.status === false}
//                               >
//                                 {pkg.status === false ? 'Unavailable' : 'View Details'}
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Navigation Buttons */}
//               {packages.length > 1 && (
//                 <>
//                   <button
//                     onClick={prevSlide}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg z-10"
//                     aria-label="Previous package"
//                   >
//                     <ChevronLeft className="w-6 h-6" />
//                   </button>
//                   <button
//                     onClick={nextSlide}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg z-10"
//                     aria-label="Next package"
//                   >
//                     <ChevronRight className="w-6 h-6" />
//                   </button>
//                 </>
//               )}

//               {/* Dots Indicator */}
//               {packages.length > 1 && (
//                 <div className="flex justify-center mt-8 space-x-2">
//                   {packages.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => goToSlide(index)}
//                       className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                         currentIndex === index ? 'bg-primary' : 'bg-muted'
//                       }`}
//                       aria-label={`Go to slide ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             !error && (
//               <div className="text-center py-12">
//                 <p className="text-muted-foreground text-lg">
//                   No special packages available at the moment. Check back soon for exciting new journeys!
//                 </p>
//                 <button 
//                   onClick={fetchPackages}
//                   className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center mx-auto"
//                 >
//                   <RefreshCw className="w-4 h-4 mr-2" />
//                   Refresh Packages
//                 </button>
//               </div>
//             )
//           )}

//           <div className="text-center mt-12">
//             <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium">
//               Explore All Packages
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && <PackageModal />}
//     </section>
//   );
// };

// export default SpecialPackagesSection;



import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Star, X, Music, Mountain, Waves, Utensils, Palette, Sparkles } from 'lucide-react';

const SpecialPackagesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Main Programs
  const programs = [
    {
      id: 1,
      title: 'Marrakech, Rabat & Fes',
      duration: 5,
      description: 'A soul-led immersion into Morocco\'s imperial past. Wander medinas, dine under stars, and learn the sacred art of Fassi cuisine.',
      image: 'https://plus.unsplash.com/premium_photo-1697730046699-02d93a2ce32d?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      cities: ['Marrakech', 'Rabat', 'Fes'],
      type: 'Imperial Journey',
      category: 'main'
    },
    {
      id: 2,
      title: 'Marrakech, Ourika, Rabat & Fes',
      duration: 8,
      description: 'From city lights to mountain whispers. Feel the waterfall\'s serenity in Ourika, the calm of Rabat, and the creativity of Fes.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      cities: ['Marrakech', 'Ourika Valley', 'Rabat', 'Fes'],
      type: 'Nature & Culture',
      category: 'main'
    },
    {
      id: 3,
      title: 'VIP Travel Program - Marrakech & Fes',
      duration: 7,
      description: 'From hammams to pottery workshops, every moment honors the senses. A journey through warmth, craft, and candlelight.',
      image: 'https://images.unsplash.com/photo-1719084198633-9951c4494317?q=80&w=425&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      cities: ['Marrakech', 'Fes'],
      type: 'Luxury Experience',
      category: 'main'
    },
    {
      id: 4,
      title: 'VIP Tour - Marrakech & Rabat',
      duration: 4,
      description: 'Short, rich, and luxurious. Hammams, gardens, and the quiet elegance of Morocco\'s royal capitals.',
      image: 'https://images.unsplash.com/photo-1647998926037-b69d2be7ad8a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      cities: ['Marrakech', 'Rabat'],
      type: 'Luxury Getaway',
      category: 'main'
    },
    {
      id: 5,
      title: 'Echoes of the Valley',
      duration: 8,
      description: 'Marrakech to Ourika, Rabat to Fes, a gentle odyssey through ancient rhythms, poetic hospitality, and sacred stops.',
      image: 'https://plus.unsplash.com/premium_photo-1697729887553-b0392581a691?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      cities: ['Marrakech', 'Ourika Valley', 'Rabat', 'Fes'],
      type: 'Cultural Journey',
      category: 'main'
    },
    {
      id: 6,
      title: 'The Ultimate Luxe Experience',
      duration: 6,
      description: 'A love letter to Marrakech and Fes, culinary rituals, sacred spas, and rose-scented evenings wrapped in Moroccan light.',
      image: 'https://plus.unsplash.com/premium_photo-1674156433236-2338418ec4d9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      cities: ['Marrakech', 'Fes'],
      type: 'Ultimate Luxury',
      category: 'main'
    }
  ];

  // Special Editions - Festivals
  const festivalPrograms = [
    {
      id: 'festival-1',
      title: 'Sacred Music Festival of Fes',
      description: 'A landscape of sound, Andalusian chants, Sufi whirls, and Sephardic melodies under the desert sky.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
      type: 'Festival Experience',
      highlights: ['VIP access to all performances', 'Private Sufi music sessions', 'Backstage artist meetings']
    },
    {
      id: 'festival-2',
      title: 'Mawazine Magic in Rabat',
      description: 'Rhythms that move the city. Private access, fine dining, and front-row enchantment.',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
      type: 'Festival Experience',
      highlights: ['Front-row concert access', 'Exclusive after-parties', 'Gourmet dining experiences']
    },
    {
      id: 'festival-3',
      title: 'Essaouira\'s Gnaoua Spirit',
      description: 'Where wind, water, and sacred rhythm merge, a soulful celebration by the sea.',
      image: 'https://images.unsplash.com/photo-1653821355793-80142f9c5063?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
      type: 'Festival Experience',
      highlights: ['Private Gnaoua music workshops', 'Befront stage access', 'Cultural immersion experiences']
    }
  ];

  // Nature & Adventure Experiences
  const natureExperiences = [
    {
      id: 'nature-1',
      title: 'The Atlas Mountains',
      description: 'Walk the holy trails of the High Atlas, Berber villages carved in stone, valleys humming with life, each step a quiet prayer.',
      icon: <Mountain className="w-6 h-6" />,
      duration: 'Full day'
    },
    {
      id: 'nature-2',
      title: 'The Serenity of Ourika',
      description: 'A valley of waterfalls and Amazigh soul. Dine by the river, breathe mountain air, and let nature\'s rhythm slow you down.',
      icon: <Mountain className="w-6 h-6" />,
      duration: 'Half day'
    },
    {
      id: 'nature-3',
      title: 'Sahara Stargazing',
      description: 'Under Morocco\'s infinite sky, silence becomes music. Recline on dunes as constellations tell their ancient stories.',
      icon: <Sparkles className="w-6 h-6" />,
      duration: 'Overnight'
    },
    {
      id: 'nature-4',
      title: 'Essaouira\'s Coastal Spirit',
      description: 'Let the Atlantic wind play with your hair, surf, ride horses, or simply walk the golden shore.',
      icon: <Waves className="w-6 h-6" />,
      duration: 'Full day'
    },
    {
      id: 'nature-5',
      title: 'The Camel Caravan',
      description: 'Ride through the dunes with nomads who know the desert\'s heart. The Sahara becomes your teacher, patient, eternal.',
      icon: <Sparkles className="w-6 h-6" />,
      duration: 'Half day'
    },
    {
      id: 'nature-6',
      title: 'The Cedar Forests',
      description: 'Among ancient trees and playful macaques, rediscover stillness and balance.',
      icon: <Mountain className="w-6 h-6" />,
      duration: 'Full day'
    }
  ];

  // Cultural & Culinary Experiences
  const culturalExperiences = [
    {
      id: 'cultural-1',
      title: 'Cooking with Spirit',
      description: 'Join local chefs in kitchens perfumed with saffron and stories, learn to prepare tagine, couscous, and pastilla, food made with memory.',
      icon: <Utensils className="w-6 h-6" />,
      duration: '3-4 hours'
    },
    {
      id: 'cultural-2',
      title: 'Souk Stories',
      description: 'Wander medinas alive with color and scent. With our guides, every stall becomes a story, every purchase a keepsake of history.',
      icon: <Sparkles className="w-6 h-6" />,
      duration: '2-3 hours'
    },
    {
      id: 'cultural-3',
      title: 'Pottery & Calligraphy Rituals',
      description: 'Shape clay, trace your name in ink. Guided by artisans, you\'ll create not just art but connection.',
      icon: <Palette className="w-6 h-6" />,
      duration: '3-4 hours'
    },
    {
      id: 'cultural-4',
      title: 'Tasting Walks Through Time',
      description: 'Savor pastries, sip mint tea and walk the alleys of Fes and Marrakech where flavor meets history.',
      icon: <Utensils className="w-6 h-6" />,
      duration: '2-3 hours'
    },
    {
      id: 'cultural-5',
      title: 'The Moroccan Tea Offering',
      description: 'More than a drink, a blessing. Pour, share, smile. In Morocco, tea means "you\'re home".',
      icon: <Utensils className="w-6 h-6" />,
      duration: '1-2 hours'
    },
    {
      id: 'cultural-6',
      title: 'Nights of Celebration',
      description: 'Beneath the stars, music and dance awaken Morocco\'s spirit, a feast of rhythm, laughter, and connection.',
      icon: <Music className="w-6 h-6" />,
      duration: 'Evening'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === programs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? programs.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openModal = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
  };

  const currentProgram = programs[currentIndex];

  const filteredPrograms = activeCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === activeCategory);

  return (
    <section id="journeys-rituals" className="py-20 bg-luxury-beige/10">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Journeys & Rituals
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover Morocco through tailor-made journeys blending luxury, culture, and deep connection. 
            Each program is a carefully crafted ritual of discovery, designed to transform your travel into a meaningful pilgrimage.
          </p>
        </div>

        {/* Main Programs Carousel */}
        <div className="mb-20">
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-luxury overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Program Image */}
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={currentProgram.image}
                    alt={currentProgram.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2 justify-center">
                      {programs.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                <div className="p-8 lg:p-12">
                  <div className="h-full flex flex-col">
                    <div className="flex-1">
                      <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                        Program {currentProgram.id}
                      </div>
                      <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        {currentProgram.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {currentProgram.description}
                      </p>

                      {/* Program Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {currentProgram.duration} Days
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {currentProgram.cities.length} Destinations
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Private Experience
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Customizable
                          </span>
                        </div>
                      </div>

                      {/* Destinations */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-foreground mb-3">Journey Through:</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProgram.cities.map((city, index) => (
                            <span key={index} className="bg-luxury-beige/30 px-3 py-1 rounded-full text-sm">
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => openModal(currentProgram)}
                          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                        >
                          Explore This Journey
                        </button>
                        <button className="flex-1 border border-primary text-primary py-3 px-6 rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300">
                          Customize Itinerary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* Special Editions - Festivals */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Music className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Limited Edition</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Special Editions
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Exclusive festival experiences: Limited-time magic. Immerse yourself in Morocco's vibrant festival culture with VIP access and unforgettable moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {festivalPrograms.map((festival) => (
              <div key={festival.id} className="bg-white rounded-2xl shadow-luxury overflow-hidden hover:shadow-luxury-hover transition-all duration-500 hover:translate-y-2">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={festival.image}
                    alt={festival.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <Music className="w-4 h-4" />
                    <span className="text-sm font-semibold">{festival.type}</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-3">
                    {festival.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {festival.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {festival.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-sm text-foreground">
                        <span className="text-primary mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-primary/10 text-primary py-2 px-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                    Discover Festival Magic
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nature & Sacred Adventure */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Mountain className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Sacred Adventure</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nature & Sacred Adventure
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Where wilderness turns into wonder and every horizon feels like a message
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {natureExperiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-xl p-6 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 hover:translate-y-1 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                    {experience.icon}
                  </div>
                  <span className="text-sm font-semibold text-primary">{experience.duration}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-foreground mb-3">
                  {experience.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural & Culinary Encounters */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Utensils className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Living Culture</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cultural & Culinary Encounters
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Culture in Morocco isn't something you observe, it's something you live
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalExperiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-xl p-6 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 hover:translate-y-1 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                    {experience.icon}
                  </div>
                  <span className="text-sm font-semibold text-primary">{experience.duration}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-foreground mb-3">
                  {experience.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-white flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Program {selectedProgram.id}: {selectedProgram.title}
              </h3>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-luxury-beige/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <p>{selectedProgram.duration} Days</p>
                </div>
                
                <div className="bg-luxury-beige/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Destinations</span>
                  </div>
                  <p>{selectedProgram.cities.join(" → ")}</p>
                </div>
                
                <div className="bg-luxury-beige/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Experience Type</span>
                  </div>
                  <p>{selectedProgram.type}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="font-serif text-xl font-bold text-foreground mb-4">Journey Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProgram.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h4 className="font-serif text-xl font-bold text-foreground mb-4">What's Included</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Luxury accommodation in handpicked riads and hotels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Private transportation with experienced driver</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Expert local guides for cultural immersion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Exclusive access to private experiences and workshops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Daily breakfast and selected meals featuring local cuisine</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>24/7 concierge service for personalized adjustments</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                  Begin Your Journey
                </button>
                <button className="flex-1 border border-primary text-primary py-3 px-6 rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300">
                  Customize This Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default SpecialPackagesSection;