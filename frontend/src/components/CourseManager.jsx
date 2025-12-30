import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api/courses';

export default function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseCode: '',
    courseName: '',
    category: '',
    duration: ''
  });
  const [editId, setEditId] = useState(null);

  // 🔑 THIS IS THE FIX
  useEffect(() => {
    document.body.style.backgroundColor = 'beige';
    document.body.style.margin = '0';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
  }, []);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await axios.get(API);
    setCourses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitCourse = async () => {
    if (!form.courseCode || !form.courseName || !form.category || !form.duration) {
      alert('All fields are mandatory');
      return;
    }

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
    } else {
      await axios.post(API, form);
    }

    setForm({
      courseCode: '',
      courseName: '',
      category: '',
      duration: ''
    });
    setEditId(null);
    loadCourses();
  };

  const editCourse = (course) => {
    setEditId(course._id);
    setForm(course);
  };

  const deleteCourse = async (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
      await axios.delete(`${API}/${id}`);
      loadCourses();
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', padding: '20px' }}>

      <h2 className="text-center text-primary mb-4">
        Online Course Management System
      </h2>

      {/* FORM */}
      <div className="card p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input className="form-control" name="courseCode"
              placeholder="Course Code" value={form.courseCode}
              onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <input className="form-control" name="courseName"
              placeholder="Course Name" value={form.courseName}
              onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <input className="form-control" name="category"
              placeholder="Category" value={form.category}
              onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <input className="form-control" name="duration"
              placeholder="Duration (hrs)" value={form.duration}
              onChange={handleChange} />
          </div>

          <div className="col-12">
            <button
              className={`btn ${editId ? 'btn-warning' : 'btn-success'} w-100`}
              onClick={submitCourse}
            >
              {editId ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-striped text-center align-middle">
        <thead className="table-primary">
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c._id}>
              <td>{c.courseCode}</td>
              <td>{c.courseName}</td>
              <td>{c.category}</td>
              <td>{c.duration}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2"
                  onClick={() => editCourse(c)}>Edit</button>
                <button className="btn btn-danger btn-sm"
                  onClick={() => deleteCourse(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
