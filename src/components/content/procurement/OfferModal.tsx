import React from "react";
import Styles from "./procurement.module.scss";

type Item = {
  id: number;
  name: string;
  quantity: number | string;
  unit: string;
  note: string | null;
};

type Proposed = {
  proposedName: string;
  quantity: string | number;
  note: string;
};

type Props = {
  selectedGroup: { note: string; items: Item[] };
  offerForms: Proposed[];
  editGroupNote: string | null;
  attachedFile: File | null;
  fileError: string;

  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onAddForm: () => void;
  onRemoveForm: (index: number) => void; // 👈 добавили
  onChangeForm: (index: number, field: keyof Proposed, value: any) => void;
  onFileChange: (file: File | null) => void;
};

export const OfferModal: React.FC<Props> = ({
  selectedGroup,
  offerForms,
  editGroupNote,
  attachedFile,
  fileError,
  onClose,
  onSubmit,
  onAddForm,
  onRemoveForm,
  onChangeForm,
  onFileChange
}) => {
  return (
    <div className={Styles.modalBg}>
      <div className={Styles.modal}>
        <h3>
          {editGroupNote
            ? "Редактировать предложения"
            : `Добавить предложение для группы: ${selectedGroup.note}`}
        </h3>

        <div className={Styles.groupItemsInModal}>
          {selectedGroup.items.map(item => (
            <div key={item.id} className={Styles.groupItem}>
              <p><b>{item.name}</b></p>
              <p>{item.quantity} {item.unit}</p>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className={Styles.form}>
          {offerForms.map((form, index) => (
            <div key={index} className={Styles.offerFormBlock}>
              <input
                placeholder="Наименование предложенного товара"
                value={form.proposedName}
                onChange={e => onChangeForm(index, "proposedName", e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Количество"
                value={form.quantity}
                onChange={e => onChangeForm(index, "quantity", e.target.value)}
                required
              />
              <textarea
                placeholder="Примечание"
                value={form.note}
                onChange={e => onChangeForm(index, "note", e.target.value)}
              />

              {/* 👇 кнопка удаления */}
              {offerForms.length > 1 && (
                <button
                  type="button"
                  className={Styles.removeButton}
                  onClick={() => onRemoveForm(index)}
                >
                  Удалить
                </button>
              )}
            </div>
          ))}

          <div className={Styles.fileUpload}>
            <label>Прикрепить файл:</label>
            <input
              type="file"
              onChange={e => onFileChange(e.target.files?.[0] || null)}
            />
            {attachedFile && <p>Файл: {attachedFile.name}</p>}
            {fileError && <p className={Styles.error}>{fileError}</p>}
          </div>

          <button
            type="button"
            className={Styles.addMoreButton}
            onClick={onAddForm}
          >
            Добавить ещё товар
          </button>

          <div className={Styles.buttons}>
            <button type="submit">
              {editGroupNote ? "Сохранить" : "Добавить"}
            </button>
            <button type="button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};