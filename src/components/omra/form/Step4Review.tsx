import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, User, Hotel, Calendar, Users, Bed, Loader2 } from 'lucide-react';
import { umrahPublicAPI } from '@/services/umrah-api';

interface Step4ReviewProps {
  onSubmit: () => void;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({ onSubmit }) => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData } = useForm();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSpecialRequestsChange = (value: string) => {
    updateFormData({ specialRequests: value });
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) return;

    setIsSubmitting(true);
    try {
      // Prepare data ensuring all required fields from both versions
      const demandData = {
        fullName: formData.fullName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        phoneCountry: formData.phoneCountry,
        detectedCountry: formData.detectedCountry,
        // Accommodation fields
        hotelCategories: formData.hotelCategories || [],
        hotelCategory: formData.hotelCategory, // Keep for backward compatibility
        roomSelections: formData.roomSelections || {},
        numberOfRooms: formData.numberOfRooms || 1, // Add missing field
        // Travel party fields
        travelParty: {
          adults: formData.travelParty?.adults || 1,
          children: formData.travelParty?.children || 0,
          infants: formData.travelParty?.infants || 0,
          ages: formData.travelParty?.ages || [],
        },
        // Date fields
        dateType: (formData.dateType || 'SPECIFIC') as 'FLEXIBLE' | 'SPECIFIC',
        flexibleMonth: formData.flexibleMonth,
        flexibleDurationFrom: formData.flexibleDurationFrom,
        flexibleDurationTo: formData.flexibleDurationTo,
        departureDate: formData.departureDate || '',
        returnDate: formData.returnDate || '',
        // Additional fields
        specialRequests: formData.specialRequests || '',
        // Include any other fields that might be in formData
        ...formData
      };
      
      await umrahPublicAPI.createDemand(demandData);
      await onSubmit();
    } catch (error) {
      console.error('Submission failed:', error);
    }
    setIsSubmitting(false);
  };

  // Format month display for flexible dates
  const formatMonthDisplay = (monthValue: string) => {
    if (!monthValue) return '';
    
    const [year, month] = monthValue.split('-');
    const monthNamesEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthNamesAr = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    
    const monthIndex = parseInt(month) - 1;
    return isRTL 
      ? `${monthNamesAr[monthIndex]} ${year}`
      : `${monthNamesEn[monthIndex]} ${year}`;
  };

  // Get travel party data with defaults
  const travelParty = formData.travelParty || { adults: 1, children: 0, infants: 0, ages: [] };
  const totalGuests = travelParty.adults + travelParty.children + travelParty.infants;

  // Calculate number of rooms - check all possible sources
  const calculateNumberOfRooms = () => {
    // First check roomSelections (new structure)
    if (formData.roomSelections && Object.keys(formData.roomSelections).length > 0) {
      return Object.keys(formData.roomSelections).length;
    }
    // Then check numberOfRooms field
    if (formData.numberOfRooms && formData.numberOfRooms > 0) {
      return formData.numberOfRooms;
    }
    // Default to 1 room
    return 1;
  };

  const numberOfRooms = calculateNumberOfRooms();

  // Format hotel categories display - check both hotelCategories array and hotelCategory string
  const formatHotelCategories = () => {
    // Check new structure first (array)
    if (formData.hotelCategories && formData.hotelCategories.length > 0) {
      const categoryMap: { [key: string]: { en: string; ar: string } } = {
        '3-star': { en: '3-Star Hotels', ar: '3 نجوم' },
        '4-star': { en: '4-Star Hotels', ar: '4 نجوم' },
        '5-star': { en: '5-Star Hotels', ar: '5 نجوم' },
        'deluxe': { en: '5-Star Deluxe', ar: '5 نجوم ديلوكس' }
      };

      return formData.hotelCategories
        .map(cat => isRTL ? categoryMap[cat]?.ar : categoryMap[cat]?.en)
        .join(', ');
    }

    // Check old structure (single category)
    if (formData.hotelCategory) {
      const categoryMap: { [key: string]: { en: string; ar: string } } = {
        '3-star': { en: '3-Star Hotels', ar: '3 نجوم' },
        '4-star': { en: '4-Star Hotels', ar: '4 نجوم' },
        '5-star': { en: '5-Star Hotels', ar: '5 نجوم' },
        'deluxe': { en: '5-Star Deluxe', ar: '5 نجوم ديلوكس' }
      };
      
      return isRTL ? categoryMap[formData.hotelCategory]?.ar : categoryMap[formData.hotelCategory]?.en;
    }

    return isRTL ? 'لم يتم التحديد' : 'Not specified';
  };

  // Display room selections if available
  const renderRoomSelections = () => {
    if (!formData.roomSelections || Object.keys(formData.roomSelections).length === 0) {
      return null;
    }

    return (
      <div className="mt-4">
        <span className="font-medium block mb-2">
          {isRTL ? 'تفاصيل الغرف:' : 'Room Details:'}
        </span>
        <div className="space-y-2">
          {Object.entries(formData.roomSelections).map(([roomKey, room]) => (
            <div key={roomKey} className="bg-islamic-green/10 rounded-lg p-3 border border-islamic-green/20">
              <div className="font-medium">
                {isRTL ? `الغرفة ${parseInt(roomKey) + 1}` : `Room ${parseInt(roomKey) + 1}`}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {isRTL ? 
                  `${room.adults} بالغ، ${room.children} أطفال` : 
                  `${room.adults} adults, ${room.children} children`
                }
                {room.childrenAges && room.childrenAges.length > 0 && (
                  <div className="text-xs mt-1">
                    {isRTL ? `أعمار الأطفال: ${room.childrenAges.join(', ')}` : `Children ages: ${room.childrenAges.join(', ')}`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Display flexible duration if available
  const renderFlexibleDuration = () => {
    if (formData.dateType !== 'FLEXIBLE') return null;

    return (
      <div>
        <span className="font-medium">{isRTL ? 'المدة:' : 'Duration:'}</span>{' '}
        {formData.flexibleDurationFrom} - {formData.flexibleDurationTo} {isRTL ? 'ليالي' : 'nights'}
      </div>
    );
  };

  return (
    <div className={`space-y-8 ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-islamic-green/20">
          <FileText className="w-8 h-8 text-white drop-shadow-sm" />
        </div>
        <h3 className={`text-2xl font-bold text-islamic-green mb-2 ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {isRTL ? 'مراجعة وتقديم' : 'Review & Submit'}
        </h3>
        <p className={`text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
          {isRTL ? 'يرجى مراجعة جميع التفاصيل قبل التقديم' : 'Please review all details before submitting'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Personal Information */}
        <Card className="p-6">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <User className="w-5 h-5 text-islamic-green mr-2" />
            <h4 className={`font-semibold text-lg ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {isRTL ? 'المعلومات الشخصية' : 'Personal Information'}
            </h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">{isRTL ? 'الاسم:' : 'Name:'}</span> {formData.fullName || 'N/A'}
            </div>
            <div>
              <span className="font-medium">{isRTL ? 'البريد الإلكتروني:' : 'Email:'}</span> {formData.email || 'N/A'}
            </div>
            <div>
              <span className="font-medium">{isRTL ? 'الهاتف:' : 'Phone:'}</span> {formData.phone || 'N/A'}
            </div>
            {formData.phoneCountry && (
              <div>
                <span className="font-medium">{isRTL ? 'دولة الهاتف:' : 'Phone Country:'}</span> {formData.phoneCountry}
              </div>
            )}
          </div>
        </Card>

        {/* Travel Party */}
        <Card className="p-6">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Users className="w-5 h-5 text-islamic-green mr-2" />
            <h4 className={`font-semibold text-lg ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {isRTL ? 'تفاصيل المسافرين' : 'Travel Party Details'}
            </h4>
          </div>
          <div className="space-y-4 text-sm">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <span className="font-medium block text-blue-700">
                  {isRTL ? 'بالغين' : 'Adults'}
                </span>
                <span className="text-lg font-bold text-blue-800">
                  {travelParty.adults}
                </span>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <span className="font-medium block text-yellow-700">
                  {isRTL ? 'أطفال' : 'Children'}
                </span>
                <span className="text-lg font-bold text-yellow-800">
                  {travelParty.children}
                </span>
              </div>
              <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
                <span className="font-medium block text-pink-700">
                  {isRTL ? 'رضع' : 'Infants'}
                </span>
                <span className="text-lg font-bold text-pink-800">
                  {travelParty.infants}
                </span>
              </div>
            </div>
            
            {/* Display ages if available */}
            {(travelParty.children > 0 || travelParty.infants > 0) && travelParty.ages && travelParty.ages.length > 0 && (
              <div className="mt-4">
                <span className="font-medium block mb-2">
                  {isRTL ? 'أعمار الأطفال والرضع:' : 'Children and Infants Ages:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {travelParty.ages.map((age, index) => (
                    <div key={index} className="bg-islamic-green/10 rounded-lg px-3 py-1 border border-islamic-green/20">
                      {isRTL ? `عمر ${index + 1}:` : `Age ${index + 1}:`} {age} {isRTL ? 'سنة' : 'years'}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-200">
              <span className="font-medium">
                {isRTL ? 'إجمالي المسافرين:' : 'Total Travelers:'}
              </span>{' '}
              <span className="text-lg font-bold text-islamic-green">
                {totalGuests} {isRTL ? 'مسافر' : 'travelers'}
              </span>
            </div>
          </div>
        </Card>

        {/* Accommodation */}
        <Card className="p-6">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Hotel className="w-5 h-5 text-islamic-green mr-2" />
            <h4 className={`font-semibold text-lg ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {isRTL ? 'الإقامة' : 'Accommodation'}
            </h4>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-medium">{isRTL ? 'فئة الفندق:' : 'Hotel Category:'}</span>{' '}
              <span>{formatHotelCategories()}</span>
            </div>
            <div>
              <span className="font-medium block mb-2">{isRTL ? 'عدد الغرف:' : 'Number of Rooms:'}</span>
              <div className="flex items-center space-x-2 bg-islamic-green/10 rounded-lg p-3 border border-islamic-green/20">
                <Bed className="w-4 h-4 text-islamic-green" />
                <span className="font-bold text-lg text-islamic-green">
                  {numberOfRooms}
                </span>
                <span className="text-muted-foreground">
                  {isRTL ? 'غرفة' : 'room(s)'}
                </span>
              </div>
            </div>
            {renderRoomSelections()}
          </div>
        </Card>

        {/* Trip Preferences */}
        <Card className="p-6">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-5 h-5 text-islamic-green mr-2" />
            <h4 className={`font-semibold text-lg ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {isRTL ? 'تفضيلات الرحلة' : 'Trip Preferences'}
            </h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">{isRTL ? 'نوع التاريخ:' : 'Date Type:'}</span>{' '}
              {formData.dateType === 'FLEXIBLE' 
                ? (isRTL ? 'مرن' : 'Flexible') 
                : (isRTL ? 'محدد' : 'Specific')
              }
            </div>
            {formData.dateType === 'FLEXIBLE' ? (
              <>
                <div>
                  <span className="font-medium">{isRTL ? 'الشهر:' : 'Month:'}</span>{' '}
                  {formatMonthDisplay(formData.flexibleMonth)}
                </div>
                {renderFlexibleDuration()}
              </>
            ) : (
              <>
                <div>
                  <span className="font-medium">{isRTL ? 'تاريخ المغادرة:' : 'Departure Date:'}</span>{' '}
                  {formData.departureDate || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">{isRTL ? 'تاريخ العودة:' : 'Return Date:'}</span>{' '}
                  {formData.returnDate || 'N/A'}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Special Requests */}
        <Card className="p-6">
          <h4 className={`font-semibold text-lg mb-4 ${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
            {isRTL ? 'طلبات خاصة' : 'Special Requests'}
          </h4>
          <div className="space-y-2">
            <Label htmlFor="specialRequests" className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL 
                ? 'أي متطلبات خاصة أو معلومات إضافية؟'
                : 'Any special requirements or additional information?'
              }
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests || ''}
              onChange={(e) => handleSpecialRequestsChange(e.target.value)}
              placeholder={isRTL 
                ? 'يرجى مشاركة أي احتياجات خاصة أو طلبات إضافية...'
                : 'Please share any special needs or additional requests...'
              }
              rows={4}
              className={isRTL ? 'text-right' : 'text-left'}
            />
          </div>
        </Card>

        {/* Terms and Conditions */}
        <Card className="p-6 bg-islamic-green/10">
          <div className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className={`text-sm leading-relaxed ${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
              {isRTL 
                ? 'أقر بأنني راجعت جميع المعلومات المقدمة وأوافق على الشروط والأحكام وسياسة الخصوصية.'
                : 'I acknowledge that I have reviewed all the information and agree to the Terms and Conditions and Privacy Policy.'
              }
            </Label>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!agreedToTerms || isSubmitting}
            className="bg-gradient-islamic hover:bg-islamic-green-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {isRTL ? 'جاري الإرسال...' : 'Submitting...'}
              </>
            ) : (
              <span className={isRTL ? 'font-amiri' : 'font-inter'}>
                {isRTL ? 'إرسال الطلب' : 'Submit Request'}
              </span>
            )}
          </Button>
          <p className={`text-sm text-muted-foreground mt-4 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
            {isRTL 
              ? 'سيقوم فريقنا بمراجعة طلبك والاتصال بك خلال 24 ساعة'
              : 'Our team will review your request and contact you within 72 hours'
            }
          </p>
        </div>
      </div>
    </div>
  );
};