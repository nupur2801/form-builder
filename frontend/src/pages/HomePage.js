import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllForms, deleteForm } from "../services/api";

const HomePage = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchForms = async () => {
    try {
      const res = await getAllForms();
      setForms(res.data.data);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchForms(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this form?")) {
      try {
        await deleteForm(id);
        setForms(forms.filter((f) => f._id !== id));
      } catch {
        alert("Failed to delete form.");
      }
    }
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <h1>Your <span>Forms</span></h1>
          <p>{forms.length} form{forms.length !== 1 ? "s" : ""} created</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/create")}>
          + New Form
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading your forms...</div>
      ) : forms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No forms yet</h3>
          <p>Create your first form to get started</p>
          <button className="btn-primary" onClick={() => navigate("/create")}>
            Create Form
          </button>
        </div>
      ) : (
        <div className="forms-grid">
          {forms.map((form) => (
            <div key={form._id} className="form-card">
              <div className="form-card-body">
                <h3>{form.title}</h3>
                {form.description && <p className="form-card-desc">{form.description}</p>}
                <div className="form-card-meta">
                  <span>{form.fields?.length || 0} fields</span>
                  <span>{new Date(form.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="form-card-actions">
                <button className="btn-outline" onClick={() => navigate(`/preview/${form._id}`)}>
                  Preview
                </button>
                <button className="btn-outline" onClick={() => navigate(`/edit/${form._id}`)}>
                  Edit
                </button>
                <button className="btn-outline btn-danger-outline" onClick={() => handleDelete(form._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;