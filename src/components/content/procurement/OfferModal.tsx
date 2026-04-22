import React, { useState, useEffect } from "react";
import Styles from "./forma.module.scss";
import { exportGroupToExcel } from "./exportExcel";
import * as XLSX from "xlsx";
import InputMask from "react-input-mask";

type Item = { id: number; name: string | null; quantity: number | string; unit: string; note: string | null };
type Group = { note: string; items: Item[] };
type Props = { group: Group; onClose: () => void;};

export const OfferModal: React.FC<Props> = ({ group, onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    inn: "",
    phone: "",
    consent: false
  });

  const [files, setFiles] = useState<{[key:string]: File | null}>({
    egrul: null, charter: null, partnerCard: null, directorDecision: null, offerFile: null, invoicePDF: null
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  const handleFormChange = (field: keyof typeof form, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (field: keyof typeof files, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleOfferFileChange = (file: File | null) => {
    if (!file) { handleFileChange("offerFile", null); setErrors(prev => ({ ...prev, offerFile: "Выберите файл" })); return; }
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
        if (!hasValidRow) { handleFileChange("offerFile", null); setErrors(prev => ({ ...prev, offerFile: "Должна быть хотя бы одна строка с заполненными столбцами" })); return; }
        handleFileChange("offerFile", file);
      } catch (err: any) {
        handleFileChange("offerFile", null);
        setErrors(prev => ({ ...prev, offerFile: err.message || "Ошибка при чтении Excel" }));
      }
    };
    reader.onerror = () => { handleFileChange("offerFile", null); setErrors(prev => ({ ...prev, offerFile: "Ошибка при чтении Excel" })); };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!form.fullName) newErrors.fullName = "Введите ФИО";
    if (!form.company) newErrors.company = "Введите компанию";
    if (!form.email) newErrors.email = "Введите email";
    if (!form.inn) newErrors.inn = "Введите ИНН";
    if (!form.phone || form.phone.includes("_")) newErrors.phone = "Введите корректный номер телефона";
    if (!form.consent) newErrors.consent = "Необходимо подтвердить согласие на обработку данных";
    Object.entries(files).forEach(([key, file]) => { if (!file) newErrors[key] = "Загрузите файл"; });
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

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
    <div className={Styles.modalBg} onClick={onClose}>
      <div className={Styles.modal} onClick={e => e.stopPropagation()}>
        <h1>Добавить свое предложение</h1>

        <div className={Styles.downloadBlock}>
          <button type="button" className={Styles.downloadButton} onClick={() => exportGroupToExcel(group)}>
            Скачать перечень закупаемых МТР
          </button>
        </div>

        <form onSubmit={handleSubmit} className={Styles.form}>
          <div>
            <input
              type="text"
              placeholder="ФИО"
              value={form.fullName}
              onChange={e => handleFormChange("fullName", e.target.value)}
              className={`${Styles.input} ${errors.fullName ? Styles.errorInput : ""}`}
            />
            {errors.fullName && <p className={Styles.error}>{errors.fullName}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Название компании"
              value={form.company}
              onChange={e => handleFormChange("company", e.target.value)}
              className={`${Styles.input} ${errors.company ? Styles.errorInput : ""}`}
            />
            {errors.company && <p className={Styles.error}>{errors.company}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => handleFormChange("email", e.target.value)}
              className={`${Styles.input} ${errors.email ? Styles.errorInput : ""}`}
            />
            {errors.email && <p className={Styles.error}>{errors.email}</p>}
          </div>          

          <div>
            <InputMask
              mask="+7 (999) 999-99-99"
              placeholder="Телефон"
              value={form.phone}
              onChange={e => handleFormChange("phone", e.target.value)}
              className={`${Styles.input} ${errors.phone ? Styles.errorInput : ""}`}
            />
            {errors.phone && <p className={Styles.error}>{errors.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="ИНН компании"
              value={form.inn}
              onChange={e => handleFormChange("inn", e.target.value)}
              className={`${Styles.input} ${errors.inn ? Styles.errorInput : ""}`}
            />
            {errors.inn && <p className={Styles.error}>{errors.inn}</p>}
          </div>

          {/* Файлы */}
          <div>
            <label>Выписка ЕГРЮЛ</label>
            <input type="file" onChange={e => handleFileChange("egrul", e.target.files?.[0] || null)} />
            {errors.egrul && <p className={Styles.error}>{errors.egrul}</p>}
          </div>
          <div>
            <label>Устав компании</label>
            <input type="file" onChange={e => handleFileChange("charter", e.target.files?.[0] || null)} />
            {errors.charter && <p className={Styles.error}>{errors.charter}</p>}
          </div>
          <div>
            <label>Карта партнера</label>
            <input type="file" onChange={e => handleFileChange("partnerCard", e.target.files?.[0] || null)} />
            {errors.partnerCard && <p className={Styles.error}>{errors.partnerCard}</p>}
          </div>
          <div>
            <label>Решение директора</label>
            <input type="file" onChange={e => handleFileChange("directorDecision", e.target.files?.[0] || null)} />
            {errors.directorDecision && <p className={Styles.error}>{errors.directorDecision}</p>}
          </div>
          <div>
            <label>Счет с подписью и печатью (PDF)</label>
            <input type="file" accept=".pdf" onChange={e => handleFileChange("invoicePDF", e.target.files?.[0] || null)} />
            {errors.invoicePDF && <p className={Styles.error}>{errors.invoicePDF}</p>}
          </div>
          <div>
            <label>Файл с предложением (Excel)</label>
            <input type="file" accept=".xlsx,.xls" onChange={e => handleOfferFileChange(e.target.files?.[0] || null)} />
            {errors.offerFile && <p className={Styles.error}>{errors.offerFile}</p>}
          </div>

          <div className={Styles.checkboxContainer}>
            <label className={Styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.consent}
                onChange={e => handleFormChange("consent", e.target.checked)}
              />
              <span className={Styles.customCheckbox}></span>
              <span className={Styles.checkboxText}>
                Я даю согласие на обработку моих персональных данных, включая загрузку и обработку прилагаемых документов, 
                в соответствии с
                <a href="/public/privacy/v_1.docx" target="_blank"> Политикой конфиденциальности </a>. 
              </span>
              
            </label>
            {errors.consent && <p className={Styles.error}>{errors.consent}</p>}
          </div>

          <div className={Styles.buttons}>
            <button type="submit" disabled={loading}>{loading ? "Отправка..." : "Отправить"}</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};