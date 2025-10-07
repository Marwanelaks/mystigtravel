import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaUsers, FaMinus, FaPlus, FaChild, FaBaby } from "react-icons/fa";

interface TravelPartyData {
  adults: number;
  children: number;
  infants: number;
  ages: number[];
}

interface TravelPartyStepProps {
  data: TravelPartyData;
  onChange: (data: Partial<TravelPartyData>) => void;
}

export const TravelPartyStep = ({ data, onChange }: TravelPartyStepProps) => {
  const { t, isRTL } = useLanguage();

  const updateCount = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
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

  const totalTravelers = data.adults + data.children + data.infants;
  const needAges = data.children + data.infants;

  return (
    <div className="space-y-8 fade-in-up">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-islamic-green/20">
          <FaUsers className="w-8 h-8 text-white drop-shadow-sm" />
        </div>
        <h3 className={`text-3xl font-bold mb-4 bg-gradient-islamic bg-clip-text text-transparent ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {t('form.step2.title')}
        </h3>
        <p className={`text-lg text-muted-foreground leading-relaxed ${
          isRTL ? 'font-amiri' : 'font-inter'
        }`}>
          {t('form.step2.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Adults */}
        <Card className="p-6 group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-gradient-islamic rounded-full flex items-center justify-center shadow-md">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className={`font-semibold text-lg text-foreground ${
                  isRTL ? 'font-amiri' : 'font-inter'
                }`}>
                  {t('form.step2.adults')}
                </h4>
                <p className={`text-sm text-muted-foreground ${
                  isRTL ? 'font-amiri' : 'font-inter'
                }`}>
                  {t('form.step2.adultsDesc')}
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('adults', false)}
                disabled={data.adults <= 1}
                className="h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
              >
                <FaMinus className="w-3 h-3" />
              </Button>
              <span className="text-2xl font-bold w-12 text-center text-primary">
                {data.adults}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('adults', true)}
                disabled={data.adults >= 10}
                className="h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Children */}
        <Card className="p-6 group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-islamic-gold to-islamic-gold-dark rounded-full flex items-center justify-center shadow-md">
                <FaChild className="w-6 h-6 text-white" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className={`font-semibold text-lg text-foreground ${
                  isRTL ? 'font-amiri' : 'font-inter'
                }`}>
                  {t('form.step2.children')}
                </h4>
                <p className={`text-sm text-muted-foreground ${
                  isRTL ? 'font-amiri' : 'font-inter'
                }`}>
                  {t('form.step2.childrenDesc')}
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('children', false)}
                disabled={data.children <= 0}
                className="h-10 w-10 rounded-full hover:bg-islamic-gold/10 transition-colors"
              >
                <FaMinus className="w-3 h-3" />
              </Button>
              <span className="text-2xl font-bold w-12 text-center text-islamic-gold-dark">
                {data.children}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('children', true)}
                disabled={data.children >= 8}
                className="h-10 w-10 rounded-full hover:bg-islamic-gold/10 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Infants */}
        <Card className="p-6 group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-md">
                <FaBaby className="w-6 h-6 text-white" />
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h4 className={`font-semibold text-lg text-foreground ${
                  isRTL ? 'font-amiri' : 'font-inter'
                }`}>
                  {t('form.step2.infants')}
                </h4>
                <p className={`text-sm text-muted-foreground ${
                  isRTL ? 'font-amiri' : 'font-inter'
                }`}>
                  {t('form.step2.infantsDesc')}
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('infants', false)}
                disabled={data.infants <= 0}
                className="h-10 w-10 rounded-full hover:bg-accent/10 transition-colors"
              >
                <FaMinus className="w-3 h-3" />
              </Button>
              <span className="text-2xl font-bold w-12 text-center text-accent">
                {data.infants}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount('infants', true)}
                disabled={data.infants >= 4}
                className="h-10 w-10 rounded-full hover:bg-accent/10 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Ages for children and infants */}
        {needAges > 0 && (
          <Card className="p-6 bg-gradient-to-br from-background/80 to-muted/20 border-dashed border-2 border-muted-foreground/30">
            <h4 className={`font-semibold text-lg mb-6 text-foreground ${
              isRTL ? 'font-amiri text-right' : 'font-inter text-left'
            }`}>
              {t('form.step2.agesTitle')}
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              {Array.from({ length: needAges }).map((_, index) => {
                const isChild = index < data.children;
                return (
                  <div key={index} className="relative group">
                    <Input
                      id={`age-${index}`}
                      type="number"
                      min="0"
                      max={isChild ? "11" : "2"}
                      value={data.ages[index] || ''}
                      onChange={(e) => updateAge(index, parseInt(e.target.value) || 0)}
                      placeholder={`${isChild ? t('form.step2.children') : t('form.step2.infants')} ${index + 1}`}
                      className={`h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
                        isRTL ? 'text-right' : ''
                      }`}
                    />
                    <Label 
                      htmlFor={`age-${index}`}
                      className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
                        isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
                      }`}
                    >
                      {isChild ? t('form.step2.children') : t('form.step2.infants')} {index + 1} {t('form.step2.age')}
                    </Label>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Summary */}
        <div className="relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-islamic-green/10 via-islamic-gold/5 to-islamic-green/10 border border-islamic-green/20 backdrop-blur-sm text-center">
          <div className="absolute inset-0 bg-islamic-pattern opacity-5"></div>
          <div className="relative z-10">
            <h4 className={`font-semibold text-xl mb-3 text-islamic-green-dark ${
              isRTL ? 'font-amiri' : 'font-playfair'
            }`}>
              {t('form.step2.summary')}
            </h4>
            <p className={`text-3xl font-bold mb-2 bg-gradient-islamic bg-clip-text text-transparent ${
              isRTL ? 'font-amiri' : 'font-playfair'
            }`}>
              {totalTravelers} {t('form.step2.travelers')}
            </p>
            <p className={`text-muted-foreground ${
              isRTL ? 'font-amiri' : 'font-inter'
            }`}>
              {data.adults} {t('form.step2.adults')}, {data.children} {t('form.step2.children')}, {data.infants} {t('form.step2.infants')}
            </p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-islamic-green/10 via-islamic-gold/5 to-islamic-green/10 border border-islamic-green/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-islamic-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-8 h-8 bg-gradient-islamic rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-islamic-green-dark mb-2 ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {isRTL ? 'ملاحظة هامة' : 'Important Note'}
              </h4>
              <p className={`text-sm leading-relaxed text-muted-foreground ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {t('form.step2.note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};