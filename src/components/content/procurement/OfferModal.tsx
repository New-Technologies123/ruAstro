
import React, { useState } from "react";
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

  const [errors, setErrors] = useState<string[]>([]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (
    field: keyof Omit<typeof files, "offerFile">,
    file: File | null
  ) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  // ✅ Проверка Excel (строгая)
  const handleOfferFileChange = (file: File | null) => {
    if (!file) {
      setFiles(prev => ({ ...prev, offerFile: null }));
      return;
    }

    const reader = new FileReader();

    reader.onload = e => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // столбцы 2,7,8,9 → индексы 1,6,7,8
        const requiredCols = [1, 6, 7, 8];

        let hasValidRow = false;

        for (let i = 1; i < json.length; i++) {
          const row = json[i];

          const allFilled = requiredCols.every(idx => {
            const value = row[idx];
            return (
              value !== undefined &&
              value !== null &&
              String(value).trim() !== ""
            );
          });

          if (allFilled) {
            hasValidRow = true;
            break;
          }
        }

        // ❌ если нет ни одной полностью заполненной строки
        if (!hasValidRow) {
          setFiles(prev => ({ ...prev, offerFile: null }));
          setErrors([
            "Файл не загружен: должна быть хотя бы одна строка с заполненными столбцами 2,7,8,9"
          ]);
          return;
        }

        // ✅ если всё ок
        setFiles(prev => ({ ...prev, offerFile: file }));
        setErrors(prev =>
          prev.filter(
            err =>
              err !==
              "Файл не загружен: должна быть хотя бы одна строка с заполненными столбцами 2,7,8,9"
          )
        );

      } catch (err) {
        setFiles(prev => ({ ...prev, offerFile: null }));
        setErrors(["Ошибка при чтении файла Excel"]);
      }
    };

    reader.onerror = () => {
      setFiles(prev => ({ ...prev, offerFile: null }));
      setErrors(["Ошибка при чтении файла Excel"]);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!form.fullName) newErrors.push("ФИО обязательно");
    if (!form.company) newErrors.push("Название компании обязательно");
    if (!form.email) newErrors.push("Email обязателен");
    if (!form.inn) newErrors.push("ИНН обязателен");

    if (!files.egrul) newErrors.push("Выписка ЕГРЮЛ обязательна");
    if (!files.charter) newErrors.push("Устав компании обязателен");
    if (!files.partnerCard) newErrors.push("Карта партнера обязательна");
    if (!files.directorDecision)
      newErrors.push("Решение учредительного директора обязательно");
    if (!files.offerFile)
      newErrors.push("Файл с предложением обязателен");

    if (newErrors.length > 0) {
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

    onSubmit(formData);
  };

  return (
    <div className={Styles.modalBg}>
      <div className={Styles.modal}>
        <h3>Добавить свое предложение</h3>

        {errors.length > 0 && (
          <div className={Styles.errorBlock}>
            {errors.map((e, i) => (
              <p key={i} className={Styles.error}>
                {e}
              </p>
            ))}
          </div>
        )}

        <div className={Styles.downloadBlock}>
          <a
            href="/procurement.xlsx"
            download="Наши_закупки.xlsx"
            className={Styles.downloadButton}
          >
            Скачать наши закупки
          </a>
        </div>

        <form onSubmit={handleSubmit} className={Styles.form}>
          <input
            type="text"
            placeholder="ФИО"
            value={form.fullName}
            onChange={e => handleFormChange("fullName", e.target.value)}
          />

          <input
            type="text"
            placeholder="Название компании"
            value={form.company}
            onChange={e => handleFormChange("company", e.target.value)}
          />

          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => handleFormChange("email", e.target.value)}
          />

          <input
            type="text"
            placeholder="ИНН компании"
            value={form.inn}
            onChange={e => handleFormChange("inn", e.target.value)}
          />

          <label>Выписка ЕГРЮЛ</label>
          <input type="file" onChange={e => handleFileChange("egrul", e.target.files?.[0] || null)} />

          <label>Устав компании</label>
          <input type="file" onChange={e => handleFileChange("charter", e.target.files?.[0] || null)} />

          <label>Карта партнера</label>
          <input type="file" onChange={e => handleFileChange("partnerCard", e.target.files?.[0] || null)} />

          <label>Решение директора</label>
          <input type="file" onChange={e => handleFileChange("directorDecision", e.target.files?.[0] || null)} />

          <label>Файл с предложением (Excel)</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={e => handleOfferFileChange(e.target.files?.[0] || null)}
          />

          <div className={Styles.buttons}>
            <button type="submit">Отправить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};