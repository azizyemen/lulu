"use client";

import { useRef, useState } from "react";
import { toBlob } from "html-to-image";
import { Copy, Share2, ImageDown, Check, X, Download } from "lucide-react";

export default function ShareButtons({
  text,
  source,
  label = "لولو",
}: {
  text: string;
  source?: string;
  label?: string;
}) {
  const [toast, setToast] = useState("");
  const [cardOpen, setCardOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 1800);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${text}${source ? `\n﴿ ${source} ﴾` : ""}\n\n— لولو`);
      flash("تم نسخ النص");
    } catch {
      flash("تعذّر النسخ");
    }
  };

  const shareText = async () => {
    const payload = `${text}${source ? `\n﴿ ${source} ﴾` : ""}\n\n— لولو`;
    if (navigator.share) {
      try {
        await navigator.share({ text: payload });
      } catch {
        /* user cancelled */
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(payload)}`, "_blank");
    }
  };

  const makeBlob = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    return toBlob(cardRef.current, { pixelRatio: 2, cacheBust: true });
  };

  const saveImage = async () => {
    setBusy(true);
    try {
      const blob = await makeBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lulu-card.png";
      a.click();
      URL.revokeObjectURL(url);
      flash("تم حفظ البطاقة");
    } catch {
      flash("تعذّر إنشاء الصورة");
    } finally {
      setBusy(false);
    }
  };

  const shareImage = async () => {
    setBusy(true);
    try {
      const blob = await makeBlob();
      if (!blob) return;
      const file = new File([blob], "lulu-card.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        await saveImage();
      }
    } catch {
      /* cancelled */
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <IconBtn onClick={copy} label="نسخ النص">
          <Copy size={15} />
        </IconBtn>
        <IconBtn onClick={shareText} label="مشاركة">
          <Share2 size={15} />
        </IconBtn>
        <IconBtn onClick={() => setCardOpen(true)} label="مشاركة كبطاقة">
          <ImageDown size={15} />
        </IconBtn>
        {toast && (
          <span className="flex items-center gap-1 text-xs font-medium text-rose-500 animate-fade-up">
            <Check size={12} /> {toast}
          </span>
        )}
      </div>

      {cardOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="بطاقة المشاركة">
          <div className="absolute inset-0 bg-rose-900/30 backdrop-blur-sm" onClick={() => setCardOpen(false)} />
          <div className="glass-strong relative w-full max-w-sm p-4 animate-fade-up">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-rose-700">بطاقة للمشاركة</h3>
              <button onClick={() => setCardOpen(false)} aria-label="إغلاق" className="rounded-full p-1.5 text-rose-400 hover:bg-rose-100/70">
                <X size={18} />
              </button>
            </div>

            {/* The capturable card */}
            <div className="overflow-hidden rounded-2xl">
              <div
                ref={cardRef}
                style={{
                  background: "linear-gradient(150deg, #fdf8f6 0%, #f6e2e7 55%, #efc9d2 100%)",
                  padding: "36px 28px",
                }}
                className="relative flex min-h-[360px] flex-col items-center justify-center text-center"
              >
                <div
                  style={{ background: "radial-gradient(circle, rgba(211,132,151,0.35), transparent 70%)" }}
                  className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full blur-2xl"
                />
                <p className="mb-1 font-display text-sm font-bold tracking-wide text-rose-500">لولـو</p>
                <div className="my-3 h-px w-12 bg-rose-300" />
                <p className="font-quran text-xl leading-loose text-rose-900">{text}</p>
                {source && <p className="mt-3 text-sm font-medium text-rose-500">﴿ {source} ﴾</p>}
                <p className="mt-6 text-[11px] text-rose-400">إلهامكِ .. جمالكِ .. نجاحكِ</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={shareImage} disabled={busy} className="btn-rose flex-1 !py-2.5 text-sm disabled:opacity-60">
                <Share2 size={16} /> مشاركة
              </button>
              <button onClick={saveImage} disabled={busy} className="btn-ghost flex-1 !py-2.5 text-sm disabled:opacity-60">
                <Download size={16} /> حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function IconBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-rose-400 transition-all hover:bg-rose-100/70 hover:text-rose-600"
    >
      {children}
    </button>
  );
}
