import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormBuilder from "../components/FormBuilder";
import FormPreview from "../components/FormPreview";
import { getFormById } from "../services/api";

const FormPage = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(mode !== "create");
  const [activeTab, setActiveTab] = useState("builder");

  useEffect(() => {
    if (mode !== "create" && id) {
      const fetchForm = async () => {
        try {
          const res = await getFormById(id);
          setForm(res.data.data);
        } catch {
          alert("Form not found.");
          navigate("/");
        } finally {
          setLoading(false);
        }
      };
      fetchForm();
    }
  }, [id, mode, navigate]);

  const handleSave = (savedForm) => setForm(savedForm);

  if (loading) return <div className="loading">Loading form...</div>;

  return (
    <div className="form-page">
      {/* Header Bar */}
      <div className="form-page-header">
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h2>
          {mode === "create" ? "New Form" : mode === "edit" ? `Editing: ${form?.title || "Form"}` : `Preview: ${form?.title || "Form"}`}
        </h2>

        {mode !== "preview" && (
          <div className="tab-switcher">
            <button
              className={activeTab === "builder" ? "tab active" : "tab"}
              onClick={() => setActiveTab("builder")}
            >
              🔧 Builder
            </button>
            <button
              className={activeTab === "preview" ? "tab active" : "tab"}
              onClick={() => setActiveTab("preview")}
            >
              👁 Preview
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {mode === "preview" ? (
        <div style={{ padding: "32px 24px", overflowY: "auto", flex: 1 }}>
          <FormPreview form={form} />
        </div>
      ) : activeTab === "builder" ? (
        <FormBuilder existingForm={form} onSave={handleSave} />
      ) : (
        <div style={{ padding: "32px 24px", overflowY: "auto", flex: 1 }}>
          <FormPreview form={form || { title: "Preview", description: "", fields: [] }} />
        </div>
      )}
    </div>
  );
};

export default FormPage;