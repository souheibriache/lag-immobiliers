import Image from "next/image"

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <Image
            src="logo.png"
            alt="LAG Holding Logo"
            width={120}
            height={60}
            className="w-28 h-14 object-contain mx-auto"
            priority
          />
        </div>
        <div className="w-8 h-8 border-2 border-[#577C65]/30 border-t-[#577C65] rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-[#666] text-sm">Chargement...</p>
      </div>
    </div>
  )
}
