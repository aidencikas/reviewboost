import { useState, useRef, type FormEvent } from 'react';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';
import { Container } from '../ui/Container';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  quantity: string;
  message: string;
  website: string; // honeypot — must remain empty
}

interface FormErrors {
  businessName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  message?: string;
  submit?: string;
}

export function Contact() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const isSubmittingRef = useRef(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
    website: '', // honeypot
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = t.contact.validation.businessNameRequired;
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = t.contact.validation.contactPersonRequired;
    }
    if (!formData.email.trim()) {
      newErrors.email = t.contact.validation.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.contact.validation.emailInvalid;
    }

    if (formData.quantity) {
      const qty = parseInt(formData.quantity, 10);
      if (isNaN(qty) || qty < 1) {
        newErrors.quantity =
          language === 'lt'
            ? 'Kiekis turi būti bent 1'
            : 'Quantity must be at least 1';
      } else if (qty > 10000) {
        newErrors.quantity =
          language === 'lt'
            ? 'Kiekis negali viršyti 10 000'
            : 'Quantity cannot exceed 10,000';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmittingRef.current) return;
    if (!validate()) return;

    isSubmittingRef.current = true;
    setStatus('loading');
    setErrors({});

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: formData.businessName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          quantity: formData.quantity,
          message: formData.message,
          website: formData.website, // honeypot
          language,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Server-side validation errors
          setErrors(result.errors);
          setStatus('idle');
        } else {
          setStatus('error');
        }
        return;
      }

      // Success
      setStatus('success');
      setFormData({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        quantity: '',
        message: '',
        website: '',
      });
    } catch {
      setStatus('error');
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]'
              : 'bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc]'
          }`}
        />
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-[var(--color-blue-500)]" />
              <span className="text-eyebrow">{t.contact.eyebrow}</span>
              <div className="w-6 h-px bg-[var(--color-blue-500)]" />
            </div>

            <h2 className="text-section-title text-[var(--text-primary)] mb-4">
              {t.contact.headline}
            </h2>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {t.contact.description}
            </p>
          </div>

          {/* Service proposition + form — one shared centered column, so the
              boxes always align perfectly with the form edges */}
          <div className="max-w-2xl mx-auto">
          <ul
            className="
              grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4
              w-full mb-10 md:mb-14
            "
            aria-label={t.contact.headline}
          >
            {[
              { icon: 'price', ...t.contact.highlights.price },
              { icon: 'location', ...t.contact.highlights.location },
              { icon: 'onsite', ...t.contact.highlights.onsite },
              { icon: 'setup', ...t.contact.highlights.setup },
            ].map(({ icon, label, note }) => (
              <li
                key={icon}
                className="
                  flex flex-col items-center justify-center text-center gap-2
                  px-3 py-5 rounded-2xl
                  bg-[var(--bg-secondary)] border border-[var(--border-primary)]
                "
              >
                <span
                  className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center ${
                    icon === 'price'
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                      : 'bg-[var(--color-blue-500)]/10 text-[var(--color-blue-500)]'
                  }`}
                  aria-hidden="true"
                >
                  {icon === 'price' && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {icon === 'location' && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  )}
                  {icon === 'onsite' && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  )}
                  {icon === 'setup' && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{label}</span>
                <span className="text-xs text-[var(--text-muted)] leading-snug">{note}</span>
              </li>
            ))}
          </ul>

          {/* Form with premium treatment */}
          <div>
            {status === 'success' ? (
              <div className="text-center py-16 px-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--color-success)]/20 shadow-lg shadow-[0_8px_40px_-12px_rgba(16,185,129,0.15)]">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[var(--color-success)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-h2 text-[var(--text-primary)] mb-3">
                  {t.contact.success}
                </h3>
                <p className="text-body text-[var(--text-secondary)] mb-6">
                  {t.contact.successDetail}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setStatus('idle')}
                >
                  {t.contact.sendAnother}
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]"
                noValidate
              >
                {/* Honeypot — hidden from real users */}
                <div
                  className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="website-field">Do not fill this</label>
                  <input
                    id="website-field"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t.contact.fields.businessName}
                    placeholder={t.contact.placeholders.businessName}
                    value={formData.businessName}
                    onChange={(e) =>
                      handleChange('businessName', e.target.value)
                    }
                    error={errors.businessName}
                    isRequired
                  />
                  <Input
                    label={t.contact.fields.contactPerson}
                    placeholder={t.contact.placeholders.contactPerson}
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleChange('contactPerson', e.target.value)
                    }
                    error={errors.contactPerson}
                    isRequired
                  />
                  <Input
                    label={t.contact.fields.email}
                    type="email"
                    placeholder={t.contact.placeholders.email}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={errors.email}
                    isRequired
                  />
                  <Input
                    label={t.contact.fields.phone}
                    type="tel"
                    placeholder={t.contact.placeholders.phone}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    error={errors.phone}
                  />
                  <Input
                    label={t.contact.fields.quantity}
                    type="number"
                    placeholder={t.contact.placeholders.quantity}
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    min="1"
                    max="10000"
                    error={errors.quantity}
                  />
                </div>
                <div className="mt-6">
                  <Textarea
                    label={t.contact.fields.message}
                    placeholder={t.contact.placeholders.message}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={status === 'loading'}
                    className="w-full sm:w-auto"
                  >
                    {status === 'loading' ? t.contact.sending : t.contact.submit}
                  </Button>
                  <p className="text-caption text-center sm:text-left">
                    {t.contact.responseTime}
                  </p>
                </div>
                {errors.submit && (
                  <p
                    className="mt-4 text-sm text-[var(--color-error)]"
                    role="alert"
                  >
                    {errors.submit}
                  </p>
                )}
                {status === 'error' && (
                  <p
                    className="mt-4 text-sm text-[var(--color-error)]"
                    role="alert"
                  >
                    {t.contact.error}
                  </p>
                )}
              </form>
            )}
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
