import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FaCalendarAlt } from 'react-icons/fa';

export const Step3TripPreferences: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();
  const [dateType, setDateType] = useState<'FLEXIBLE' | 'SPECIFIC'>(
    (formData.dateType === 'FLEXIBLE' || formData.dateType === 'SPECIFIC') ? formData.dateType : 'SPECIFIC'
  );

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleDateTypeChange = (value: 'FLEXIBLE' | 'SPECIFIC') => {
    setDateType(value);
    updateFormData({ dateType: value });
  };

  // Generate dynamic months - current month + next 12 months
  const months = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January)
    
    const monthNamesEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const monthNamesAr = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    const generatedMonths = [];
    
    // Start from current month (i = 0) and go up to 12 months ahead (i <= 12)
    for (let i = 0; i <= 12; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const year = currentYear + Math.floor((currentMonth + i) / 12);
      
      const monthValue = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
      const monthLabel = isRTL 
        ? `${monthNamesAr[monthIndex]} ${year}`
        : `${monthNamesEn[monthIndex]} ${year}`;
      
      // Add current month indicator
      const isCurrentMonth = i === 0;
      const displayLabel = isCurrentMonth 
        ? (isRTL ? `${monthLabel} (الحالي)` : `${monthLabel} (Current)`)
        : monthLabel;
      
      generatedMonths.push({
        value: monthValue,
        label: displayLabel,
        isCurrent: isCurrentMonth
      });
    }
    
    return generatedMonths;
  }, [isRTL]);

  return (
    <div className={`space-y-8 fade-in-up ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}>
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-islamic-green/20">
          <FaCalendarAlt className="w-8 h-8 text-white drop-shadow-sm" />
        </div>
        <h3 className={`text-3xl font-bold mb-4 bg-gradient-islamic bg-clip-text text-transparent ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {isRTL ? 'تفضيلات الرحلة' : 'Trip Preferences'}
        </h3>
        <p className={`text-lg text-muted-foreground leading-relaxed ${
          isRTL ? 'font-amiri' : 'font-inter'
        }`}>
          {isRTL ? 'اختر تواريخ سفرك' : 'Choose your travel dates'}
        </p>
      </div>

      {/* Date Type Selection */}
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-muted-foreground/20">
        <h4 className={`font-semibold text-lg mb-4 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
          {isRTL ? 'نوع التاريخ' : 'Date Type'} *
        </h4>
        <RadioGroup
          value={dateType}
          onValueChange={(value) => handleDateTypeChange(value as 'FLEXIBLE' | 'SPECIFIC')}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FLEXIBLE" id="flexible" />
            <Label htmlFor="flexible" className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'تاريخ مرن (اختر شهر)' : 'Flexible Date (Select a month)'}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="SPECIFIC" id="specific" />
            <Label htmlFor="specific" className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'تاريخ محدد' : 'Specific Date'}
            </Label>
          </div>
        </RadioGroup>
      </Card>

      {/* Conditional Date Fields */}
      {dateType === 'FLEXIBLE' ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="flexibleMonth" className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'اختر الشهر' : 'Select Month'} *
            </Label>
            <Select
              value={formData.flexibleMonth || ''}
              onValueChange={(value) => handleInputChange('flexibleMonth', value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder={isRTL ? 'اختر شهر السفر' : 'Select travel month'} />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem
                    key={month.value}
                    value={month.value}
                    className={month.isCurrent ? 'bg-islamic-green/10 font-semibold' : ''}
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.flexibleMonth && (
              <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {errors.flexibleMonth}
              </p>
            )}
          </div>

          {/* Duration Fields for Flexible Dates */}
          <Card className="p-6 bg-background/50 backdrop-blur-sm border-muted-foreground/20">
            <h4 className={`font-semibold text-lg mb-4 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {isRTL ? 'المدة المحتملة للرحلة' : 'Probable Trip Duration'}
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="flexibleDurationFrom" className={isRTL ? 'font-amiri' : 'font-inter'}>
                  {isRTL ? 'من (أيام)' : 'From (days)'}
                </Label>
                <Select
                  value={formData.flexibleDurationFrom || ''}
                  onValueChange={(value) => handleInputChange('flexibleDurationFrom', value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={isRTL ? 'اختر الحد الأدنى' : 'Select minimum'} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day} {isRTL ? (day === 1 ? 'يوم' : 'أيام') : (day === 1 ? 'day' : 'days')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="flexibleDurationTo" className={isRTL ? 'font-amiri' : 'font-inter'}>
                  {isRTL ? 'إلى (أيام)' : 'To (days)'}
                </Label>
                <Select
                  value={formData.flexibleDurationTo || ''}
                  onValueChange={(value) => handleInputChange('flexibleDurationTo', value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={isRTL ? 'اختر الحد الأقصى' : 'Select maximum'} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 28 }, (_, i) => i + 1)
                      .filter(day => !formData.flexibleDurationFrom || day >= parseInt(formData.flexibleDurationFrom))
                      .map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day} {isRTL ? (day === 1 ? 'يوم' : 'أيام') : (day === 1 ? 'day' : 'days')}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className={`text-sm text-muted-foreground mt-3 ${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
              {isRTL
                ? 'مثال: من 4 أيام إلى 8 أيام'
                : 'Example: From 4 days to 8 days'}
            </p>
          </Card>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative group">
            <Input
              id="departureDate"
              type="date"
              value={formData.departureDate || ''}
              onChange={(e) => handleInputChange('departureDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm"
              required
            />
            <Label htmlFor="departureDate" className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground ${
              isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
            }`}>
              {isRTL ? 'تاريخ المغادرة' : 'Departure Date'} *
            </Label>
            {errors.departureDate && (
              <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {errors.departureDate}
              </p>
            )}
          </div>

          <div className="relative group">
            <Input
              id="returnDate"
              type="date"
              value={formData.returnDate || ''}
              onChange={(e) => handleInputChange('returnDate', e.target.value)}
              min={formData.departureDate || new Date().toISOString().split('T')[0]}
              className="h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm"
              required
            />
            <Label htmlFor="returnDate" className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground ${
              isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
            }`}>
              {isRTL ? 'تاريخ العودة' : 'Return Date'} *
            </Label>
            {errors.returnDate && (
              <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {errors.returnDate}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tip Section */}
      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-islamic-green/10 via-islamic-gold/5 to-islamic-green/10 border border-islamic-green/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-islamic-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-8 h-8 bg-gradient-islamic rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-islamic-green-dark mb-2 ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {isRTL ? 'نصيحة' : 'Tip'}
              </h4>
              <p className={`text-sm leading-relaxed text-muted-foreground ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {isRTL 
                  ? 'التواريخ المرنة قد تساعدك في الحصول على أسعار أفضل وتوفر أكبر في الغرف.'
                  : 'Flexible dates may help you get better prices and greater room availability.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};