import json
from datetime import datetime
from typing import Dict, List, Tuple

class DiagnosticEngine:
    """محرك التشخيص الذكي للاضطرابات اللغوية"""
    
    def __init__(self):
        self.disorders = {
            'language_delay': {
                'name_dz': 'تأخر اللغة',
                'name_ar': 'Language Delay',
                'severity_levels': ['طفيف', 'متوسط', 'شديد'],
                'age_specific': True
            },
            'articulation': {
                'name_dz': 'اضطراب النطق',
                'name_ar': 'Articulation Disorder',
                'severity_levels': ['طفيف', 'متوسط', 'شديد'],
                'age_specific': True
            },
            'voice_disorder': {
                'name_dz': 'اضطراب الصوت',
                'name_ar': 'Voice Disorder',
                'severity_levels': ['طفيف', 'متوسط', 'شديد'],
                'age_specific': False
            },
            'stuttering': {
                'name_dz': 'اضطراب الطلاقة',
                'name_ar': 'Stuttering/Fluency Disorder',
                'severity_levels': ['طفيف', 'متوسط', 'شديد'],
                'age_specific': True
            },
            'auditory_processing': {
                'name_dz': 'اضطراب معالجة السمع',
                'name_ar': 'Auditory Processing Disorder',
                'severity_levels': ['طفيف', 'متوسط', 'شديد'],
                'age_specific': True
            },
            'language_development': {
                'name_dz': 'اضطراب النمو اللغوي',
                'name_ar': 'Language Development Disorder',
                'severity_levels': ['طفيف', 'متوسط', 'شديد'],
                'age_specific': True
            }
        }
        
        self.disorder_scores = {}
        self.total_weight = 0
        self.answered_questions = 0
    
    def initialize_scores(self):
        """تهيئة درجات الاضطرابات"""
        self.disorder_scores = {disorder: {'score': 0, 'weight': 0} 
                                for disorder in self.disorders}
    
    def add_answer(self, answer_data: Dict):
        """
        إضافة إجابة وحساب التأثير
        
        Args:
            answer_data: {
                'score': النقاط,
                'weight': الوزن,
                'disorders': قائمة الاضطرابات المتأثرة
            }
        """
        self.answered_questions += 1
        self.total_weight += answer_data.get('weight', 1)
        
        # توزيع النقاط على الاضطرابات المتأثرة
        for disorder in answer_data.get('disorders', []):
            if disorder in self.disorder_scores:
                self.disorder_scores[disorder]['score'] += answer_data.get('score', 0)
                self.disorder_scores[disorder]['weight'] += answer_data.get('weight', 1)
    
    def calculate_probability(self) -> Dict:
        """حساب احتمالية كل اضطراب"""
        probabilities = {}
        
        for disorder, data in self.disorder_scores.items():
            if data['weight'] > 0:
                # حساب النسبة المئوية بناءً على النقاط والوزن
                avg_score = data['score'] / data['weight']
                # تحويل إلى نسبة من 0 إلى 100
                probability = max(0, min(100, (avg_score / 3) * 100))
                probabilities[disorder] = {
                    'score': data['score'],
                    'weight': data['weight'],
                    'probability': probability
                }
        
        return probabilities
    
    def diagnose(self, age: int) -> Tuple[str, float, str]:
        """
        تشخيص الاضطراب الرئيسي
        
        Returns:
            (اسم الاضطراب، درجة الثقة، مستوى الشدة)
        """
        probabilities = self.calculate_probability()
        
        # ترتيب الاضطرابات حسب الاحتمالية
        sorted_disorders = sorted(probabilities.items(), 
                                 key=lambda x: x[1]['probability'], 
                                 reverse=True)
        
        if not sorted_disorders:
            return None, 0, "لم يتم تشخيص"
        
        primary_disorder = sorted_disorders[0][0]
        confidence = sorted_disorders[0][1]['probability']
        
        # تحديد مستوى الشدة بناءً على النسبة
        if confidence >= 80:
            severity = 'شديد'
        elif confidence >= 50:
            severity = 'متوسط'
        elif confidence >= 20:
            severity = 'طفيف'
        else:
            severity = 'عادي'
        
        return primary_disorder, confidence, severity
    
    def get_recommendations(self, disorder: str, severity: str, age: int) -> List[str]:
        """الحصول على التوصيات العلاجية"""
        recommendations = {
            'language_delay': {
                'طفيف': [
                    'زيادة التفاعل اللغوي مع الطفل',
                    'قراءة القصص يومياً',
                    'تشجيع الكلام والاستجابة'
                ],
                'متوسط': [
                    'جلسات أرطفونية منتظمة (مرتان في الأسبوع)',
                    'تمارين نطق يومية',
                    'استشارة طبيب متخصص'
                ],
                'شديد': [
                    'جلسات مكثفة أسبوعياً',
                    'تقييم طبي شامل',
                    'برنامج تدخل متخصص'
                ]
            },
            'articulation': {
                'طفيف': [
                    'تمارين نطق بسيطة في المنزل',
                    'الاستماع إلى الكلمات الصحيحة'
                ],
                'متوسط': [
                    'جلسات أرطفونية منتظمة',
                    'تمارين نطق محددة'
                ],
                'شديد': [
                    'تقييم شامل للنطق',
                    'جلسات علاجية مكثفة'
                ]
            }
        }
        
        return recommendations.get(disorder, {}).get(severity, [])
    
    def should_continue_assessment(self) -> bool:
        """تحديد هل نستمر في الأسئلة أم لا"""
        if self.answered_questions < 5:
            return True
        
        # التحقق من وضوح التشخيص
        probabilities = self.calculate_probability()
        if not probabilities:
            return True
        
        sorted_probs = sorted(probabilities.values(), 
                            key=lambda x: x['probability'], 
                            reverse=True)
        
        # إذا كان الفرق كبير، نتوقف
        if len(sorted_probs) >= 2:
            difference = sorted_probs[0]['probability'] - sorted_probs[1]['probability']
            if difference > 30 and self.answered_questions >= 8:
                return False
        
        # الحد الأقصى من الأسئلة
        return self.answered_questions < 20


class ScoringSystem:
    """نظام الحساب والنقاط"""
    
    @staticmethod
    def calculate_final_score(answers: List[Dict]) -> Dict:
        """حساب النقاط النهائية"""
        total_score = sum(a.get('score', 0) * a.get('weight', 1) 
                         for a in answers)
        max_possible = sum(3 * a.get('weight', 1) for a in answers)
        
        percentage = (total_score / max_possible * 100) if max_possible > 0 else 0
        
        return {
            'total_score': total_score,
            'max_possible': max_possible,
            'percentage': round(percentage, 2)
        }
    
    @staticmethod
    def get_performance_level(percentage: float) -> str:
        """تحديد مستوى الأداء"""
        if percentage >= 80:
            return 'ممتاز'
        elif percentage >= 60:
            return 'جيد'
        elif percentage >= 40:
            return 'متوسط'
        else:
            return 'ضعيف'


if __name__ == "__main__":
    # اختبار المحرك
    engine = DiagnosticEngine()
    engine.initialize_scores()
    
    # إضافة بعض الإجابات للاختبار
    engine.add_answer({
        'score': 1,
        'weight': 2,
        'disorders': ['language_delay', 'articulation']
    })
    
    engine.add_answer({
        'score': 0,
        'weight': 1,
        'disorders': ['language_delay']
    })
    
    disorder, confidence, severity = engine.diagnose(age=3)
    print(f"التشخيص: {disorder}")
    print(f"درجة الثقة: {confidence}%")
    print(f"مستوى الشدة: {severity}")
