import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FieldItem from "./FieldItem";
import { createForm, updateForm } from "../services/api";

const FIELD_TYPES = [
  { type: "text", label: "📝 Text" },
  { type: "email", label: "📧 Email" },
  { type: "number", label: "🔢 Number" },
  { type: "textarea", label: "📄 Textarea" },
  { type: "select", label: "📋 Dropdown" },
  { type: "radio", label: "⚪ Radio" },
  { type: "checkbox", label: "☑️ Checkbox" },
  { type: "date", label: "📅 Date" },
];

const FormBuilder = ({ existingForm, onSave }) => {
  const [title, setTitle] = useState(existingForm?.title || "");
  const [description, setDescription] = useState(existingForm?.description || "");
  const [fields, setFields] = useState(existingForm?.fields || []);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const addField = (type) => {
    const newField = {
      id: uuidv4(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: "",
      required: false,
      options: ["select", "radio", "checkbox"].includes(type)
        ? ["Option 1", "Option 2"]
        : [],
    };
    setFields([...fields, newField]);
  };

  const updateField = (index, updatedField) => {
    const updated = [...fields];
    updated[index] = updatedField;
    setFields(updated);
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...fields];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setFields(updated);
  };

  const moveDown = (index) => {
    if (index === fields.length - 1) return;
    const updated = [...fields];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setFields(updated);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setMessage("❌ Please add a form title.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const formData = { title, description, fields };
      let savedForm;
      if (existingForm?._id) {
        const res = await updateForm(existingForm._id, formData);
        savedForm = res.data.data;
      } else {
        const res = await createForm(formData);
        savedForm = res.data.data;
      }
      setMessage("✅ Form saved successfully!");
      if (onSave) onSave(savedForm);
    } catch (error) {
      setMessage("❌ Failed to save form. Check if backend is running.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-builder">
      {/* Left Panel - Field Palette */}
      <div className="field-palette">
        <h3>Add Fields</h3>
        <p className="palette-hint">Click to add fields</p>
        <div className="field-buttons">
          {FIELD_TYPES.map((ft) => (
            <button
              key={ft.type}
              className="field-type-btn"
              onClick={() => addField(ft.type)}
            >
              {ft.label}
            </button>
          ))}
        </div>
      </div>

      {/* Center - Form Canvas */}
      <div className="form-canvas">
        <div className="canvas-header">
          <input
            className="form-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Form Title..."
          />
          <textarea
            className="form-desc-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Form description (optional)"
            rows={2}
          />
        </div>

        <div className="fields-list">
          {fields.length === 0 ? (
            <div className="empty-canvas">
              <p>👈 Click fields from the left panel to add them here</p>
            </div>
          ) : (
            fields.map((field, index) => (
              <FieldItem
                key={field.id}
                field={field}
                index={index}
                onUpdate={updateField}
                onDelete={deleteField}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
              />
            ))
          )}
        </div>

        <div className="canvas-footer">
          {message && <p className="save-message">{message}</p>}
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : existingForm ? "Update Form" : "Save Form"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
