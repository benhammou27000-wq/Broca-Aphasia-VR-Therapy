// برنامج التشخيص الأرطفوني الذكي - ملف JavaScript الرئيسي

// البيانات والمتغيرات العامة
let currentAssessment = {
    childName: '',
    childAge: 0,
    parentName: '',
    parentPhone: '',
    answers: [],
    currentQuestion: 0,
    selectedAnswer: null
};

// قاعدة الأسئلة الكاملة
const allQuestions = [
    // الأسئلة المشتركة
    {
        id: 'c_001',
        age_group: '2-3',
        type: 'parent',
        question: 'في أي سن قال الطفل أول كلمة؟',
        weight: 2,
        answers: [
            { text: 'قبل 12 شهر', score: 3, disorders: [] },
            { text: 'بين 12 و 18 شهر', score: 2, disorders: ['language_delay'] },
            { text: 'بين 18 و 24 شهر', score: 1, disorders: ['language_delay'] },
            { text: 'بعد سنتين', score: 0, disorders: ['language_delay', 'language_development'] }
        ]
    },
    {
        id: 'c_002',
        age_group: '2-3',
        type: 'parent',
        question: 'هل الطفل يفهم التعليمات البسيطة؟',
        weight: 2,
        answers: [
            { text: 'نعم، يفهم كويس', score: 3, disorders: [] },
            { text: 'نعم، لكن شوية صعوبة', score: 2, disorders: ['auditory_processing', 'language_delay'] },
            { text: 'لا، ما يفهم والو', score: 0, disorders: ['auditory_processing', 'language_delay', 'language_development'] }
        ]
    },
    {
        id: 'c_003',
        age_group: '3-4',
        type: 'parent',
        question: 'الطفل كيفاش قدرة على الكلام؟ قد قول كلمات شنية بالتقريب؟',
        weight: 2,
        answers: [
            { text: 'أكثر من 50 كلمة', score: 3, disorders: [] },
            { text: 'بين 20 و 50 كلمة', score: 2, disorders: ['language_delay'] },
            { text: 'أقل من 20 كلمة', score: 0, disorders: ['language_delay', 'language_development'] },
            { text: 'ما يتكلم والو', score: 0, disorders: ['language_delay', 'language_development'] }
        ]
    },
    {
        id: 'c_004',
        age_group: '3-5',
        type: 'child',
        question: 'قول لي كلمة: ماما',
        weight: 2,
        answers: [
            { text: 'ينطقها صحيح', score: 3, disorders: [] },
            { text: 'ينطقها مغلوط شوية', score: 1, disorders: ['articulation'] },
            { text: 'ما يقولها', score: 0, disorders: ['articulation', 'language_delay'] }
        ]
    },
    {
        id: 'c_005',
        age_group: '2-7',
        type: 'parent',
        question: 'الطفل عندو مشكلة في السمع؟',
        weight: 3,
        answers: [
            { text: 'لا، السمع عادي', score: 3, disorders: [] },
            { text: 'نعم، هو أصم أو فيه نقص سمع', score: 0, disorders: ['auditory_processing', 'language_delay', 'language_development'] }
        ]
    },
    // أسئلة تأخر اللغة
    {
        id: 'ld_001',
        age_group: '2-3',
        type: 'parent',
        question: 'الطفل ينطق الكلمات بوضوح ولا يقول كلمات غير مفهومة؟',
        weight: 2,
        answers: [
            { text: 'نعم، واضح وسهل', score: 3, disorders: [] },
            { text: 'نعم، لكن شوية عسير الفهم', score: 1, disorders: ['language_delay'] },
            { text: 'لا، كلام غير واضح', score: 0, disorders: ['language_delay'] }
        ]
    },
    {
        id: 'ld_002',
        age_group: '2-4',
        type: 'parent',
        question: 'الطفل يربط بين الكلمات أو يقول جملة بسيطة؟',
        weight: 2,
        answers: [
            { text: 'نعم، يقول جمل صحيحة', score: 3, disorders: [] },
            { text: 'نعم، لكن كلام بسيط', score: 2, disorders: ['language_delay'] },
            { text: 'لا، فقط كلمات منفردة', score: 0, disorders: ['language_delay'] }
        ]
    },
    {
        id: 'ld_003',
        age_group: '3-5',
        type: 'parent',
        question: 'الطفل يسأل أسئلة عادي مثل شنو هذا أو ليش؟',
        weight: 2,
        answers: [
            { text: 'نعم، يسأل كويس', score: 3, disorders: [] },
            { text: 'أحياناً يسأل', score: 1, disorders: ['language_delay'] },
            { text: 'لا، ما يسأل والو', score: 0, disorders: ['language_delay'] }
        ]
    },
    // أسئلة اضطراب النطق
    {
        id: 'art_001',
        age_group: '3-5',
        type: 'child',
        question: 'قول لي كلمة: سيارة',
        weight: 1,
        answers: [
            { text: 'ينطقها صحيح', score: 3, disorders: [] },
            { text: 'ينطقها غير صحيح شوية', score: 1, disorders: ['articulation'] },
            { text: 'ما يقدر ينطقها', score: 0, disorders: ['articulation'] }
        ]
    },
    {
        id: 'art_002',
        age_group: '3-5',
        type: 'child',
        question: 'قول لي كلمة: زهرة',
        weight: 1,
        answers: [
            { text: 'ينطقها صحيح', score: 3, disorders: [] },
            { text: 'ينطقها غير صحيح', score: 1, disorders: ['articulation'] },
            { text: 'ما يقدر', score: 0, disorders: ['articulation'] }
        ]
    },
    {
        id: 'art_003',
        age_group: '4-7',
        type: 'parent',
        question: 'هل الطفل نطقو صعب على الناس الغرباء يفهموه؟',
        weight: 2,
        answers: [
            { text: 'لا، الجميع يفهمو', score: 3, disorders: [] },
            { text: 'أحياناً يعسر الفهم', score: 1, disorders: ['articulation'] },
            { text: 'نعم، صعب يفهموه', score: 0, disorders: ['articulation'] }
        ]
    },
    // أسئلة اضطراب التأتأة
    {
        id: 'stut_001',
        age_group: '3-7',
        type: 'parent',
        question: 'الطفل يتلعثم أو يكرر الحروف والكلمات؟',
        weight: 3,
        answers: [
            { text: 'لا، كلام سلس', score: 3, disorders: [] },
            { text: 'أحياناً، لكن نادر', score: 1, disorders: ['stuttering'] },
            { text: 'نعم، متكرر', score: 0, disorders: ['stuttering'] }
        ]
    },
    {
        id: 'stut_002',
        age_group: '3-7',
        type: 'parent',
        question: 'الطفل يخاف أو يتردد قبل ما يتكلم أو يتجنب الكلام؟',
        weight: 2,
        answers: [
            { text: 'لا، كل شي عادي', score: 3, disorders: [] },
            { text: 'أحياناً يتردد', score: 1, disorders: ['stuttering'] },
            { text: 'نعم، يتجنب الكلام', score: 0, disorders: ['stuttering'] }
        ]
    },
    // أسئلة اضطراب الصوت
    {
        id: 'voice_001',
        age_group: '2-7',
        type: 'parent',
        question: 'صوت الطفل حاد أو خشن أو غير عادي؟',
        weight: 2,
        answers: [
            { text: 'لا، صوت عادي', score: 3, disorders: [] },
            { text: 'شوية غير عادي', score: 1, disorders: ['voice_disorder'] },
            { text: 'نعم، خشن أو ضعيف جداً', score: 0, disorders: ['voice_disorder'] }
        ]
    },
    {
        id: 'voice_002',
        age_group: '2-7',
        type: 'parent',
        question: 'الطفل يسعل كثير أو عندو بحة في الصوت؟',
        weight: 2,
        answers: [
            { text: 'لا، عادي', score: 3, disorders: [] },
            { text: 'أحياناً', score: 1, disorders: ['voice_disorder'] },
            { text: 'نعم، دايم', score: 0, disorders: ['voice_disorder'] }
        ]
    },
    // أسئلة اضطراب معالجة السمع
    {
        id: 'aud_001',
        age_group: '3-7',
        type: 'parent',
        question: 'الطفل يرد على سؤال واحد لوكا تقول ليه مرة واحدة فقط؟',
        weight: 2,
        answers: [
            { text: 'نعم، يسمع أول مرة', score: 3, disorders: [] },
            { text: 'أحياناً، لازم تكرر', score: 1, disorders: ['auditory_processing'] },
            { text: 'لا، دايم تكرر', score: 0, disorders: ['auditory_processing'] }
        ]
    },
    {
        id: 'aud_002',
        age_group: '3-7',
        type: 'parent',
        question: 'الطفل يشتت انتباهو بسهولة من الأصوات؟',
        weight: 2,
        answers: [
            { text: 'لا، منتبو', score: 3, disorders: [] },
            { text: 'أحياناً يشتت', score: 1, disorders: ['auditory_processing'] },
            { text: 'نعم، كثير يشتت', score: 0, disorders: ['auditory_processing'] }
        ]
    },
    // أسئلة اضطراب النمو اللغوي
    {
        id: 'ld_dev_001',
        age_group: '2-4',
        type: 'parent',
        question: 'الطفل يشير بإصبعو للأشياء أو الناس عندما تسأله؟',
        weight: 2,
        answers: [
            { text: 'نعم، يشير كويس', score: 3, disorders: [] },
            { text: 'أحياناً يشير', score: 1, disorders: ['language_development'] },
            { text: 'لا، ما يشير والو', score: 0, disorders: ['language_development'] }
        ]
    },
    {
        id: 'ld_dev_002',
        age_group: '3-5',
        type: 'parent',
        question: 'الطفل يفهم الكلمات المختلفة مثل البيت، الأكل، الحيوانات؟',
        weight: 2,
        answers: [
            { text: 'نعم، يفهم كويس', score: 3, disorders: [] },
            { text: 'يفهم شوية كلمات', score: 1, disorders: ['language_development'] },
            { text: 'لا، ما يفهم', score: 0, disorders: ['language_development'] }
        ]
    }
];

// قائمة الاضطرابات
const disorders = {
    'language_delay': {
        name: 'تأخر اللغة',
        description: 'تأخر في تطور اللغة والكلام'
    },
    'articulation': {
        name: 'اضطراب النطق',
        description: 'صعوبة في نطق الأصوات والكلمات بشكل صحيح'
    },
    'voice_disorder': {
        name: 'اضطراب الصوت',
        description: 'مشاكل في جودة الصوت أو قوته'
    },
    'stuttering': {
        name: 'اضطراب الطلاقة/التأتأة',
        description: 'تلعثم وتكرار الحروف والكلمات'
    },
    'auditory_processing': {
        name: 'اضطراب معالجة السمع',
        description: 'صعوبة في فهم واستيعاب ما يسمعه'
    },
    'language_development': {
        name: 'اضطراب النمو اللغوي',
        description: 'تأخر في النمو اللغوي الشامل'
    }
};

// دالة بدء الاختبار
function startAssessment() {
    const childName = document.getElementById('childName').value;
    const childAge = document.getElementById('childAge').value;
    const parentName = document.getElementById('parentName').value;
    const parentPhone = document.getElementById('parentPhone').value;

    // التحقق من البيانات
    if (!childName || !childAge || !parentName || !parentPhone) {
        alert('يرجى ملء جميع المعلومات');
        return;
    }

    // حفظ البيانات
    currentAssessment.childName = childName;
    currentAssessment.childAge = parseInt(childAge);
    currentAssessment.parentName = parentName;
    currentAssessment.parentPhone = parentPhone;
    currentAssessment.answers = [];
    currentAssessment.currentQuestion = 0;

    // الذهاب لشاشة الأسئلة
    showScreen('questionScreen');
    loadQuestion();
}

// دالة تحميل السؤال
function loadQuestion() {
    const filteredQuestions = filterQuestionsByAge();
    
    if (currentAssessment.currentQuestion >= filteredQuestions.length) {
        showResults();
        return;
    }

    const question = filteredQuestions[currentAssessment.currentQuestion];
    
    // تحديث رقم السؤال
    const currentNum = currentAssessment.currentQuestion + 1;
    document.getElementById('questionNumber').textContent = `السؤال ${currentNum} من ${filteredQuestions.length}`;
    
    // تحديث شريط التقدم
    const progress = (currentAssessment.currentQuestion / filteredQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // عرض السؤال
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionType').textContent = question.type === 'parent' ? 'سؤال للوالدين' : 'سؤال للطفل';
    document.getElementById('questionType').className = 'question-type ' + question.type;
    
    // عرض الإجابات
    const answersGrid = document.getElementById('answersGrid');
    answersGrid.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer.text;
        btn.onclick = () => selectAnswer(index, answer);
        answersGrid.appendChild(btn);
    });
    
    // تعطيل زر التالي في البداية
    document.getElementById('nextBtn').disabled = true;
    currentAssessment.selectedAnswer = null;
}

// دالة اختيار الإجابة
function selectAnswer(index, answerData) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    currentAssessment.selectedAnswer = {
        index: index,
        data: answerData
    };
    
    document.getElementById('nextBtn').disabled = false;
}

// دالة الذهاب للسؤال التالي
function nextQuestion() {
    if (!currentAssessment.selectedAnswer) {
        alert('يرجى اختيار إجابة');
        return;
    }

    // حفظ الإجابة
    const filteredQuestions = filterQuestionsByAge();
    const currentQuestion = filteredQuestions[currentAssessment.currentQuestion];
    
    currentAssessment.answers.push({
        question: currentQuestion.question,
        answer: currentAssessment.selectedAnswer.data.text,
        score: currentAssessment.selectedAnswer.data.score,
        weight: currentQuestion.weight,
        disorders: currentAssessment.selectedAnswer.data.disorders || []
    });

    currentAssessment.currentQuestion++;
    loadQuestion();
}

// دالة العودة للسؤال السابق
function previousQuestion() {
    if (currentAssessment.currentQuestion > 0) {
        currentAssessment.currentQuestion--;
        currentAssessment.answers.pop();
        loadQuestion();
    }
}

// دالة تصفية الأسئلة حسب السن
function filterQuestionsByAge() {
    const age = currentAssessment.childAge;
    const ageGroup = age.toString();
    
    return allQuestions.filter(q => {
        const ageRanges = q.age_group.split('-').map(Number);
        return age >= ageRanges[0] && age <= ageRanges[1];
    });
}

// دالة عرض النتائج
function showResults() {
    // حساب الدرجات
    const disorderScores = {};
    
    // تهيئة القاموس
    Object.keys(disorders).forEach(d => {
        disorderScores[d] = { score: 0, weight: 0 };
    });
    
    // حساب النقاط
    currentAssessment.answers.forEach(answer => {
        answer.disorders.forEach(disorder => {
            if (disorderScores[disorder]) {
                disorderScores[disorder].score += answer.score;
                disorderScores[disorder].weight += answer.weight;
            }
        });
    });
    
    // حساب الاحتمالية
    const probabilities = {};
    Object.keys(disorderScores).forEach(disorder => {
        const data = disorderScores[disorder];
        if (data.weight > 0) {
            const avgScore = data.score / data.weight;
            const probability = Math.max(0, Math.min(100, (avgScore / 3) * 100));
            probabilities[disorder] = probability;
        } else {
            probabilities[disorder] = 0;
        }
    });
    
    // تحديد الاضطراب الأساسي
    let primaryDisorder = null;
    let maxProbability = 0;
    
    Object.keys(probabilities).forEach(disorder => {
        if (probabilities[disorder] > maxProbability) {
            maxProbability = probabilities[disorder];
            primaryDisorder = disorder;
        }
    });
    
    // تحديد مستوى الشدة
    let severity = 'عادي';
    if (maxProbability >= 80) {
        severity = 'شديد';
    } else if (maxProbability >= 50) {
        severity = 'متوسط';
    } else if (maxProbability >= 20) {
        severity = 'طفيف';
    }
    
    // عرض النتائج
    document.getElementById('diagnosisName').textContent = primaryDisorder ? disorders[primaryDisorder].name : 'لم يتم تحديد';
    document.getElementById('confidenceScore').textContent = Math.round(maxProbability) + '%';
    document.getElementById('severityBadge').textContent = severity;
    
    // معلومات الطفل
    document.getElementById('resultChildInfo').textContent = 
        `${currentAssessment.childName} (${currentAssessment.childAge} سنة)`;
    
    // عدد الأسئلة
    document.getElementById('answeredQuestions').textContent = currentAssessment.answers.length;
    
    // النسبة المئوية
    const totalScore = currentAssessment.answers.reduce((sum, a) => sum + (a.score * a.weight), 0);
    const maxScore = currentAssessment.answers.reduce((sum, a) => sum + (3 * a.weight), 0);
    const percentage = Math.round((totalScore / maxScore) * 100);
    document.getElementById('performancePercentage').textContent = percentage + '%';
    
    // عرض جدول الاضطرابات
    const tableBody = document.getElementById('disordersTableBody');
    tableBody.innerHTML = '';
    
    const sortedDisorders = Object.keys(probabilities).sort((a, b) => probabilities[b] - probabilities[a]);
    
    sortedDisorders.forEach(disorder => {
        const prob = probabilities[disorder];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${disorders[disorder].name}</td>
            <td>
                <div class="probability-bar">
                    <div class="probability-fill" style="width: ${prob}%">
                        ${Math.round(prob)}%
                    </div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // عرض التوصيات
    const recommendations = getRecommendations(primaryDisorder, severity);
    const recList = document.getElementById('recommendationsList');
    recList.innerHTML = '';
    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recList.appendChild(li);
    });
    
    // الذهاب لشاشة النتائج
    showScreen('resultsScreen');
}

// دالة الحصول على التوصيات
function getRecommendations(disorder, severity) {
    const baseRecommendations = {
        'language_delay': [
            'زيادة التفاعل اللغوي مع الطفل يومياً',
            'قراءة القصص والكتب معاً بانتظام',
            'تشجيع الطفل على الكلام والاستجابة',
            'تجنب استخدام لغة معقدة، استخدم جمل بسيطة',
            'جلسات أرطفونية منتظمة بحسب الحاجة'
        ],
        'articulation': [
            'تمارين نطق بسيطة في المنزل',
            'الاستماع إلى الكلمات الصحيحة من البالغين',
            'عدم السخرية من أخطاء الطفل',
            'جلسات أرطفونية متخصصة',
            'ممارسة الكلمات الصعبة بشكل متدرج'
        ],
        'stuttering': [
            'عدم مقاطعة الطفل أثناء الكلام',
            'إعطاء الطفل الوقت الكافي للتحدث',
            'تجنب الضغط على الطفل',
            'جلسات أرطفونية متخصصة في علاج التأتأة',
            'الاسترخاء والتنفس العميق قبل الكلام'
        ],
        'voice_disorder': [
            'تجنب الصراخ والتهاب الحلق',
            'شرب الماء بانتظام',
            'تجنب الدخان والتلوث',
            'جلسات أرطفونية لتحسين صحة الصوت',
            'فحص طبي من قبل متخصص الأنف والأذن'
        ],
        'auditory_processing': [
            'تقليل الضوضاء في بيئة الطفل',
            'التحدث بوضوح وببطء',
            'التأكد من توجه الطفل نحوك',
            'فحص السمع عند متخصص',
            'جلسات تدريبية على معالجة السمع'
        ],
        'language_development': [
            'دعم شامل للنمو اللغوي',
            'توفير بيئة غنية باللغة',
            'التفاعل المستمر مع الطفل',
            'الاستشارة الطبية الشاملة',
            'برنامج تدخل متخصص ومكثف'
        ]
    };

    let recommendations = baseRecommendations[disorder] || [];

    if (severity === 'شديد') {
        recommendations.unshift('استشارة فورية مع أخصائي أرطفوني');
        recommendations.push('فحص طبي شامل من قبل طبيب الأطفال');
        recommendations.push('جلسات علاجية منتظمة ومكثفة');
    } else if (severity === 'متوسط') {
        recommendations.unshift('جلسات أرطفونية منتظمة');
        recommendations.push('متابعة دورية مع الأخصائي');
    }

    return recommendations;
}

// دالة عرض الشاشة
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// دالة إعادة تعيين الاختبار
function resetAssessment() {
    if (confirm('هل تريد بدء اختبار جديد؟')) {
        currentAssessment = {
            childName: '',
            childAge: 0,
            parentName: '',
            parentPhone: '',
            answers: [],
            currentQuestion: 0,
            selectedAnswer: null
        };
        
        document.getElementById('childName').value = '';
        document.getElementById('childAge').value = '';
        document.getElementById('parentName').value = '';
        document.getElementById('parentPhone').value = '';
        
        showScreen('welcomeScreen');
    }
}

// دالة طباعة التقرير
function printReport() {
    window.print();
}

// دالة تحميل PDF
function downloadReport() {
    alert('سيتم إضافة ميزة تحميل PDF قريباً');
    // هنا يمكن إضافة مكتبة pdfkit أو jsPDF
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل التطبيق بنجاح');
});
