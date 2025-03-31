"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface DonationFormProps {
  projectId: string;
}

const DonationForm: React.FC<DonationFormProps> = () => {
  const t = useTranslations("project.donationForm");

  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const predefinedAmounts = [50, 100, 200, 500];

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // تسمح فقط بإدخال أرقام
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setAmount(value ? parseInt(value) : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      return;
    }

    setIsLoading(true);

    // محاكاة عملية التبرع
    try {
      // تأخير مصطنع لمحاكاة طلب API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // إعادة تعيين النموذج وإظهار رسالة النجاح
      setSuccess(true);
      setAmount(null);
      setCustomAmount("");
      setName("");
      setEmail("");

      // إخفاء رسالة النجاح بعد 5 ثوان
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting donation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-5 text-center">{t("title")}</h3>

      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4 text-center"
        >
          <Heart className="h-10 w-10 text-green-500 mx-auto mb-2" />
          <p className="text-green-800 dark:text-green-400 font-medium">
            {t("successMessage")}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* مبالغ محددة مسبقًا */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {predefinedAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleAmountSelect(value)}
                className={`py-2 px-4 rounded-xl text-center transition-colors ${
                  amount === value
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {value} {t("currency")}
              </button>
            ))}
          </div>

          {/* إدخال مبلغ مخصص */}
          <div className="mb-5">
            <div className="relative">
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder={t("customAmount")}
                className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                {t("currency")}
              </div>
            </div>
          </div>

          {/* حقول إضافية */}
          <div className="space-y-4 mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("name")}
              className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("email")}
              className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
            />
          </div>

          {/* زر التبرع */}
          <motion.button
            type="submit"
            disabled={!amount || amount <= 0 || isLoading}
            className="w-full py-3 px-6 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
                <span>{t("processing")}</span>
              </>
            ) : (
              <>
                <Heart className="h-5 w-5" />
                <span>{t("donate")}</span>
              </>
            )}
          </motion.button>
        </form>
      )}

      {/* معلومات إضافية */}
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 text-center">
        {t("taxInfo")}
      </p>
    </div>
  );
};

export default DonationForm;
