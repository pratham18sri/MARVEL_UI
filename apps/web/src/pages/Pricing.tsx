import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { GlowButton, MarvelButton, MarvelModal } from 'pratham-ui';
import { Check, Sparkles, HelpCircle } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
}

export const Pricing: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  
  // Developer Sim payment modal state
  const [simModalOpen, setSimModalOpen] = useState(false);
  const [mockOrderDetails, setMockOrderDetails] = useState<any>(null);

  const faqs = [
    { q: "What is PrathamUI?", a: "PrathamUI is a high-performance React component library designed with a unique Marvel dark style system, featuring arc reactor glows and cybernetic panels." },
    { q: "Is there a free tier?", a: "Yes, our 'Free Shield' tier gives you absolute lifetime access to all basic categories: buttons, cards, forms, and navigation buttons." },
    { q: "How does the developer CLI add components?", a: "Using 'npx pratham-ui add <component-name>', components are downloaded directly into your React project repository. For Pro components, the CLI requests your API key." },
    { q: "How do subscriptions work?", a: "Subscriptions are billed through Razorpay. You can cancel at any time. In developer mock mode, payments can be simulated for testing purposes." }
  ];

  useEffect(() => {
    // Fetch plans
    fetch('/api/payments/plans')
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error(err));

    // Inject Razorpay checkout script if not present
    if (!document.getElementById('razorpay-checkout-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-checkout-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleUpgrade = async (planId: string) => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/pricing');
      return;
    }

    setLoadingPlanId(planId);
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });
      const order = await res.json();

      if (!res.ok) {
        alert(order.message || 'Failed to initialize transaction');
        setLoadingPlanId(null);
        return;
      }

      // Check if it is a Developer Mock Order
      if (order.isMock) {
        setMockOrderDetails({ ...order, planId });
        setSimModalOpen(true);
        setLoadingPlanId(null);
        return;
      }

      // Real Razorpay integration
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_mockKeyId123',
        amount: order.amount,
        currency: order.currency,
        name: 'PrathamUI Premium',
        description: `Upgrade to Pro - ${planId === 'pro_monthly' ? 'Monthly' : 'Yearly'}`,
        order_id: order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              plan: planId,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            useAuthStore.getState().checkAuth(); // update state
            alert("Upgrade completed successfully! Welcome to Arc Pro 🎉");
            navigate('/dashboard');
          } else {
            alert(verifyData.message || 'Signature verification failed');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: '#E62429',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      alert('Error initializing payment window');
    } finally {
      setLoadingPlanId(null);
    }
  };

  const handleSimulateSuccess = async () => {
    if (!mockOrderDetails) return;

    try {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: mockOrderDetails.id,
          razorpayPaymentId: `pay_mock_${Math.random().toString(36).substring(2, 10)}`,
          signature: `mock_signature_hex_${Math.random().toString(36).substring(2, 15)}`,
          plan: mockOrderDetails.planId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        useAuthStore.getState().checkAuth(); // update state
        setSimModalOpen(false);
        alert("Simulated Upgrade completed successfully! Account updated to Pro 🎉");
        navigate('/dashboard');
      } else {
        alert(data.message || 'Simulation verification rejected');
      }
    } catch (error) {
      console.error(error);
      alert('Error during simulation');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left relative">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h1 className="font-marvel text-4xl sm:text-5xl font-extrabold text-white tracking-wider uppercase">
          Arc Core Pricing Plans
        </h1>
        <p className="text-sm text-[#A8A9AD] font-sans">
          Deploy premium React modules in your apps. Select the shield configuration that fits your assembly needs.
        </p>
      </div>

      {/* Cards columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch mb-24">
        {plans.map((p) => {
          const isPro = p.id.startsWith('pro');
          const isYearly = p.id === 'pro_yearly';
          
          return (
            <div
              key={p.id}
              className={`relative bg-[#141414] border rounded-2xl p-6 flex flex-col justify-between shadow-lg group transition-all duration-300 ${
                isYearly 
                  ? 'border-[#F0B90B] shadow-[0_0_20px_rgba(240,185,11,0.15)] md:scale-105 z-10' 
                  : 'border-white/5 hover:border-[#E62429]/40 hover:shadow-[0_0_20px_rgba(230,36,41,0.15)]'
              }`}
            >
              {isYearly && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F0B90B] text-black font-extrabold text-[9px] tracking-widest uppercase px-3 py-1 rounded-full shadow-[0_0_10px_rgba(240,185,11,0.5)]">
                  BEST VALUE (SAVE 37%)
                </span>
              )}

              {/* Card top */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-marvel text-xl font-bold text-white uppercase tracking-wider">
                    {p.name}
                  </h3>
                  {isPro && (
                    <span className="text-[#F0B90B] shrink-0">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </span>
                  )}
                </div>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="font-marvel text-4xl font-extrabold text-white">
                    ₹{p.price}
                  </span>
                  <span className="text-xs text-[#A8A9AD] font-mono lowercase">
                    / {p.period}
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-3.5 mb-8">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-[#A8A9AD] font-sans">
                      <Check className={`w-4.5 h-4.5 shrink-0 ${isPro ? 'text-[#F0B90B]' : 'text-emerald-500'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase button */}
              <div>
                {p.price === 0 ? (
                  <Link to="/components" className="w-full block">
                    <MarvelButton variant="outline" className="w-full">
                      Acquire Shield
                    </MarvelButton>
                  </Link>
                ) : (
                  <GlowButton
                    onClick={() => handleUpgrade(p.id)}
                    className="w-full"
                  >
                    {loadingPlanId === p.id ? 'Charging Suit...' : `Deploy ${p.name}`}
                  </GlowButton>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Grid */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="font-marvel text-2xl font-bold uppercase tracking-wider text-white text-center mb-8 flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#E62429]" />
          Shield Support Archives
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#141414] border border-white/5 p-5 rounded-xl space-y-2">
              <h4 className="font-marvel text-sm font-bold text-white tracking-wide uppercase">
                {faq.q}
              </h4>
              <p className="text-xs text-[#A8A9AD] leading-relaxed font-sans">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Sim Payment Modal */}
      <MarvelModal isOpen={simModalOpen} onClose={() => setSimModalOpen(false)} title="🛠️ DEVELOPER SANDBOX PAY SIM">
        <div className="space-y-4">
          <p className="text-xs text-[#A8A9AD]">
            Razorpay developer mock mode is triggered. No actual merchant transaction is needed to complete testing.
          </p>
          <div className="bg-[#0A0A0A] p-3 rounded border border-white/5 space-y-1 font-mono text-[10px] text-[#A8A9AD]">
            <p><span className="text-[#E62429]">Mock Order:</span> {mockOrderDetails?.id}</p>
            <p><span className="text-[#E62429]">Plan ID:</span> {mockOrderDetails?.planId}</p>
            <p><span className="text-[#E62429]">Amount:</span> ₹{mockOrderDetails?.amount / 100}</p>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <MarvelButton variant="outline" className="!py-1" onClick={() => setSimModalOpen(false)}>
              Abort
            </MarvelButton>
            <MarvelButton variant="gold" className="!py-1" onClick={handleSimulateSuccess}>
              Simulate Successful Upgrade
            </MarvelButton>
          </div>
        </div>
      </MarvelModal>
    </div>
  );
};
export default Pricing;
