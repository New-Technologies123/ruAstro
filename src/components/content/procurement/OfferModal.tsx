import { ArrowUpRightIcon } from "../../ui/icon/ArrowUpRightIcon";
import React, { useState, useEffect, useRef } from "react";
import Styles from "./forma.module.scss";
import { exportGroupToExcel } from "./exportExcel";
import * as XLSX from "xlsx";
import InputMask from "react-input-mask";

type Item = { id: number; name: string | null; quantity: number | string; unit: string; note: string | null };
type Group = { note: string; items: Item[] };
type Props = { group: Group; onClose: () => void;};

const fileLabels: Record<string, string> = {
  egrul: "Выписка ЕГРЮЛ",
  charter: "Устав компании",
  partnerCard: "Карта партнёра",
  directorDecision: "Решение директора",
  invoicePDF: "Счёт с подписью и печатью (PDF)",
  offerFile: "Файл с предложением (Excel)"
};

const fieldIds: Record<string, string> = {
  fullName: "offer-full-name",
  company: "offer-company",
  email: "offer-email",
  phone: "offer-phone",
  inn: "offer-inn",
  egrul: "offer-egrul",
  charter: "offer-charter",
  partnerCard: "offer-partner-card",
  directorDecision: "offer-director-decision",
  invoicePDF: "offer-invoice",
  offerFile: "offer-excel",
  consent: "offer-consent",
  privacyAgreement: "offer-privacy"
};

const fieldOrder = Object.keys(fieldIds);
type FormErrors = Record<string, string | boolean | undefined>;

export const OfferModal: React.FC<Props> = ({ group, onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    inn: "",
    phone: "",
    consent: false,        // согласие на обработку данных
    privacyAgreement: false // согласие с политикой конфиденциальности
  });

  const [files, setFiles] = useState<{[key:string]: File | null}>({
    egrul: null, charter: null, partnerCard: null, directorDecision: null, offerFile: null, invoicePDF: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [checkingOfferFile, setCheckingOfferFile] = useState(false);
  const focusOnErrorRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!focusOnErrorRef.current) return;
    focusOnErrorRef.current = false;
    const firstInvalid = fieldOrder.find((field) => errors[field]);
    if (!firstInvalid) return;
    const target = document.getElementById(fieldIds[firstInvalid]) as HTMLElement | null;
    if (!target) return;
    const scrollTarget = target.closest("label") || target;
    scrollTarget.scrollIntoView({ behavior: "smooth", block: "center" });
    target.focus({ preventScroll: true });
  }, [errors]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocusTo = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      if (returnFocusTo?.isConnected) returnFocusTo.focus({ preventScroll: true });
    };
  }, [onClose]);

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleFormChange = (field: keyof typeof form, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
    
    // Сбрасываем общую ошибку согласия если оба чекбокса отмечены
    if ((field === 'consent' || field === 'privacyAgreement') && value === true) {
      const newConsent = field === 'consent' ? value : form.consent;
      const newPrivacyAgreement = field === 'privacyAgreement' ? value : form.privacyAgreement;
      
      if (newConsent && newPrivacyAgreement) {
        setErrors(prev => ({ ...prev, agreementError: false }));
      }
    }
  };

  const handleFileChange = (field: keyof typeof files, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleCheckboxChange = (field: 'consent' | 'privacyAgreement', checked: boolean) => {
    handleFormChange(field, checked);
  };

  const rejectOfferFile = (message: string) => {
    const input = document.getElementById("offer-excel") as HTMLInputElement | null;
    if (input) input.value = "";
    setFiles(prev => ({ ...prev, offerFile: null }));
    setErrors(prev => ({ ...prev, offerFile: message }));
  };

  const handleOfferFileChange = (file: File | null) => {
    if (!file) { setCheckingOfferFile(false); rejectOfferFile("Выберите файл с предложением (Excel)"); return; }
    setCheckingOfferFile(true);
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        if (!json.length) throw new Error("Пустой файл");
        const headerRow = json[0];
        const requiredHeaders = [
          "Полное наименование изделия Поставщика",
          "Цена с НДС",
          "Сумма с НДС",
          "Срок поставки (календарный день)",
          "Условие оплаты"
        ];
        const requiredIndexes = requiredHeaders.map(h => headerRow.indexOf(h));
        if (requiredIndexes.some(idx => idx === -1)) throw new Error("Не найдены нужные заголовки Excel");
        let hasValidRow = false;
        for (let i = 1; i < json.length; i++) {
          const row = [...json[i]];
          while (row.length < Math.max(...requiredIndexes) + 1) row.push("");
          if (requiredIndexes.every(idx => (row[idx] ?? "").toString().trim() !== "")) { hasValidRow = true; break; }
        }
        if (!hasValidRow) { rejectOfferFile("В Excel должна быть хотя бы одна строка с заполненными столбцами"); return; }
        handleFileChange("offerFile", file);
      } catch (err: any) {
        rejectOfferFile(err.message || "Ошибка при чтении Excel");
      } finally {
        setCheckingOfferFile(false);
      }
    };
    reader.onerror = () => { setCheckingOfferFile(false); rejectOfferFile("Ошибка при чтении Excel"); };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    
    // Валидация полей
    if (!form.fullName.trim()) newErrors.fullName = "Введите ФИО";
    if (!form.company.trim()) newErrors.company = "Введите компанию";
    if (!form.email.trim()) newErrors.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = "Введите корректный email";
    if (!form.inn.trim()) newErrors.inn = "Введите ИНН";
    if (!form.phone || form.phone.includes("_")) newErrors.phone = "Введите корректный номер телефона";
    
    // Проверка чекбоксов
    if (!form.consent) newErrors.consent = "Необходимо дать согласие на обработку персональных данных";
    if (!form.privacyAgreement) newErrors.privacyAgreement = "Необходимо подтвердить ознакомление с политикой конфиденциальности";
    
    // Проверка файлов
    Object.entries(files).forEach(([key, file]) => {
      if (!file) newErrors[key] = `Не прикреплён файл «${fileLabels[key]}»`;
    });
    
    if (Object.keys(newErrors).length > 0) {
      focusOnErrorRef.current = true;
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value.toString()));
    Object.entries(files).forEach(([key, file]) => { if (file) formData.append(key, file); });

    setLoading(true);
    try {
      const response = await fetch("https://tech-new.ru/submit.php", { method: "POST", body: formData });
      const result = await response.json();
      if (result.success) { alert("Форма успешно отправлена!"); onClose(); }
      else { alert("Ошибка: " + (result.error || "Неизвестная ошибка")); }
    } catch (err) { alert("Ошибка сети: " + err); }
    finally { setLoading(false); }
  };

  return (
    <div className={Styles.modalBg} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} className={Styles.modal} role="dialog" aria-modal="true" aria-labelledby="offer-title" onKeyDown={handleDialogKeyDown}>
        <div className={Styles.modalHeader}>
          <div>
            <span className={Styles.modalEyebrow}>ПОСТАВЩИКАМ · ЛОТ {group.note}</span>
            <h2 id="offer-title">Добавить предложение</h2>
            <p>Оставьте контакты и приложите документы для участия в закупке.</p>
          </div>
          <button ref={closeRef} type="button" className={Styles.closeButton} onClick={onClose} aria-label="Закрыть форму">×</button>
        </div>

        <div className={Styles.modalBody}>
        <div className={Styles.downloadBlock}>
          <div><strong>Перечень закупаемых МТР</strong><span>Скачайте файл, заполните предложение и прикрепите его ниже.</span></div>
          <button type="button" className={Styles.downloadButton} onClick={() => exportGroupToExcel(group)}>
            Скачать Excel <span aria-hidden="true">↓</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={Styles.form} noValidate>
          <div className={Styles.sectionHeading}><span>01</span><div><h3>Контактные данные</h3><p>Как с вами связаться</p></div></div>
          <div className={Styles.fieldGrid}>
          <div>
            <label htmlFor="offer-full-name">ФИО</label>
            <input
              id="offer-full-name"
              type="text"
              placeholder="Иванов Иван Иванович"
              value={form.fullName}
              onChange={e => handleFormChange("fullName", e.target.value)}
              className={`${Styles.input} ${errors.fullName ? Styles.errorInput : ""}`}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && <p className={Styles.error}>{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="offer-company">Компания</label>
            <input
              id="offer-company"
              type="text"
              placeholder="Название компании"
              value={form.company}
              onChange={e => handleFormChange("company", e.target.value)}
              className={`${Styles.input} ${errors.company ? Styles.errorInput : ""}`}
              aria-invalid={!!errors.company}
            />
            {errors.company && <p className={Styles.error}>{errors.company}</p>}
          </div>

          <div>
            <label htmlFor="offer-email">Электронная почта</label>
            <input
              id="offer-email"
              type="email"
              placeholder="mail@company.ru"
              value={form.email}
              onChange={e => handleFormChange("email", e.target.value)}
              className={`${Styles.input} ${errors.email ? Styles.errorInput : ""}`}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className={Styles.error}>{errors.email}</p>}
          </div>          

          <div>
            <label htmlFor="offer-phone">Телефон</label>
            <InputMask
              id="offer-phone"
              mask="+7 (999) 999-99-99"
              placeholder="+7 (999) 000-00-00"
              value={form.phone}
              onChange={e => handleFormChange("phone", e.target.value)}
              className={`${Styles.input} ${errors.phone ? Styles.errorInput : ""}`}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className={Styles.error}>{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="offer-inn">ИНН компании</label>
            <input
              id="offer-inn"
              type="text"
              placeholder="10 или 12 цифр"
              value={form.inn}
              onChange={e => handleFormChange("inn", e.target.value)}
              className={`${Styles.input} ${errors.inn ? Styles.errorInput : ""}`}
              aria-invalid={!!errors.inn}
            />
            {errors.inn && <p className={Styles.error}>{errors.inn}</p>}
          </div>

          </div>

          <div className={Styles.sectionHeading}><span>02</span><div><h3>Документы</h3><p>Приложите файлы компании и заполненное предложение</p></div></div>
          {Object.keys(fileLabels).some((key) => errors[key]) && (
            <div className={Styles.missingFiles} role="alert">
              <strong>Не хватает документов:</strong>
              <span>{Object.keys(fileLabels).filter((key) => errors[key]).map((key) => fileLabels[key]).join(", ")}</span>
            </div>
          )}
          <div className={Styles.fileGrid}>
          <div className={errors.egrul ? Styles.fileError : ""}>
            <label htmlFor="offer-egrul">Выписка ЕГРЮЛ</label>
            <input id="offer-egrul" type="file" aria-invalid={!!errors.egrul} onChange={e => handleFileChange("egrul", e.target.files?.[0] || null)} />
            <p className={`${Styles.fileStatus} ${files.egrul ? Styles.fileChosen : ""}`}>{files.egrul ? `✓ ${files.egrul.name}` : "Файл не выбран"}</p>
            {errors.egrul && <p className={Styles.error}>{errors.egrul}</p>}
          </div>
          <div className={errors.charter ? Styles.fileError : ""}>
            <label htmlFor="offer-charter">Устав компании</label>
            <input id="offer-charter" type="file" aria-invalid={!!errors.charter} onChange={e => handleFileChange("charter", e.target.files?.[0] || null)} />
            <p className={`${Styles.fileStatus} ${files.charter ? Styles.fileChosen : ""}`}>{files.charter ? `✓ ${files.charter.name}` : "Файл не выбран"}</p>
            {errors.charter && <p className={Styles.error}>{errors.charter}</p>}
          </div>
          <div className={errors.partnerCard ? Styles.fileError : ""}>
            <label htmlFor="offer-partner-card">Карта партнёра</label>
            <input id="offer-partner-card" type="file" aria-invalid={!!errors.partnerCard} onChange={e => handleFileChange("partnerCard", e.target.files?.[0] || null)} />
            <p className={`${Styles.fileStatus} ${files.partnerCard ? Styles.fileChosen : ""}`}>{files.partnerCard ? `✓ ${files.partnerCard.name}` : "Файл не выбран"}</p>
            {errors.partnerCard && <p className={Styles.error}>{errors.partnerCard}</p>}
          </div>
          <div className={errors.directorDecision ? Styles.fileError : ""}>
            <label htmlFor="offer-director-decision">Решение директора</label>
            <input id="offer-director-decision" type="file" aria-invalid={!!errors.directorDecision} onChange={e => handleFileChange("directorDecision", e.target.files?.[0] || null)} />
            <p className={`${Styles.fileStatus} ${files.directorDecision ? Styles.fileChosen : ""}`}>{files.directorDecision ? `✓ ${files.directorDecision.name}` : "Файл не выбран"}</p>
            {errors.directorDecision && <p className={Styles.error}>{errors.directorDecision}</p>}
          </div>
          <div className={errors.invoicePDF ? Styles.fileError : ""}>
            <label htmlFor="offer-invoice">Счёт с подписью и печатью (PDF)</label>
            <input id="offer-invoice" type="file" accept=".pdf" aria-invalid={!!errors.invoicePDF} onChange={e => handleFileChange("invoicePDF", e.target.files?.[0] || null)} />
            <p className={`${Styles.fileStatus} ${files.invoicePDF ? Styles.fileChosen : ""}`}>{files.invoicePDF ? `✓ ${files.invoicePDF.name}` : "Файл не выбран"}</p>
            {errors.invoicePDF && <p className={Styles.error}>{errors.invoicePDF}</p>}
          </div>
          <div className={errors.offerFile ? Styles.fileError : ""}>
            <label htmlFor="offer-excel">Файл с предложением (Excel)</label>
            <input id="offer-excel" type="file" accept=".xlsx,.xls" aria-invalid={!!errors.offerFile} onChange={e => handleOfferFileChange(e.target.files?.[0] || null)} />
            <p className={`${Styles.fileStatus} ${files.offerFile ? Styles.fileChosen : ""}`}>{checkingOfferFile ? "Проверяем файл…" : files.offerFile ? `✓ ${files.offerFile.name}` : "Файл не выбран"}</p>
            {errors.offerFile && <p className={Styles.error}>{errors.offerFile}</p>}
          </div>

          </div>

          <div className={Styles.sectionHeading}><span>03</span><div><h3>Согласия</h3><p>Подтвердите условия обработки данных</p></div></div>
          <div className={Styles.consents}>
            {/* Первый чекбокс - согласие на обработку данных */}
            <div className={Styles.checkboxWrapper}>
              <label className={`${Styles.checkbox} ${errors.consent ? Styles.error : ''}`}>
                <input
                  id="offer-consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={e => handleCheckboxChange('consent', e.target.checked)}
                  aria-invalid={!!errors.consent}
                />
                <span className={Styles.customCheckbox}></span>
                <span className={Styles.checkboxText}>
                  Я даю согласие на <a href="/file/personal_data_v1.pdf" target="_blank" rel="noopener noreferrer">обработку моих персональных данных</a>
                  , включая загрузку и обработку прилагаемых документов.
                </span>
              </label>
              {errors.consent && (
                <div className={Styles.errorText}>
                  ⚠️ {errors.consent}
                </div>
              )}
            </div>

            {/* Второй чекбокс - согласие с политикой конфиденциальности */}
            <div className={Styles.checkboxWrapper}>
              <label className={`${Styles.checkbox} ${errors.privacyAgreement ? Styles.error : ''}`}>
                <input
                  id="offer-privacy"
                  type="checkbox"
                  checked={form.privacyAgreement}
                  onChange={e => handleCheckboxChange('privacyAgreement', e.target.checked)}
                  aria-invalid={!!errors.privacyAgreement}
                />
                <span className={Styles.customCheckbox}></span>
                <span className={Styles.checkboxText}>
                  С <a href="/file/privacy_v1.pdf" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a> ознакомлен(а) и согласен(на).
                </span>
              </label>
              {errors.privacyAgreement && (
                <div className={Styles.errorText}>
                  ⚠️ {errors.privacyAgreement}
                </div>
              )}
            </div>
          </div>

          <div className={Styles.buttons}>
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit" disabled={loading || checkingOfferFile}>{loading ? "Отправка…" : checkingOfferFile ? "Проверяем Excel…" : "Отправить предложение"} <span aria-hidden="true"><ArrowUpRightIcon /></span></button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};
