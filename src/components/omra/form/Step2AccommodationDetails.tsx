import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Hotel, Bed, Users } from 'lucide-react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface TravelPartyData {
  adults: number;
  children: number;
  ages: number[];
}

interface TravelPartyStepProps {
  data: TravelPartyData;
  onChange: (data: Partial<TravelPartyData>) => void;
}

const TravelPartyStep = ({ data, onChange }: TravelPartyStepProps) => {
  const { isRTL } = useLanguage();

  const updateCount = (type: 'adults' | 'children', increment: boolean) => {
    const currentValue = data[type];
    const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
    
    if (type === 'adults' && newValue < 1) return; // At least 1 adult required
    
    onChange({ [type]: newValue });
  };

  const updateAge = (index: number, age: number) => {
    const newAges = [...data.ages];
    newAges[index] = age;
    onChange({ ages: newAges });
  };

  const totalTravelers = data.adults + data.children;
  const needAges = data.children;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Adults - Responsive Card */}
      <Card className="p-4 sm:p-6 group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-islamic rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className={`font-semibold text-base sm:text-lg text-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'بالغين' : 'Adults'}
              </h4>
              <p className={`text-xs sm:text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'العمر 18 سنة فما فوق' : 'Age 18 years and above'}
              </p>
            </div>
          </div>
          
          <div className={`flex items-center justify-between sm:justify-end w-full sm:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-3 sm:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('adults', false)}
                disabled={data.adults <= 1}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-primary/10 transition-colors flex-shrink-0"
              >
                <FaMinus className="w-2 h-2 sm:w-3 sm:h-3" />
              </Button>
              <span className="text-xl sm:text-2xl font-bold w-8 sm:w-12 text-center text-primary">
                {data.adults}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('adults', true)}
                disabled={data.adults >= 10}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-primary/10 transition-colors flex-shrink-0"
              >
                <FaPlus className="w-2 h-2 sm:w-3 sm:h-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Children - Responsive Card */}
      <Card className="p-4 sm:p-6 group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className={`font-semibold text-base sm:text-lg text-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'أطفال' : 'Children'}
              </h4>
              <p className={`text-xs sm:text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'العمر 0-17 سنة' : 'Age 0-17 years'}
              </p>
            </div>
          </div>
          
          <div className={`flex items-center justify-between sm:justify-end w-full sm:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-3 sm:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('children', false)}
                disabled={data.children <= 0}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-yellow-500/10 transition-colors flex-shrink-0"
              >
                <FaMinus className="w-2 h-2 sm:w-3 sm:h-3" />
              </Button>
              <span className="text-xl sm:text-2xl font-bold w-8 sm:w-12 text-center text-yellow-600">
                {data.children}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('children', true)}
                disabled={data.children >= 8}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-yellow-500/10 transition-colors flex-shrink-0"
              >
                <FaPlus className="w-2 h-2 sm:w-3 sm:h-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Ages for children - Responsive Grid */}
      {needAges > 0 && (
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-background/80 to-muted/20 border-dashed border-2 border-muted-foreground/30">
          <h4 className={`font-semibold text-lg mb-4 sm:mb-6 text-foreground ${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
            {isRTL ? 'أعمار الأطفال' : 'Children Ages'}
          </h4>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: needAges }).map((_, index) => (
              <div key={index} className="relative group">
                <select
                  id={`age-${index}`}
                  value={data.ages[index] || ''}
                  onChange={(e) => updateAge(index, parseInt(e.target.value) || 0)}
                  className={`h-10 sm:h-12 w-full rounded-md border border-muted-foreground/20 px-3 py-2 text-sm sm:text-base transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <option value="">{isRTL ? `الطفل ${index + 1}` : `Child ${index + 1}`}</option>
                  <option value="0">{isRTL ? 'أقل من سنة' : '< 1 year'}</option>
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((age) => (
                    <option key={age} value={age}>
                      {age} {isRTL ? (age === 1 ? 'سنة' : 'سنوات') : (age === 1 ? 'year' : 'years')}
                    </option>
                  ))}
                </select>
                <Label
                  htmlFor={`age-${index}`}
                  className={`absolute -top-2 bg-background px-2 text-xs sm:text-sm font-medium text-muted-foreground transition-all duration-200 ${
                    isRTL ? 'right-2 sm:right-3 font-amiri' : 'left-2 sm:left-3 font-inter'
                  }`}
                >
                  {isRTL ? `طفل ${index + 1}` : `Child ${index + 1}`}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Summary - Responsive */}
      <div className="relative overflow-hidden rounded-xl p-4 sm:p-6 bg-gradient-to-br from-islamic-green/10 via-yellow-500/5 to-islamic-green/10 border border-islamic-green/20 backdrop-blur-sm text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-islamic-green/5 to-transparent"></div>
        <div className="relative z-10">
          <h4 className={`font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-islamic-green-dark ${isRTL ? 'font-amiri' : 'font-playfair'}`}>
            {isRTL ? 'ملخص المسافرين' : 'Travelers Summary'}
          </h4>
          <p className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-islamic bg-clip-text text-transparent ${isRTL ? 'font-amiri' : 'font-playfair'}`}>
            {totalTravelers} {isRTL ? 'مسافر' : 'travelers'}
          </p>
          <p className={`text-sm sm:text-base text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
            {data.adults} {isRTL ? 'بالغ' : 'adults'}, {data.children} {isRTL ? 'طفل' : 'children'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Step2AccommodationDetails: React.FC = () => {
  const { isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();

  const handleHotelCategoryChange = (category: string) => {
    const currentCategories = Array.isArray(formData.hotelCategories) ? formData.hotelCategories : [];
    const isSelected = currentCategories.includes(category);

    const updatedCategories = isSelected
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];

    updateFormData({
      hotelCategories: updatedCategories,
      hotelCategory: updatedCategories.join(', ')
    });
  };

  const handleRoomCountChange = (count: number) => {
    const roomCount = Math.max(1, Math.min(20, count)); // Limit between 1-20 rooms
    updateFormData({ numberOfRooms: roomCount });
  };

  const handleTravelPartyChange = (data: Partial<TravelPartyData>) => {
    const currentTravelParty = formData.travelParty || { adults: 1, children: 0, ages: [] };
    const updatedTravelParty = { ...currentTravelParty, ...data };
    updateFormData({ travelParty: updatedTravelParty });
  };

  const travelParty = formData.travelParty || { adults: 1, children: 0, ages: [] };

  // Hotel categories with star emojis
  const hotelCategories = [
    { 
      value: '4-star', 
      labelEn: '4 ⭐ Hotels', 
      labelAr: '4 ⭐ فنادق',
      descriptionEn: 'Comfortable and reliable accommodation',
      descriptionAr: 'إقامة مريحة وموثوقة'
    },
    { 
      value: '5-star', 
      labelEn: '5 ⭐ Hotels', 
      labelAr: '5 ⭐ فنادق',
      descriptionEn: 'Luxury experience with premium services',
      descriptionAr: 'تجربة فاخرة مع خدمات مميزة'
    },
    { 
      value: 'deluxe', 
      labelEn: '5 ⭐ Deluxe', 
      labelAr: '5 ⭐ ديلوكس',
      descriptionEn: 'Ultimate luxury and exclusive services',
      descriptionAr: 'أقصى درجات الفخامة والخدمات الحصرية'
    }
  ];

  return (
    <div className={`space-y-6 sm:space-y-8 ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}>
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-islamic-green/20">
          <Hotel className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
        </div>
        <h3 className={`text-xl sm:text-2xl font-bold text-islamic-green mb-2 ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {isRTL ? 'تفاصيل الإقامة' : 'Accommodation Details'}
        </h3>
        <p className={`text-sm sm:text-base text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
          {isRTL ? 'يرجى تحديد تفضيلات الإقامة' : 'Please specify your accommodation preferences'}
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Travel Party with Age Categories */}
        <div className="space-y-4">
          <Label className={`flex items-center space-x-2 text-sm sm:text-base ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Users className="w-4 h-4 text-islamic-green flex-shrink-0" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'تفاصيل المسافرين' : 'Travel Party Details'} *
            </span>
          </Label>
          <TravelPartyStep 
            data={travelParty} 
            onChange={handleTravelPartyChange} 
          />
        </div>

        {/* Hotel Category - Responsive Checkboxes */}
        <div className="space-y-4">
          <Label className={`flex items-center space-x-2 text-sm sm:text-base ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Hotel className="w-4 h-4 text-islamic-green flex-shrink-0" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'فئة الفندق' : 'Hotel Category'} *
            </span>
          </Label>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 ${isRTL ? 'sm:grid-rtl' : ''}`}>
            {hotelCategories.map((category) => {
              const currentCategories = Array.isArray(formData.hotelCategories) ? formData.hotelCategories : [];
              const isSelected = currentCategories.includes(category.value);

              return (
                <div
                  key={category.value}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-islamic-green bg-islamic-green/10 shadow-lg shadow-islamic-green/20 scale-105'
                      : 'border-muted-foreground/20 bg-card hover:border-islamic-green/50 hover:shadow-md'
                  }`}
                  onClick={() => handleHotelCategoryChange(category.value)}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected ? 'bg-islamic-green' : 'bg-muted'
                      }`}>
                        <Hotel className={`w-4 h-4 sm:w-6 sm:h-6 ${
                          isSelected ? 'text-white' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor={category.value}
                          className={`cursor-pointer font-bold text-sm sm:text-base transition-colors block ${
                            isSelected ? 'text-islamic-green-dark' : 'text-foreground'
                          } ${isRTL ? 'font-amiri' : 'font-inter'}`}
                        >
                          {isRTL ? category.labelAr : category.labelEn}
                        </Label>
                        <p className={`text-xs text-muted-foreground line-clamp-2 ${
                          isRTL ? 'font-amiri' : 'font-inter'
                        }`}>
                          {isRTL ? category.descriptionAr : category.descriptionEn}
                        </p>
                      </div>
                      <Checkbox
                        id={category.value}
                        checked={isSelected}
                        onCheckedChange={() => handleHotelCategoryChange(category.value)}
                        className="data-[state=checked]:bg-islamic-green data-[state=checked]:border-islamic-green h-4 w-4 sm:h-5 sm:w-5"
                      />
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-islamic-green/5 via-islamic-green/10 to-islamic-green/5" />
                  )}
                </div>
              );
            })}
          </div>
          
          {errors.hotelCategory && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {errors.hotelCategory}
            </p>
          )}
        </div>

        {/* Number of Rooms - Fully Responsive */}
        <div className="space-y-4">
          <Label className={`flex items-center space-x-2 text-sm sm:text-base ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Bed className="w-4 h-4 text-islamic-green flex-shrink-0" />
            <span className={isRTL ? 'font-amiri' : 'font-poppins'}>
              {isRTL ? 'عدد الغرف' : 'Number of Rooms'} *
            </span>
          </Label>
          
          <div className="group relative overflow-hidden rounded-xl border-2 border-islamic-green/20 bg-gradient-to-br from-card to-islamic-green/5 hover:border-islamic-green/50 transition-all duration-300 shadow-md hover:shadow-xl">
            <div className="p-4 sm:p-6">
              <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-islamic-green to-islamic-green-light rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Bed className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <Label className={`font-semibold text-sm sm:text-base text-foreground ${isRTL ? 'font-amiri' : 'font-poppins'}`}>
                      {isRTL ? 'الغرف المطلوبة' : 'Rooms Required'}
                    </Label>
                    <p className={`text-xs text-muted-foreground ${isRTL ? 'font-amiri' : 'font-poppins'}`}>
                      {isRTL ? 'اختر عدد الغرف المناسب' : 'Select the number of rooms needed'}
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center justify-between sm:justify-end w-full sm:w-auto ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`flex items-center space-x-2 sm:space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <button
                      type="button"
                      onClick={() => handleRoomCountChange((formData.numberOfRooms || 1) - 1)}
                      disabled={(formData.numberOfRooms || 1) <= 1}
                      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-islamic-green/30 hover:border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-md hover:shadow-lg flex-shrink-0"
                    >
                      <FaMinus className="w-2 h-2 sm:w-3 sm:h-3" />
                    </button>
                    <div className="relative">
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={formData.numberOfRooms || 1}
                        onChange={(e) => handleRoomCountChange(parseInt(e.target.value) || 1)}
                        className="w-12 sm:w-14 md:w-16 text-center text-lg sm:text-xl md:text-2xl font-bold text-islamic-green border-2 border-islamic-green/30 focus:border-islamic-green rounded-lg sm:rounded-xl shadow-inner bg-white/80"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRoomCountChange((formData.numberOfRooms || 1) + 1)}
                      disabled={(formData.numberOfRooms || 1) >= 20}
                      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-islamic-green/30 hover:border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-md hover:shadow-lg flex-shrink-0"
                    >
                      <FaPlus className="w-2 h-2 sm:w-3 sm:h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {errors.numberOfRooms && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {errors.numberOfRooms}
            </p>
          )}
        </div>
      </div>

      {/* Info Section - Responsive */}
      <div className="bg-islamic-green/10 p-4 sm:p-6 rounded-lg border border-islamic-green/20 backdrop-blur-sm">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-islamic-green rounded-full flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">ℹ</span>
            </div>
          </div>
          <div className={`flex-1 ${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
            <p className="text-xs sm:text-sm text-islamic-green-dark">
              {isRTL 
                ? 'سيتم تخصيص الغرف بناءً على عدد الضيوف والفئة المختارة. الأسعار قابلة للتغيير حسب الموسم.'
                : 'Rooms will be allocated based on guest count and selected category. Prices may vary depending on the season.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};