'use client'

import { useState, useRef, type FormEvent } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/Button'

interface FieldErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field: string, value: string): string | undefined {
  const trimmed = value.trim()
  switch (field) {
    case 'name':
      if (!trimmed) return 'Name is required'
      break
    case 'email':
      if (!trimmed) return 'Email is required'
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email'
      break
    case 'subject':
      if (!trimmed) return 'Subject is required'
      break
    case 'message':
      if (!trimmed) return 'Message is required'
      if (trimmed.length < 10) return 'Message must be at least 10 characters'
      break
  }
  return undefined
}

function validateAll(data: Record<string, string>): FieldErrors | null {
  const errors: FieldErrors = {}
  for (const field of ['name', 'email', 'subject', 'message'] as const) {
    const err = validateField(field, data[field] ?? '')
    if (err) errors[field] = err
  }
  return Object.keys(errors).length > 0 ? errors : null
}

const INPUT_BASE =
  'w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'
const INPUT_ERROR =
  'border-medical-red focus:border-medical-red focus:ring-medical-red/20'

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleBlur = (field: keyof typeof formData) => {
    const err = validateField(field, formData[field])
    if (err) {
      setErrors((prev) => ({ ...prev, [field]: err }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError('')

    const validationErrors = validateAll(formData)
    if (validationErrors) {
      setErrors(validationErrors)
      const firstErrorField = (['name', 'email', 'subject', 'message'] as const).find(
        (f) => validationErrors[f],
      )
      if (firstErrorField && formRef.current) {
        const el = formRef.current.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)
        el?.focus()
      }
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        return
      }

      if (res.status === 429) {
        setServerError('Too many submissions. Please try again later.')
      } else {
        const data = await res.json().catch(() => null)
        if (data?.errors) {
          setErrors(data.errors)
          setStatus('idle')
          return
        }
        setServerError(data?.error ?? 'Something went wrong. Please try again.')
      }
      setStatus('error')
    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setStatus('idle')
    setServerError('')
  }

  return (
    <section className="bg-background-alt py-16 md:py-24">
      <Container size="narrow">
        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm md:p-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-12 text-center" role="status">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-bold text-navy">
                  Message Sent
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Thank you for reaching out. I&apos;ll get back to you as soon as
                  possible.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-8 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl font-bold text-navy">
                  Send a Message
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Fill out the form below and I&apos;ll respond within a few days.
                </p>

                {serverError && (
                  <div className="mt-6 rounded-lg border border-medical-red/20 bg-medical-red/5 px-4 py-3 text-sm text-medical-red">
                    {serverError}
                  </div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                  noValidate
                >
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-navy">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="Your full name"
                        className={`${INPUT_BASE} ${errors.name ? INPUT_ERROR : ''}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-medical-red">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-navy">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="you@example.com"
                        className={`${INPUT_BASE} ${errors.email ? INPUT_ERROR : ''}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-medical-red">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-navy">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      onBlur={() => handleBlur('subject')}
                      placeholder="What is this about?"
                      className={`${INPUT_BASE} ${errors.subject ? INPUT_ERROR : ''}`}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-xs text-medical-red">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-navy">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Tell me about your inquiry, collaboration idea, or question..."
                      className={`${INPUT_BASE} resize-none ${errors.message ? INPUT_ERROR : ''}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-medical-red">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
