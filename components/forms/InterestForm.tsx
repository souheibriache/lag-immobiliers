"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import {
    CheckCircle,
    AlertCircle,
    Loader2,
    Mail,
    Phone,
    User,
    MessageSquare,
    ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"

interface BasePayload {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    message: string
}

interface PropertyPayload extends BasePayload {
    propertyId: string
}

interface ServicePayload extends BasePayload {
    accompaniementId: string
}

type InterestPayload = PropertyPayload | ServicePayload

interface FormError {
    statusCode?: number
    message?: string
    error?: string
}

type RequestType = 'property' | 'service'

interface RequestConfig {
    type: RequestType
    id: string
    endpoint: string
    defaultMessage: string
    successMessage: string
    titleText: string
}

interface GenericInterestFormProps {
    config: RequestConfig
    onSuccess: () => void
    onError?: (error: FormError) => void
}

const createRequestConfig = (type: RequestType, id: string): RequestConfig => {
    const baseUrl = "https://lag-immobiliers-api.souheib-riache.fr/api/v1"

    switch (type) {
        case 'property':
            return {
                type,
                id,
                endpoint: `${baseUrl}/property-request`,
                defaultMessage: "Bonjour, je suis intéressé(e) par ce bien. Pourriez‑vous m'envoyer sa fiche détaillée ?",
                successMessage: "Merci de votre confiance. Un conseiller vous rappellera sous 24 h.",
                titleText: "Manifester mon intérêt pour ce bien"
            }
        case 'service':
            return {
                type,
                id,
                endpoint: `${baseUrl}/accompagniement-request`,
                defaultMessage: "Bonjour, je souhaiterais en savoir plus sur vos services d'accompagnement.",
                successMessage: "Merci pour votre demande. Notre équipe vous contactera rapidement.",
                titleText: "Demander un accompagnement"
            }
        default:
            throw new Error(`Unsupported request type: ${type}`)
    }
}

export default function GenericInterestForm({
                                                config,
                                                onSuccess,
                                                onError,
                                            }: GenericInterestFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<BasePayload>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            message: config.defaultMessage,
        },
    })

    const validation = {
        firstName: {
            required: "Le prénom est requis",
            minLength: { value: 2, message: "Au moins 2 caractères" },
            maxLength: { value: 50, message: "Max. 50 caractères" },
        },
        lastName: {
            required: "Le nom est requis",
            minLength: { value: 2, message: "Au moins 2 caractères" },
            maxLength: { value: 50, message: "Max. 50 caractères" },
        },
        email: {
            required: "L'e‑mail est requis",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Adresse e‑mail invalide",
            },
        },
        phoneNumber: {
            required: "Le téléphone est requis",
            pattern: {
                value: /^(?:\+33|0)[1-9](?:[0-9]{8})$/,
                message: "Numéro français invalide",
            },
        },
    }

    const buildPayload = (formData: BasePayload): InterestPayload => {
        switch (config.type) {
            case 'property':
                return {
                    ...formData,
                    propertyId: config.id
                } as PropertyPayload
            case 'service':
                return {
                    ...formData,
                    accompaniementId: config.id
                } as ServicePayload
            default:
                throw new Error(`Unsupported request type: ${config.type}`)
        }
    }

    const onSubmit = async (formData: BasePayload) => {
        try {
            setStatus("loading")
            setErrorMessage("")

            const payload = buildPayload(formData)

            const res = await fetch(config.endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                let errorData: FormError = {
                    statusCode: res.status,
                    error: res.statusText,
                    message: "Une erreur est survenue. Merci de réessayer."
                }

                try {
                    const responseData = await res.json()
                    errorData = {
                        statusCode: responseData.statusCode || res.status,
                        error: responseData.error || res.statusText,
                        message: responseData.message || errorData.message
                    }
                } catch (jsonError) {
                    console.warn("Failed to parse error response as JSON:", jsonError)
                }
                if (res.status === 400 && onError) {
                    setStatus("idle")
                    onError(errorData)
                    return
                }
                throw new Error(errorData.message)
            }

            setStatus("success")
            setTimeout(() => {
                reset()
                onSuccess()
                setStatus("idle")
            }, 1800)

        } catch (err) {
            console.error("Form submission error:", err)
            setStatus("error")

            if (err instanceof Error) {
                setErrorMessage(err.message)
            } else {
                setErrorMessage("Une erreur est survenue. Merci de réessayer.")
            }
        }
    }

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center gap-3"
            >
                <CheckCircle className="w-16 h-16 text-green-600" />
                <h3 className="text-xl font-semibold text-green-700">
                    Demande envoyée !
                </h3>
                <p className="text-gray-600 max-w-xs">
                    {config.successMessage}
                </p>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col gap-1">
                    <Label htmlFor="firstName" className="flex items-center gap-1">
                        <User className="w-4 h-4" /> Prénom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="firstName"
                        placeholder="Jean"
                        {...register("firstName", validation.firstName)}
                        className={errors.firstName && "border-red-500 focus:ring-red-500"}
                    />
                    <FieldError message={errors.firstName?.message} />
                </div>


                <div className="flex flex-col gap-1">
                    <Label htmlFor="lastName" className="flex items-center gap-1">
                        <User className="w-4 h-4" /> Nom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="lastName"
                        placeholder="Dupont"
                        {...register("lastName", validation.lastName)}
                        className={errors.lastName && "border-red-500 focus:ring-red-500"}
                    />
                    <FieldError message={errors.lastName?.message} />
                </div>


                <div className="flex flex-col gap-1">
                    <Label htmlFor="email" className="flex items-center gap-1">
                        <Mail className="w-4 h-4" /> E‑mail <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="jean.dupont@exemple.com"
                        {...register("email", validation.email)}
                        className={errors.email && "border-red-500 focus:ring-red-500"}
                    />
                    <FieldError message={errors.email?.message} />
                </div>


                <div className="flex flex-col gap-1">
                    <Label htmlFor="phoneNumber" className="flex items-center gap-1">
                        <Phone className="w-4 h-4" /> Téléphone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        {...register("phoneNumber", validation.phoneNumber)}
                        className={errors.phoneNumber && "border-red-500 focus:ring-red-500"}
                    />
                    <FieldError message={errors.phoneNumber?.message} />
                </div>
            </section>


            <section className="space-y-1">
                <Label htmlFor="message" className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> Message
                </Label>
                <Textarea
                    id="message"
                    rows={4}
                    maxLength={500}
                    placeholder="Précisez vos questions ou vos disponibilités… (500 car. max)"
                    {...register("message")}
                    className="resize-none"
                />
                <p className="text-xs text-gray-500 text-right">
                    {watch("message")?.length || 0}/500
                </p>
            </section>


            <AnimatePresence>
                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="rounded-lg border border-red-200 bg-red-50 p-4 flex gap-2"
                    >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-sm text-red-700">{errorMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>


            <div className="flex items-center gap-2 text-xs text-muted-foreground border border-dashed rounded-md p-2 bg-muted/50">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-primary" />
                Vos informations restent strictement confidentielles et ne seront jamais partagées sans votre accord.
            </div>


            <DialogFooter className="pt-6 border-t">
                <DialogClose asChild>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={status === "loading"}
                        className="w-full sm:w-auto"
                    >
                        Annuler
                    </Button>
                </DialogClose>
                <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto btn-primary"
                >
                    {status === "loading" ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Envoi…
                        </>
                    ) : (
                        "Envoyer ma demande"
                    )}
                </Button>
            </DialogFooter>
        </form>
    )
}


function FieldError({ message }: { message?: string }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.span
                    className="text-xs text-red-600"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    {message}
                </motion.span>
            )}
        </AnimatePresence>
    )
}


export { createRequestConfig }
export type { RequestConfig, RequestType }