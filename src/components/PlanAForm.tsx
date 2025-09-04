import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Users, Calendar, MapPin, Clock, 
  ChevronRight, ChevronLeft, Send, CheckCircle, AlertCircle,
  MessageSquare, Plus, Minus, Baby, Info, ChevronDown, ChevronUp,
  Star, DollarSign, X
} from 'lucide-react';

interface PlanAFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface City {
  id: string;
  name: string;
  region: string;
  country: string;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  price: number;
  city: City;
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

enum TravelerType {
  ADULT = 'ADULT',
  CHILD = 'CHILD',
  INFANT = 'INFANT'
}

enum DemandStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  SENT = 'SENT'
}

interface TravelerForm {
  fullName: string;
  age: number;
  gender: Gender;
}

interface CitySelectionForm {
  cityId: string;
  startDate: string;
  endDate: string;
  duration: number;
  activityIds: string[];
}

const PlanAForm = ({ isOpen, onClose }: PlanAFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cities, setCities] = useState<City[]>([]);
  const [activities, setActivities] = useState<{ [cityId: string]: Activity[] }>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    mainTraveler: {
      fullName: '',
      email: '',
      phone: ''
    },
    numberOfTravelers: 1,
    travelers: [] as TravelerForm[],
    selectedCities: [] as string[],
    citySelections: {} as { [cityId: string]: CitySelectionForm },
    comment: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchCities();
      setFormData(prev => ({
        ...prev,
        travelers: Array(prev.numberOfTravelers).fill(null).map(() => ({
          fullName: '',
          age: 0,
          gender: Gender.MALE
        }))
      }));
    }
  }, [isOpen]);

  const fetchCities = async () => {
    try {
      // Mock city data - replace with actual API call
      const citiesData: City[] = [
        { id: '1', name: 'Marrakech', region: 'Marrakech-Safi', country: 'Morocco' },
        { id: '2', name: 'Fes', region: 'Fes-Meknes', country: 'Morocco' },
        { id: '3', name: 'Casablanca', region: 'Casablanca-Settat', country: 'Morocco' },
        { id: '4', name: 'Chefchaouen', region: 'Tanger-Tetouan-Al Hoceima', country: 'Morocco' },
      ];
      setCities(citiesData);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  const fetchActivitiesForCity = async (cityId: string) => {
    try {
      setLoading(true);
      // Mock activities data - replace with actual API call
      const mockActivities: { [key: string]: Activity[] } = {
        '1': [
          { 
            id: '1', 
            name: 'Cooking Class', 
            description: 'Learn to prepare traditional Moroccan dishes with a local chef in a beautiful riad setting. Includes market visit and meal.', 
            price: 500, 
            city: cities.find(c => c.id === '1') as City 
          },
          { 
            id: '2', 
            name: 'Hammam Experience', 
            description: 'Traditional Moroccan spa experience with steam bath, exfoliation, and massage. A rejuvenating cultural experience.', 
            price: 300, 
            city: cities.find(c => c.id === '1') as City 
          },
          { 
            id: '3', 
            name: 'Atlas Mountains Day Trip', 
            description: 'Scenic drive through Berber villages, visit to a traditional home, and hike to beautiful waterfalls.', 
            price: 700, 
            city: cities.find(c => c.id === '1') as City 
          }
        ],
        '2': [
          { 
            id: '4', 
            name: 'Medina Guided Tour', 
            description: 'Explore the ancient medina of Fes with a knowledgeable guide, visiting historical sites and artisan workshops.', 
            price: 400, 
            city: cities.find(c => c.id === '2') as City 
          },
          { 
            id: '5', 
            name: 'Pottery Workshop', 
            description: 'Hands-on experience creating traditional Fes pottery with master craftsmen in the famous pottery quarter.', 
            price: 350, 
            city: cities.find(c => c.id === '2') as City 
          }
        ],
        '3': [
          { 
            id: '6', 
            name: 'Hassan II Mosque Tour', 
            description: 'Guided tour of one of the largest and most beautiful mosques in the world, with stunning ocean views.', 
            price: 200, 
            city: cities.find(c => c.id === '3') as City 
          }
        ],
        '4': [
          { 
            id: '7', 
            name: 'Blue City Photography Tour', 
            description: 'Guided photography tour through the iconic blue streets of Chefchaouen, with tips from a professional photographer.', 
            price: 450, 
            city: cities.find(c => c.id === '4') as City 
          },
          { 
            id: '8', 
            name: 'Rif Mountains Hike', 
            description: 'Scenic hike through the Rif Mountains with panoramic views of the blue city and surrounding countryside.', 
            price: 400, 
            city: cities.find(c => c.id === '4') as City 
          }
        ]
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setActivities(prev => ({ ...prev, [cityId]: mockActivities[cityId] || [] }));
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTripPeriod = (): number => {
    return Object.values(formData.citySelections).reduce((total, selection) => {
      return total + (selection.duration || 0);
    }, 0);
  };

  const validateDateSequence = (): boolean => {
    const selections = Object.values(formData.citySelections);
    
    if (selections.length < 2) {
      setDateError(null);
      return true;
    }
    
    const sortedSelections = selections.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    for (let i = 0; i < sortedSelections.length - 1; i++) {
      const currentCity = sortedSelections[i];
      const nextCity = sortedSelections[i + 1];
      
      const currentEndDate = new Date(currentCity.endDate);
      const nextStartDate = new Date(nextCity.startDate);
      
      if (currentEndDate.toDateString() !== nextStartDate.toDateString()) {
        const currentCityName = cities.find(c => c.id === currentCity.cityId)?.name;
        const nextCityName = cities.find(c => c.id === nextCity.cityId)?.name;
        
        setDateError(`Décalage détecté : Départ de ${currentCityName} le ${currentEndDate.toLocaleDateString('fr-FR')} mais arrivée à ${nextCityName} le ${nextStartDate.toLocaleDateString('fr-FR')}. Les dates doivent être continues.`);
        return false;
      }
    }
    
    setDateError(null);
    return true;
  };

  const getMinStartDateForCity = (cityId: string): string => {
    const selections = Object.values(formData.citySelections);
    const currentSelection = formData.citySelections[cityId];
    
    if (!currentSelection) return '';
    
    const sortedSelections = selections.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    
    const currentIndex = sortedSelections.findIndex(s => s.cityId === cityId);
    
    if (currentIndex > 0) {
      const previousSelection = sortedSelections[currentIndex - 1];
      return previousSelection.endDate;
    }
    
    return '';
  };

  const handleNumberOfTravelersChange = (count: number) => {
    if (count < 1) return;
    
    setFormData(prev => {
      const currentTravelers = prev.travelers;
      const newTravelers = Array(count).fill(null).map((_, index) => 
        currentTravelers[index] || { fullName: '', age: 0, gender: Gender.MALE }
      );
      
      return {
        ...prev,
        numberOfTravelers: count,
        travelers: newTravelers
      };
    });
  };

  const updateTravelerInfo = (index: number, field: keyof TravelerForm, value: string | number) => {
    setFormData(prev => {
      const updatedTravelers = [...prev.travelers];
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        [field]: field === 'age' ? Number(value) : value
      };
      
      return {
        ...prev,
        travelers: updatedTravelers
      };
    });
  };

  const getTravelerType = (age: number): TravelerType => {
    if (age < 2) return TravelerType.INFANT;
    if (age < 12) return TravelerType.CHILD;
    return TravelerType.ADULT;
  };

  const getTravelerTypeLabel = (age: number): string => {
    if (age < 2) return 'Bébé (0-2 ans)';
    if (age < 12) return 'Enfant (2-12 ans)';
    return 'Adulte (12+ ans)';
  };

  const getTravelerIcon = (age: number) => {
    if (age < 2) return <Baby className="w-4 h-4" />;
    if (age < 12) return <Users className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  const getGenderIcon = (gender: Gender) => {
    return gender === Gender.MALE ? '♂' : '♀';
  };

  const handleCitySelection = (cityId: string, selected: boolean) => {
    if (selected) {
      setFormData(prev => ({
        ...prev,
        selectedCities: [...prev.selectedCities, cityId],
        citySelections: {
          ...prev.citySelections,
          [cityId]: {
            cityId,
            startDate: '',
            endDate: '',
            duration: 0,
            activityIds: []
          }
        }
      }));
      fetchActivitiesForCity(cityId);
    } else {
      setFormData(prev => ({
        ...prev,
        selectedCities: prev.selectedCities.filter(id => id !== cityId),
        citySelections: Object.fromEntries(
          Object.entries(prev.citySelections).filter(([id]) => id !== cityId)
        )
      }));
    }
    setDateError(null);
  };

  const updateCitySelection = (cityId: string, field: string, value: any) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        citySelections: {
          ...prev.citySelections,
          [cityId]: {
            ...prev.citySelections[cityId],
            [field]: value
          }
        }
      };

      if (field === 'startDate' || field === 'endDate') {
        const selection = updated.citySelections[cityId];
        if (selection.startDate && selection.endDate) {
          selection.duration = calculateDuration(selection.startDate, selection.endDate);
        }
      }

      return updated;
    });
    
    setTimeout(() => validateDateSequence(), 100);
  };

  const isStep1Valid = (): boolean => {
    if (!formData.mainTraveler.fullName || !formData.mainTraveler.email || !formData.mainTraveler.phone) {
      return false;
    }

    return formData.travelers.every(traveler => 
      traveler.fullName && traveler.age > 0
    );
  };

  const isStep2Valid = (): boolean => {
    return formData.selectedCities.length > 0 && 
           Object.values(formData.citySelections).every(selection => 
             selection.startDate && selection.endDate && selection.duration > 0
           ) &&
           !dateError;
  };

  const handleSubmit = async () => {
    if (!validateDateSequence()) {
      alert('Veuillez corriger le décalage entre les dates avant de soumettre.');
      return;
    }

    setSubmitting(true);
    try {
      // Create the demand object matching the backend structure
      const demandData = {
        clientInfo: {
          mainTraveler: formData.mainTraveler,
          travelers: formData.travelers.map(t => ({
            fullName: t.fullName,
            age: t.age,
            gender: t.gender,
            type: getTravelerType(t.age)
          })),
          tripPeriod: calculateTripPeriod()
        },
        cities: formData.selectedCities.map(cityId => {
          const selection = formData.citySelections[cityId];
          const city = cities.find(c => c.id === cityId);
          return {
            city: city!,
            startDate: selection.startDate,
            endDate: selection.endDate,
            durationDays: selection.duration,
            activities: activities[cityId]?.filter(a => selection.activityIds.includes(a.id)) || [],
            roomSelections: []
          };
        }),
        status: DemandStatus.PENDING,
        totalPrice: 0,
        comment: formData.comment,
        globalServices: [],
        benefitPercentage: 0,
        taxPercentage: 0
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Reset form
      setFormData({
        mainTraveler: { fullName: '', email: '', phone: '' },
        numberOfTravelers: 1,
        travelers: [{ fullName: '', age: 0, gender: Gender.MALE }],
        selectedCities: [],
        citySelections: {},
        comment: ''
      });
      setCurrentStep(1);
      setDateError(null);
      onClose();

      alert('Votre demande a été envoyée avec succès! Nous vous contactons sous 72h maximum.');
    } catch (error) {
      console.error('Submit error:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 2 && !validateDateSequence()) {
      alert('Veuillez corriger le décalage entre les dates avant de continuer.');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const toggleActivityDescription = (activityId: string) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Plan A - Programme Personnalisé</h2>
              <p className="text-gray-600">Créez votre voyage sur mesure</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1 - Traveler Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-500" />
                Informations des Voyageurs
              </h3>

              {/* Voyageur Principal */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-500" />
                  Voyageur Principal (Contact)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
                    <input
                      type="text"
                      value={formData.mainTraveler.fullName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        mainTraveler: { ...prev.mainTraveler, fullName: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.mainTraveler.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        mainTraveler: { ...prev.mainTraveler, email: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      value={formData.mainTraveler.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        mainTraveler: { ...prev.mainTraveler, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Nombre de Voyageurs */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Nombre de Voyageurs</h4>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleNumberOfTravelersChange(formData.numberOfTravelers - 1)}
                    disabled={formData.numberOfTravelers <= 1}
                    className="p-2 bg-gray-200 rounded-lg disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-bold">{formData.numberOfTravelers} voyageur(s)</span>
                  <button
                    onClick={() => handleNumberOfTravelersChange(formData.numberOfTravelers + 1)}
                    className="p-2 bg-gray-200 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Informations des Voyageurs */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-800">Informations des autres voyageurs</h4>
                {formData.travelers.map((traveler, index) => (
                  <div key={index} className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <h5 className="font-bold text-gray-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-orange-500" />
                      Voyageur {index + 1}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
                        <input
                          type="text"
                          value={traveler.fullName}
                          onChange={(e) => updateTravelerInfo(index, 'fullName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Âge *</label>
                        <input
                          type="number"
                          value={traveler.age}
                          onChange={(e) => updateTravelerInfo(index, 'age', Number(e.target.value))}
                          min="0"
                          max="120"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                          required
                        />
                        {traveler.age > 0 && (
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            {getTravelerIcon(traveler.age)}
                            <span className="ml-2">{getTravelerTypeLabel(traveler.age)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sexe *</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`gender-${index}`}
                              value={Gender.MALE}
                              checked={traveler.gender === Gender.MALE}
                              onChange={(e) => updateTravelerInfo(index, 'gender', e.target.value as Gender)}
                              className="text-blue-500"
                            />
                            <span className="flex items-center">
                              <span className="text-blue-500 mr-1">♂</span>
                              Masculin
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`gender-${index}`}
                              value={Gender.FEMALE}
                              checked={traveler.gender === Gender.FEMALE}
                              onChange={(e) => updateTravelerInfo(index, 'gender', e.target.value as Gender)}
                              className="text-pink-500"
                            />
                            <span className="flex items-center">
                              <span className="text-pink-500 mr-1">♀</span>
                              Féminin
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - City Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                Sélection des Villes
              </h3>

              {dateError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-semibold">{dateError}</p>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Choisissez vos destinations *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cities.map((city) => (
                    <div key={city.id} className="relative">
                      <input
                        type="checkbox"
                        id={`city-${city.id}`}
                        checked={formData.selectedCities.includes(city.id)}
                        onChange={(e) => handleCitySelection(city.id, e.target.checked)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`city-${city.id}`}
                        className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.selectedCities.includes(city.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            formData.selectedCities.includes(city.id)
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {formData.selectedCities.includes(city.id) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{city.name}</h4>
                            <p className="text-sm text-gray-600">{city.region}</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {formData.selectedCities.map((cityId) => {
                const city = cities.find(c => c.id === cityId);
                const selection = formData.citySelections[cityId];
                const cityActivities = activities[cityId] || [];
                const minStartDate = getMinStartDateForCity(cityId);

                return (
                  <div key={cityId} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                      {city?.name}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date d'arrivée *</label>
                        <input
                          type="date"
                          value={selection?.startDate || ''}
                          onChange={(e) => updateCitySelection(cityId, 'startDate', e.target.value)}
                          min={minStartDate}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                          required
                        />
                        {minStartDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Min: {new Date(minStartDate).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date de départ *</label>
                        <input
                          type="date"
                          value={selection?.endDate || ''}
                          onChange={(e) => updateCitySelection(cityId, 'endDate', e.target.value)}
                          min={selection?.startDate || ''}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Durée</label>
                        <input
                          type="text"
                          value={`${selection?.duration || 0} nuitées`}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                          disabled
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        Activités disponibles à {city?.name}
                      </label>
                      
                      {loading ? (
                        <div className="text-center py-4">
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          <p className="mt-2 text-gray-500">Chargement des activités...</p>
                        </div>
                      ) : cityActivities.length === 0 ? (
                        <div className="text-center py-6 bg-white rounded-lg border border-dashed border-gray-300">
                          <p className="text-gray-500">Aucune activité disponible pour cette ville</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cityActivities.map((activity) => (
                            <div key={activity.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                              <div className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-800">{activity.name}</h5>
                                    <div className="flex items-center mt-1">
                                      <DollarSign className="w-4 h-4 text-green-600" />
                                      <span className="text-green-600 font-medium ml-1">{activity.price} MAD</span>
                                    </div>
                                  </div>
                                  <input
                                    type="checkbox"
                                    id={`activity-${activity.id}`}
                                    checked={selection?.activityIds.includes(activity.id) || false}
                                    onChange={(e) => {
                                      const currentActivities = selection?.activityIds || [];
                                      const newActivities = e.target.checked
                                        ? [...currentActivities, activity.id]
                                        : currentActivities.filter(id => id !== activity.id);
                                      updateCitySelection(cityId, 'activityIds', newActivities);
                                    }}
                                    className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 mt-1"
                                  />
                                </div>
                                
                                <div className="mt-3">
                                  <button
                                    onClick={() => toggleActivityDescription(activity.id)}
                                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors w-full justify-between"
                                  >
                                    <span className="flex items-center">
                                      <Info className="w-4 h-4 mr-1" />
                                      {expandedActivity === activity.id ? 'Masquer les détails' : 'Voir les détails'}
                                    </span>
                                    {expandedActivity === activity.id ? (
                                      <ChevronUp className="w-4 h-4" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4" />
                                    )}
                                  </button>
                                  
                                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    expandedActivity === activity.id ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                                  }`}>
                                    <div className="pt-3 border-t border-gray-100">
                                      <p className="text-sm text-gray-600">{activity.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Durée totale du voyage</label>
                <input
                  type="text"
                  value={`${calculateTripPeriod()} nuitées`}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          )}

          {/* Step 3 - Summary */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Send className="w-6 h-6 mr-2 text-blue-500" />
                Récapitulatif de votre demande
              </h3>

              {/* Voyageurs Summary */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4">Informations des Voyageurs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <p><span className="font-semibold">Voyageur principal:</span> {formData.mainTraveler.fullName}</p>
                  <p><span className="font-semibold">Email:</span> {formData.mainTraveler.email}</p>
                  <p><span className="font-semibold">Téléphone:</span> {formData.mainTraveler.phone}</p>
                  <p><span className="font-semibold">Total voyageurs:</span> {formData.numberOfTravelers}</p>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-700">Détail des autres voyageurs:</h5>
                  {formData.travelers.map((traveler, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Voyageur {index + 1}: {traveler.fullName}</span>
                        <span className="text-sm text-gray-600 flex items-center">
                          {getTravelerIcon(traveler.age)}
                          <span className="ml-1">{getTravelerTypeLabel(traveler.age)}</span>
                          <span className="mx-2">•</span>
                          <span className={traveler.gender === Gender.MALE ? 'text-blue-500' : 'text-pink-500'}>
                            {getGenderIcon(traveler.gender)}
                          </span>
                          <span className="ml-1">{traveler.gender === Gender.MALE ? 'M' : 'F'}</span>
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {traveler.age} ans
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Villes Summary */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-800">Villes sélectionnées</h4>
                {Object.values(formData.citySelections).map((selection) => {
                  const city = cities.find(c => c.id === selection.cityId);
                  const selectedActivities = activities[selection.cityId]?.filter(a => 
                    selection.activityIds.includes(a.id)
                  ) || [];

                  return (
                    <div key={selection.cityId} className="bg-gray-50 rounded-xl p-4 border">
                      <h5 className="font-bold text-gray-800 mb-2">{city?.name}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <p><span className="font-semibold">Arrivée:</span> {new Date(selection.startDate).toLocaleDateString('fr-FR')}</p>
                        <p><span className="font-semibold">Départ:</span> {new Date(selection.endDate).toLocaleDateString('fr-FR')}</p>
                        <p><span className="font-semibold">Durée:</span> {selection.duration} nuitées</p>
                      </div>
                      {selectedActivities.length > 0 && (
                        <div>
                          <p className="font-semibold text-gray-700 mb-1">Activités:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedActivities.map((activity) => (
                              <span key={activity.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs">
                                {activity.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Comment Section */}
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-yellow-600" />
                  Commentaire additionnel
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Avez-vous des commentaires ou demandes spécifiques ?
                    </label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none resize-none"
                      placeholder="Ex: Préférences alimentaires, besoins spécifiques, demandes particulières..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <p className="text-green-800">
                  <span className="font-semibold">Note:</span> Après soumission, notre équipe vous contactera 
                  sous 72h maximum pour finaliser votre programme avec les hôtels, transports et services adaptés.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Précédent</span>
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={currentStep === 1 ? !isStep1Valid() : !isStep2Valid()}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Suivant</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center space-x-2 px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>{submitting ? 'Envoi...' : 'Envoyer la demande'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAForm;