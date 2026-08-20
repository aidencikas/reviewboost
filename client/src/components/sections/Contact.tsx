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
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
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
          <div className="text-center mb-12 md:mb-16">
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

          {/* Form with premium treatment */}
          <div className="max-w-2xl mx-auto">
            {status === 'success' ? (
              <div className="text-center py-16 px-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--color-success)]/20 shadow-lg">
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
                className="p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-xl"
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
      </Container>
    </section>
  );
}
