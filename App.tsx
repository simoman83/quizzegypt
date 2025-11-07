import React, { useState } from 'react';

// --- Icon Components (Defined outside main component to prevent re-renders) ---
const MarsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="6" />
    <line x1="15.9" y1="8.1" x2="21" y2="3" />
    <line x1="15" y1="3" x2="21" y2="3" />
    <line x1="21" y1="3" x2="21" y2="9" />
  </svg>
);

const VenusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="6" />
    <line x1="12" y1="15" x2="12" y2="21" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

// --- Reusable Button Component ---
interface ChoiceButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    className: string;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ label, icon, onClick, className }) => (
    <button
        onClick={onClick}
        className={`group flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl text-white font-bold shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${className}`}
    >
        <div className="transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <span className="mt-4 text-3xl sm:text-4xl tracking-wide">{label}</span>
    </button>
);

// --- Screen Components ---
type Selection = 'man' | 'woman';

interface QuizCardProps {
    onSelect: (selection: Selection) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ onSelect }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 sm:p-12 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100 text-center leading-tight">
            هل أنت رجل أم امرأة؟
        </h1>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ChoiceButton
                label="رجل"
                icon={<MarsIcon className="h-14 w-14 sm:h-16 sm:w-16" />}
                onClick={() => onSelect('man')}
                className="bg-sky-500 hover:bg-sky-600 focus:ring-sky-400"
            />
            <ChoiceButton
                label="امرأة"
                icon={<VenusIcon className="h-14 w-14 sm:h-16 sm:w-16" />}
                onClick={() => onSelect('woman')}
                className="bg-rose-500 hover:bg-rose-600 focus:ring-rose-400"
            />
        </div>
    </div>
);


// --- Policy Content ---
const PRIVACY_POLICY = {
  title: 'سياسة الخصوصية',
  content: (
    <div className="space-y-4 text-right text-slate-600 dark:text-slate-300">
      <p>
        في شركة كويز (Quiz Inc.)، نحن نحترم خصوصيتك. توضح سياسة الخصوصية هذه كيف نتعامل مع معلوماتك عند استخدامك لتطبيقنا.
      </p>
      <h3 className="font-bold pt-2 text-slate-700 dark:text-slate-200">المعلومات التي نجمعها</h3>
      <p>
        التطبيق يطلب منك تحديد جنسك (رجل أو امرأة). نحن لا نجمع أو نخزن أي معلومات تعريف شخصية أخرى. يتم استخدام اختيارك فقط لغرض وحيد وهو توجيهك إلى الرابط المخصص.
      </p>
      <h3 className="font-bold pt-2 text-slate-700 dark:text-slate-200">كيف نستخدم معلوماتك</h3>
      <p>
        يتم استخدام اختيارك لإعادة توجيه متصفحك إلى عنوان URL محدد مسبقًا. لا يتم تخزين هذا الاختيار أو ربطه بأي بيانات شخصية.
      </p>
       <h3 className="font-bold pt-2 text-slate-700 dark:text-slate-200">مشاركة المعلومات</h3>
      <p>
        نحن لا نشارك اختيارك أو أي بيانات أخرى مع أطراف ثالثة.
      </p>
    </div>
  ),
};

const REFUND_POLICY = {
  title: 'سياسة الاسترداد',
  content: (
     <div className="space-y-4 text-right text-slate-600 dark:text-slate-300">
        <p>
            تطبيقنا (Quiz Inc.) هو خدمة مجانية. نظرًا لعدم وجود أي رسوم أو مدفوعات مطلوبة لاستخدام التطبيق، فإن سياسة الاسترداد غير قابلة للتطبيق.
        </p>
         <p>
            لا توجد عمليات شراء داخل التطبيق، وبالتالي لا توجد مبالغ يمكن استردادها.
        </p>
    </div>
  ),
};

// --- Policy Modal Component ---
interface PolicyModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ title, content, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in"
    onClick={onClose}
    aria-modal="true"
    role="dialog"
  >
    <div
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          aria-label="إغلاق"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {content}
    </div>
  </div>
);


// --- Main App Component ---

// ========================================================================= //
// ========================================================================= //
//
//               >>>  ENTER YOUR REDIRECT URLs HERE  <<<
//
// You can enter different URLs for each choice, or use the same URL for both.
//
// ========================================================================= //
// ========================================================================= //
const REDIRECT_URL_FOR_MAN = 'https://egypthealth.netlify.app';
const REDIRECT_URL_FOR_WOMAN = 'https://egypthealth.netlify.app';


const App: React.FC = () => {
    // State to manage which policy is currently being viewed in the modal
    const [policyContent, setPolicyContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

    const handleSelect = (selection: Selection) => {
        // This function is called when a user makes a choice.
        // It redirects the user to the appropriate URL defined above.
        if (selection === 'man') {
            window.location.href = REDIRECT_URL_FOR_MAN;
        } else {
            window.location.href = REDIRECT_URL_FOR_WOMAN;
        }
    };

    return (
        <main className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen w-full flex justify-center px-4 pt-20 sm:pt-24 font-sans relative">
            <div className="w-full max-w-2xl">
                <QuizCard onSelect={handleSelect} />
            </div>
            
            {/* Render the modal if policyContent is not null */}
            {policyContent && (
                <PolicyModal
                    title={policyContent.title}
                    content={policyContent.content}
                    onClose={() => setPolicyContent(null)}
                />
            )}

            <footer className="absolute bottom-4 left-0 right-0 text-center">
                 <div className="text-xs text-gray-400 dark:text-gray-600">
                    <p className="mb-2">
                        {/* Use buttons that look like links to trigger the modal */}
                        <button onClick={() => setPolicyContent(PRIVACY_POLICY)} className="hover:underline mx-2 bg-transparent border-none p-0 cursor-pointer">سياسة الخصوصية</button>
                        <span className="opacity-50">|</span>
                        <button onClick={() => setPolicyContent(REFUND_POLICY)} className="hover:underline mx-2 bg-transparent border-none p-0 cursor-pointer">سياسة الاسترداد</button>
                    </p>
                     <p>
                        © 2024 Quiz Inc. جميع الحقوق محفوظة.
                    </p>
                </div>
            </footer>
        </main>
    );
};

export default App;
