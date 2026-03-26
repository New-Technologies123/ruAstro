import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Styles from "./forma.module.scss";

type Props = {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
};

export const OfferModal: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    inn: ""
  });

  const [files, setFiles] = useState({
    egrul: null as File | null,
    charter: null as File | null,
    partnerCard: null as File | null,
    directorDecision: null as File | null,
    offerFile: null as File | null
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    company?: string;
    email?: string;
    inn?: string;
    egrul?: string;
    charter?: string;
    partnerCard?: string;
    directorDecision?: string;
    offerFile?: string;
  }>({});

  // блокируем скролл
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (field: keyof Omit<typeof files, "offerFile">, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleOfferFileChange = (file: File | null) => {
    if (!file) {
      setFiles(prev => ({ ...prev, offerFile: null }));
      setErrors(prev => ({ ...prev, offerFile: "Выберите файл" }));
      return;
    }

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
          "Цена",
          "Срок поставки (календарный день)",
          "Условие оплаты"
        ];

        const requiredIndexes = requiredHeaders.map(h => headerRow.indexOf(h));
        if (requiredIndexes.some(idx => idx === -1)) {
          throw new Error("Не найдены нужные заголовки Excel");
        }

        let hasValidRow = false;
        for (let i = 1; i < json.length; i++) {
          const row = [...json[i]];
          while (row.length < Math.max(...requiredIndexes) + 1) row.push("");
          const allFilled = requiredIndexes.every(idx => (row[idx] ?? "").toString().trim() !== "");
          if (allFilled) {
            hasValidRow = true;
            break;
          }
        }

        if (!hasValidRow) {
          setFiles(prev => ({ ...prev, offerFile: null }));
          setErrors(prev => ({
            ...prev,
            offerFile: "Должна быть хотя бы одна строка с заполненными столбцами: Полное наименование, Цена, Срок поставки, Условие оплаты"
          }));
          return;
        }

        setFiles(prev => ({ ...prev, offerFile: file }));
        setErrors(prev => ({ ...prev, offerFile: undefined }));
      } catch (err: any) {
        setFiles(prev => ({ ...prev, offerFile: null }));
        setErrors(prev => ({ ...prev, offerFile: err.message || "Ошибка при чтении Excel" }));
      }
    };

    reader.onerror = () => {
      setFiles(prev => ({ ...prev, offerFile: null }));
      setErrors(prev => ({ ...prev, offerFile: "Ошибка при чтении Excel" }));
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!form.fullName) newErrors.fullName = "Введите ФИО";
    if (!form.company) newErrors.company = "Введите компанию";
    if (!form.email) newErrors.email = "Введите email";
    if (!form.inn) newErrors.inn = "Введите ИНН";

    if (!files.egrul) newErrors.egrul = "Загрузите файл";
    if (!files.charter) newErrors.charter = "Загрузите файл";
    if (!files.partnerCard) newErrors.partnerCard = "Загрузите файл";
    if (!files.directorDecision) newErrors.directorDecision = "Загрузите файл";
    if (!files.offerFile) newErrors.offerFile = "Загрузите Excel";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("company", form.company);
    formData.append("email", form.email);
    formData.append("inn", form.inn);

    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const response = await fetch("/send-offers.php", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        alert("Форма успешно отправлена!");
        setForm({ fullName: "", company: "", email: "", inn: "" });
        setFiles({ egrul: null, charter: null, partnerCard: null, directorDecision: null, offerFile: null });
        setErrors({});
        onClose();
      } else {
        alert("Ошибка: " + (data.error || "Неизвестная ошибка"));
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сети. Проверьте доступность сервера и путь к PHP.");
    }
  };

  return (
    <div className={Styles.modalBg} onClick={onClose}>
      <div className={Styles.modal} onClick={e => e.stopPropagation()}>
        <h3>Добавить свое предложение</h3>

        <div className={Styles.downloadBlock}>
          <a
            href="/procurement.xlsx"
            download="Перечень_закупаемых_МТР.xlsx"
            className={Styles.downloadButton}
          >
            Скачать перечень закупаемых МТР
          </a>
        </div>

        <form onSubmit={handleSubmit} className={Styles.form}>
          {/** ФИО */}
          <div>
            <input type="text" placeholder="ФИО" value={form.fullName} onChange={e => handleFormChange("fullName", e.target.value)} />
            {errors.fullName && <p className={Styles.error}>{errors.fullName}</p>}
          </div>

          {/** Компания */}
          <div>
            <input type="text" placeholder="Название компании" value={form.company} onChange={e => handleFormChange("company", e.target.value)} />
            {errors.company && <p className={Styles.error}>{errors.company}</p>}
          </div>

          {/** Email */}
          <div>
            <input type="email" placeholder="Email" value={form.email} onChange={e => handleFormChange("email", e.target.value)} />
            {errors.email && <p className={Styles.error}>{errors.email}</p>}
          </div>

          {/** ИНН */}
          <div>
            <input type="text" placeholder="ИНН компании" value={form.inn} onChange={e => handleFormChange("inn", e.target.value)} />
            {errors.inn && <p className={Styles.error}>{errors.inn}</p>}
          </div>

          {/** Файлы */}
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
            <label>Файл с предложением (Excel)</label>
            <input type="file" accept=".xlsx,.xls" onChange={e => handleOfferFileChange(e.target.files?.[0] || null)} />
            {errors.offerFile && <p className={Styles.error}>{errors.offerFile}</p>}
          </div>

          <div className={Styles.buttons}>
            <button type="submit">Отправить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};