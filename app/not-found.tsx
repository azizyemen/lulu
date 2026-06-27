import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <span className="font-display text-7xl font-bold gradient-text">٤٠٤</span>
      <p className="text-lg text-rose-700/80">
        لم نجد هذه الصفحة — لعلّها لا تزال قيد الإعداد.
      </p>
      <Link href="/" className="btn-rose">
        <Home size={18} /> العودة للرئيسية
      </Link>
    </div>
  );
}
