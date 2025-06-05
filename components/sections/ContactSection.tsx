"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Paperclip,
  X,
  CheckCircle,
  AlertCircle,
  Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  subject: string
  question: string
  questionAttachments?: File
}

interface FormErrors {
  [key: string]: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    question: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis"
    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis"
    if (!formData.email.trim()) {
      newErrors.email = "Email requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Téléphone requis"
    if (!formData.subject.trim()) newErrors.subject = "Sujet requis"
    if (!formData.question.trim()) newErrors.question = "Message requis"

    if (formData.questionAttachments) {
      const file = formData.questionAttachments
      if (file.size > 10 * 1024 * 1024) newErrors.questionAttachments = "Fichier trop volumineux (max 10MB)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, questionAttachments: file }))
      if (errors.questionAttachments) {
        setErrors(prev => ({ ...prev, questionAttachments: "" }))
      }
    }
  }

  const removeFile = () => {
    setFormData(prev => ({ ...prev, questionAttachments: undefined }))
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = error => reject(error)
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const submitData: any = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        subject: formData.subject.trim(),
        question: formData.question.trim(),
        questionAttachments: ""
      }

      if (formData.questionAttachments) {
        const base64File = await fileToBase64(formData.questionAttachments)
        submitData.questionAttachments = base64File
      }

      const response = await fetch("https://lag-immobiliers-api.souheib-riache.fr/api/v1/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData)
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        question: ""
      })
      removeFile()
      setIsSuccess(true)

      setTimeout(() => setIsSuccess(false), 5000)

    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Erreur inattendue")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <section id="contact" className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="bg-[hsl(var(--brand))] text-white px-4 py-1 rounded-full mb-3">
              Contact
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Parlons de votre projet
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Notre équipe vous accompagne dans vos projets immobiliers. Contactez-nous pour un conseil personnalisé.
            </p>
          </div>

          <AnimatePresence>
            {isSuccess && (
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-600"/>
                  <p className="text-green-800 text-sm font-medium">Message envoyé avec succès !</p>
                </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {submitError && (
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-600"/>
                  <p className="text-red-800 text-sm">{submitError}</p>
                </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Prénom *"
                    className={errors.firstName ? 'border-red-300' : ''}
                    disabled={isSubmitting}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Nom *"
                    className={errors.lastName ? 'border-red-300' : ''}
                    disabled={isSubmitting}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Email *"
                    className={errors.email ? 'border-red-300' : ''}
                    disabled={isSubmitting}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <Input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="Téléphone *"
                    className={errors.phoneNumber ? 'border-red-300' : ''}
                    disabled={isSubmitting}
                />
                {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
              </div>
            </div>

            <div>
              <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Sujet *"
                  className={errors.subject ? 'border-red-300' : ''}
                  disabled={isSubmitting}
              />
              {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
            </div>

            <div>
              <Textarea
                  value={formData.question}
                  onChange={(e) => handleInputChange("question", e.target.value)}
                  placeholder="Votre message *"
                  rows={4}
                  className={errors.question ? 'border-red-300' : ''}
                  disabled={isSubmitting}
              />
              {errors.question && <p className="mt-1 text-xs text-red-600">{errors.question}</p>}
            </div>

            <div>
              {!formData.questionAttachments ? (
                  <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:border-[hsl(var(--brand))] transition-colors"
                  >
                    <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1"/>
                    <p className="text-sm text-slate-600">Ajouter un fichier (optionnel)</p>
                    <p className="text-xs text-slate-500">PDF, images, documents (max 10MB)</p>
                  </div>
              ) : (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <Paperclip className="w-4 h-4 text-[hsl(var(--brand))]"/>
                    <span className="text-sm text-slate-700 flex-1">{formData.questionAttachments.name}</span>
                    <button type="button" onClick={removeFile} className="text-slate-400 hover:text-red-500">
                      <X className="w-4 h-4"/>
                    </button>
                  </div>
              )}

              <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  disabled={isSubmitting}
              />

              {errors.questionAttachments && (
                  <p className="mt-1 text-xs text-red-600">{errors.questionAttachments}</p>
              )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
            >
              {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    Envoi...
                  </div>
              ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4"/>
                    Envoyer
                  </div>
              )}
            </Button>

            <p className="text-xs text-slate-500 text-center">
              Vos données sont traitées conformément à notre politique de confidentialité.
            </p>
          </form>
        </div>
      </section>
  )
}