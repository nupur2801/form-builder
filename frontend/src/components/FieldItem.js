import React, { useState } from "react";

const FieldItem = ({ field, index, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (key, value) => {
    onUpdate(index, { ...field, [key]: value });
  };

  const handleOptionChange = (optIndex, value) => {
    const newOptions = [...(field.options || [])];
    newOptions[optIndex] = value;
    onUpdate(index, { ...field, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    onUpdate(index, { ...field, options: newOptions });
  };

  const removeOption = (optIndex) => {
    const newOptions = field.options.filter((_, i) => i !== optIndex);
    onUpdate(index, { ...field, options: newOptions });
  };

  const hasOptions = ["select", "radio", "checkbox"].includes(field.type);

  return (
    <div className="field-item">
      <div className="field-item-header">
        <div className="field-info">
          <span className="field-type-badge">{field.type}</span>
          <span className="field-label-text">{field.label || "Untitled Field"}</span>
          {field.required && <span className="required-badge">Required</span>}
        </div>
        <div className="field-actions">
          <button onClick={() => onMoveUp(index)} className="btn-icon" title="Move Up">↑</button>
          <button onClick={() => onMoveDown(index)} className="btn-icon" title="Move Down">↓</button>
          <button onClick={() => setExpanded(!expanded)} className="btn-icon" title="Edit">
            {expanded ? "▲" : "✏️"}
          </button>
          <button onClick={() => onDelete(index)} className="btn-icon btn-danger" title="Delete">✕</button>
        </div>
      </div>

      {expanded && (
        <div className="field-editor">
          <div className="form-row">
            <div className="form-group">
              <label>Label</label>
              <input
                type="text"
                value={field.label}
                onChange={(e) => handleChange("label", e.target.value)}
                placeholder="Field label"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={field.type} onChange={(e) => handleChange("type", e.target.value)}>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="textarea">Textarea</option>
                <option value="select">Select (Dropdown)</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>

          {!hasOptions && (
            <div className="form-group">
              <label>Placeholder</label>
              <input
                type="text"
                value={field.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
                placeholder="Enter placeholder text"
              />
            </div>
          )}

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={field.required || false}
                onChange={(e) => handleChange("required", e.target.checked)}
              />
              Mark as Required
            </label>
          </div>

          {hasOptions && (
            <div className="options-editor">
              <label>Options</label>
              {(field.options || []).map((opt, optIdx) => (
                <div key={optIdx} className="option-row">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                    placeholder={`Option ${optIdx + 1}`}
                  />
                  <button onClick={() => removeOption(optIdx)} className="btn-icon btn-danger">✕</button>
                </div>
              ))}
              <button onClick={addOption} className="btn-add-option">+ Add Option</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FieldItem;
